/**
 * Login modal. Owns the full login flow: form state, client-side validation,
 * the POST to the login endpoint, and the sessionStorage write on success.
 * The parent is notified only via a single `onClose(username?)` callback.
 */
import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

/**
 * @param {object} props
 * @param {boolean} props.show - Whether the modal is visible.
 * @param {(username?: string) => void} props.onClose - Called with the
 *   authenticated username on success, or no argument on cancel/dismiss.
 */
function LoginModal(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [busy, setBusy] = useState(false);

    // Reset form state every time the modal is (re)opened so stale input
    // or error messages from a prior attempt don't leak into the next one.
    useEffect(() => {
        if (props.show) {
            setUsername("");
            setPassword("");
            setError("");
            setBusy(false);
        }
    }, [props.show]);

    /**
     * Validates the form, POSTs credentials to the login endpoint, and on
     * success persists the username in sessionStorage before signaling the
     * parent via `props.onClose(username)`. On any validation or network
     * failure, surfaces a human-readable message via local state.
     *
     * @param {React.FormEvent} [e] - Optional form submit event.
     */
    async function handleSubmit(e) {
        e?.preventDefault();
        setError("");

        if (!username.trim()) {
            setError("Username is required.");
            return;
        }

        setBusy(true);
        try {
            const resp = await fetch("https://cs571api.cs.wisc.edu/rest/s26/ice/login", {
                method: "POST",
                credentials: "include",
                headers: {
                    "X-CS571-ID": CS571.getBadgerId(),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });
            const data = await resp.json();
            if (!resp.ok) {
                setError(data?.msg || "Request failed. Please try again.");
                setBusy(false);
                return;
            }
            sessionStorage.setItem("ice-logged-in-user", username);
            setBusy(false);
            props.onClose(username);
        } catch (err) {
            setError("Something went wrong. Please try again.");
            setBusy(false);
        }
    }

    return (
        <Modal show={props.show} onHide={() => props.onClose()}>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="loginUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="loginPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    {error && <p style={{ color: "red", marginBottom: 0 }}>{error}</p>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => props.onClose()} disabled={busy}>Cancel</Button>
                    <Button type="submit" variant="primary" disabled={busy}>Login</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default LoginModal;
