/**
 * Logout confirmation modal. On confirm, hits the logout endpoint and clears
 * the persisted username from sessionStorage before signaling the parent
 * via `onClose(true)`.
 */
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

/**
 * @param {object} props
 * @param {boolean} props.show - Whether the modal is visible.
 * @param {(loggedOut?: boolean) => void} props.onClose - Called with `true`
 *   once logout has completed; called with no argument on cancel/dismiss.
 */
function LogoutModal(props) {
    const [busy, setBusy] = useState(false);

    // Clear any leftover busy state from a prior open so the buttons are
    // interactable when the modal is reopened.
    useEffect(() => {
        if (props.show) {
            setBusy(false);
        }
    }, [props.show]);

    /**
     * Performs the logout: POSTs to the logout endpoint, removes the
     * persisted username from sessionStorage, and signals the parent that
     * logout succeeded via `props.onClose(true)`. The session-storage write
     * happens unconditionally so local state stays in sync even if the
     * network request fails — the user can retry if the server didn't.
     */
    async function handleLogout() {
        setBusy(true);
        await fetch("https://cs571api.cs.wisc.edu/rest/s26/ice/logout", {
            method: "POST",
            credentials: "include",
            headers: { "X-CS571-ID": CS571.getBadgerId() }
        });
        sessionStorage.removeItem("ice-logged-in-user");
        setBusy(false);
        props.onClose(true);
    }

    return (
        <Modal show={props.show} onHide={() => props.onClose()}>
            <Modal.Header closeButton>
                <Modal.Title>Log out?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to log out?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.onClose()} disabled={busy}>Cancel</Button>
                <Button variant="primary" onClick={handleLogout} disabled={busy}>Logout</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default LogoutModal;
