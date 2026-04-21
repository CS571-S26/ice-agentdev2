/**
 * Renders a single chat message bubble with Markdown-formatted content.
 * The `role` prop determines the CSS class (e.g. "user-message",
 * "assistant-message") used for styling the bubble.
 */
import Markdown from "react-markdown";

/**
 * @param {object} props
 * @param {string} props.role - Message role; used as the CSS class prefix.
 * @param {string} props.content - Markdown string to render inside the bubble.
 */
const Message = (props) => {
    return <div
            className={props.role + "-message"}
            style={{width: "fit-content", maxWidth: "80%", display: "inline-block"}}
        >
        <Markdown>{props.content}</Markdown>
    </div>
}

export default Message;
