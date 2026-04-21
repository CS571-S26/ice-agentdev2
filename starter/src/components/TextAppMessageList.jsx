/**
 * Scrollable list of chat messages. Filters to user- and assistant-role
 * messages only (developer/system/function messages are hidden), and
 * auto-scrolls the newest message into view whenever the list grows.
 */
import { useEffect, useRef } from "react";
import { Container, Row } from "react-bootstrap";
import Message from "./Message";
import Constants from "../constants/Constants";

/**
 * @param {object} props
 * @param {Array<{role: string, content: string}>} props.messages - Ordered
 *   chat log. Non user/assistant roles are filtered out before rendering.
 */
export default function TextAppMessageList(props) {

    const lastItem = useRef();

    useEffect(() => {
        lastItem.current?.scrollIntoView({ behavior: 'smooth' })
    }, [props.messages])

    return <Container className="message-list">
        {props.messages.map((message, i) => (message.role === Constants.Roles.User || message.role === Constants.Roles.Assistant) && (
            <Row
                ref={i === props.messages.length - 1 ? lastItem : undefined}
                key={i}
                style={{marginBottom: "0.25rem"}}
            >
                <Message role={message.role} content={message.content}/>
            </Row>
        ))}
    </Container>
}
