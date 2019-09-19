import React from "react";

const ChatForm = ({
  onHandleChange,
  name,
  sub,
  email,
  onHandleSend,
  message,
  onRef,
  onHandleUpload
}) => {
  return (
    <div className="chat-form">
      <div className="chat-form-content">
        <input
          type="text"
          onChange={onHandleChange}
          value={name}
          name="name"
          placeholder="Name"
          required
        />
        <input
          type="text"
          onChange={onHandleChange}
          value={sub}
          name="sub"
          placeholder="Subject"
          required
        />
        <input
          type="email"
          onChange={onHandleChange}
          value={email}
          name="email"
          required
          placeholder="Email"
        />
        <input
          type="file"
          id="upload"
          accept="image/png"
          className="hide"
          style={{ display: "none" }}
          ref={onRef}
        />
        <div className="textarea-container">
          <textarea
            name="message"
            onChange={onHandleChange}
            value={message}
            required
            placeholder="How can we help?"
          ></textarea>
          <button onClick={onHandleUpload}>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22">
              <path
                fillRule="evenodd"
                d="M21 5a1 1 0 110 2h-2v2a1 1 0 11-2 0V7h-2a1 1 0 110-2h2V3a1 1 0 112 0v2h2zm-5 14H5c-1.654 0-3-1.346-3-3V8c0-1.654 1.346-3 3-3h6a1 1 0 110 2H5c-.552 0-1 .449-1 1v3.586l2.293-2.293a.999.999 0 011.414 0L11 12.586l1.293-1.293a.999.999 0 011.414 0L17 14.586v-1.664a1 1 0 112 0V16c0 1.654-1.346 3-3 3zM4 16c0 .551.448 1 1 1h11a.97.97 0 00.501-.154c-.071-.043-.147-.077-.208-.139L13 13.414l-1.293 1.293a.999.999 0 01-1.414 0L7 11.414l-3 3V16z"
              ></path>
            </svg>
          </button>
        </div>
        <button onClick={onHandleSend} id="send-button">
          Send a message
        </button>
      </div>
    </div>
  );
};

export default ChatForm;
