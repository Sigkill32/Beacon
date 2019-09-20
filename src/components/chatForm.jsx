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
          accept="image/*"
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
      <div className="powered-by">
        <span className="tooltip">Powerd by React</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22">
          <path
            fillRule="evenodd"
            d="M11.63 7.5L5.37 14c-.783-.813-1.272-1.93-1.37-3.25 0-1.219.587-2.438 1.37-3.25L11.728 1C12.511 1.812 13 3.031 13 4.25c0 1.219-.587 2.437-1.37 3.25zm2.755 9l6.33-6.5c.79.914 1.285 2.031 1.285 3.25 0 1.219-.593 2.438-1.385 3.25l-6.33 6.5c-.79-.813-1.285-2.031-1.285-3.25 0-1.219.593-2.438 1.385-3.25zm-.155-9l1.868-1.9L20.721 1C21.508 1.8 22 3 22 4.2c0 1.2-.59 2.4-1.377 3.2L16.098 12l-1.868 1.9-2.656 2.7-1.87 1.9L5.28 23C4.492 22.2 4 21 4 19.8c0-1.2.59-2.4 1.377-3.2l4.426-4.5 1.77-1.9 2.657-2.7z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default ChatForm;
