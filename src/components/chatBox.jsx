import React from "react";
import ChatHead from "./chatHead";
import ChatForm from "./chatForm";
import ChatContact from "./chatContact";
import EmailButton from "./emailButton";
import Confirmation from "./confirmation";

const ChatBox = ({
  onHandleChange,
  onHandleSend,
  name,
  sub,
  email,
  message,
  closed,
  onRef,
  onHandleUpload,
  noEmailButton,
  onHandleEmailButton,
  onHandleBack
}) => {
  return (
    <div className={closed ? "chat-box hide" : "chat-box"}>
      <ChatHead onHandleBack={onHandleBack} />
      <ChatContact noEmailButton={noEmailButton} />
      {(() => {
        switch (noEmailButton) {
          case "init":
            return <EmailButton onHandleEmailButton={onHandleEmailButton} />;
          case "form":
            return (
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
            );
          case "sent":
            return <Confirmation />;
          default:
            return null;
        }
      })()}
    </div>
  );
};

export default ChatBox;
