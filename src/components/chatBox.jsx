import React from "react";
import ChatHead from "./chatHead";
import ChatForm from "./chatForm";
import ChatContact from "./chatContact";

const ChatBox = ({
  onHandleChange,
  onHandleSend,
  name,
  sub,
  email,
  message,
  closed,
  onRef,
  onHandleUpload
}) => {
  return (
    <div className={closed ? "chat-box hide" : "chat-box"}>
      <ChatHead />
      <ChatContact />
      <ChatForm
        onHandleChange={onHandleChange}
        onHandleSend={onHandleSend}
        name={name}
        sub={sub}
        email={email}
        message={message}
        onRef={onRef}
        onHandleUpload={onHandleUpload}
      />
    </div>
  );
};

export default ChatBox;
