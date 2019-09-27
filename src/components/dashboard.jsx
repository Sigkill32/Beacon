import React from "react";
import Users from "./users";
import ChatBox from "./chatBox";
import ChatButton from "./chatButton";

const Dashboard = ({
  name,
  users,
  email,
  sub,
  message,
  onHandleChange,
  onHandleSend,
  closed,
  onRef,
  onHandleUpload,
  noEmailButton,
  onHandleEmailButton,
  onHandleBack,
  onHandleClose,
  onHandleMessage
}) => {
  return (
    <div className="dashboard">
      <Users users={users} />
      <ChatBox
        name={name}
        email={email}
        sub={sub}
        message={message}
        onHandleChange={onHandleChange}
        onHandleSend={onHandleSend}
        closed={closed}
        onRef={onRef}
        onHandleUpload={onHandleUpload}
        noEmailButton={noEmailButton}
        onHandleEmailButton={onHandleEmailButton}
        onHandleBack={onHandleBack}
      />
      <ChatButton
        closed={closed}
        onHandleClose={onHandleClose}
        onHandleMessage={onHandleMessage}
      />
    </div>
  );
};

export default Dashboard;
