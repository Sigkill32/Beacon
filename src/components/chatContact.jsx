import React from "react";
import img from "../images/Tesla.jpg";

const ChatContact = ({ noEmailButton }) => {
  return (
    <div
      className={
        noEmailButton === "sent" ? "chat-contact contact-conf" : "chat-contact"
      }
    >
      <div className="contacts">
        <img src={img} alt="Nikola Tesla" />
        <img src={img} alt="Nikola Tesla" />
        <img src={img} alt="Nikola Tesla" />
        <img src={img} alt="Nikola Tesla" />
        <img src={img} alt="Nikola Tesla" />
      </div>
      <h4>How can we help you?</h4>
      <p>We usually respond in few hours</p>
    </div>
  );
};

export default ChatContact;
