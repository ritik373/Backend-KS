import React, { useRef, useState } from "react";
import "./Chat.css";
import { Button, Heading, Input } from "@chakra-ui/react";

const Chat = () => {
  const message = useRef();
  const [messages, setMessage] = useState([]);
  const handleMessage = (e) => {
    setMessage((prev) => {
      return [...prev, message.current.value];
    });
  };
  return (
    <div className="chat-Box">
      <Heading>Chat App</Heading>
      {messages.map((msg, i) => {
        return <div key={i}>{msg}</div>;
      })}
      <form>
        <Input
          ref={message}
          width={"40%"}
          m={"auto"}
          type="text"
          placeholder="Enter Your Message"
        />
        <Button onClick={handleMessage}>
          <svg
            viewBox="0 0 24 24"
            height="24"
            width="24"
            preserveAspectRatio="xMidYMid meet"
            version="1.1"
            x="0px"
            y="0px"
            enableBackground="new 0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"
            ></path>
          </svg>
        </Button>
      </form>
    </div>
  );
};

export default Chat;
