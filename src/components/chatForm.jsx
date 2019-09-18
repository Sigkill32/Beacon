import React from "react";

const ChatForm = ({
  onHandleChange,
  name,
  sub,
  email,
  onHandleSend,
  message
}) => {
  return (
    <div className="chat-form">
      <input
        type="text"
        onChange={onHandleChange}
        value={name}
        name="name"
        placeholder="Name"
      />
      <input
        type="text"
        onChange={onHandleChange}
        value={sub}
        name="sub"
        placeholder="Subject"
      />
      <input
        type="text"
        onChange={onHandleChange}
        value={email}
        name="email"
        placeholder="Email"
      />
      <textarea
        name="message"
        onChange={onHandleChange}
        value={message}
        placeholder="Message"
      ></textarea>
      <button onClick={onHandleSend}>Send a message</button>
    </div>
  );
};

export default ChatForm;
