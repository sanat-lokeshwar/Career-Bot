/**
 * MessageBubble
 * Renders user and assistant messages
 * Assistant messages support markdown
 */

import ReactMarkdown from "react-markdown";

const MessageBubble = ({ role, content }) => {
  return (
    <div className={`message-row ${role}`}>
      <div className={`message-bubble ${role}`}>
        {role === "assistant" ? (
          <ReactMarkdown>{content}</ReactMarkdown>
        ) : (
          content
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
