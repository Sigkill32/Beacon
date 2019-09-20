import React from "react";

const ChatHead = ({ onHandleBack }) => {
  return (
    <div className="chat-head">
      <button onClick={onHandleBack}>
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22">
          <path
            fillRule="evenodd"
            d="M9.263 11H17a1 1 0 010 2H9.263l2.792 2.578a.788.788 0 010 1.178.94.94 0 01-.638.244.94.94 0 01-.639-.244l-4.513-4.167a.788.788 0 010-1.178l4.513-4.167a.956.956 0 011.277 0 .788.788 0 010 1.179L9.263 11z"
          ></path>
        </svg>
      </button>
      <p>Send a message</p>
    </div>
  );
};

export default ChatHead;
