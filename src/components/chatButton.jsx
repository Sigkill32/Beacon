import React from "react";
import ChatIcon from "./chatIcon";
import CloseIcon from "./closeIcon";

const ChatButton = ({ closed, onHandleClose, onHandleMessage }) => {
  //closed ? show chat icon : show close icon
  return (
    <div className="chat-button">
      <button className="chat-container">
        {closed ? (
          <ChatIcon onHandleMessage={onHandleMessage} />
        ) : (
          <CloseIcon onHandleClose={onHandleClose} />
        )}
      </button>
    </div>
  );
};

export default ChatButton;
