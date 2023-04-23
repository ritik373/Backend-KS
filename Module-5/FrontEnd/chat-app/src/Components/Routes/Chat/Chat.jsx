import React, { useRef, useState } from "react";
import "./Chat.css";
import { useSelector } from "react-redux";
import { Input } from "@chakra-ui/react";
import { AiOutlineSend } from "react-icons/ai";
import axios from "axios";
const Chat = () => {
  const authToken = useSelector((state) => state.auth.token);

  const authToken2 = useSelector((state) => state.auth.name);

  const [data, setData] = useState([]);

  const Inputmessage = useRef();
  const handleMessage = async () => {
    const Entermessage = Inputmessage.current.value;
    const message = {
      name: authToken2,
      message: Entermessage,
    };
    try {
      let res = await axios.post(
        "http://localhost:4000/message/send-message",
        message,
        { headers: { Authorization: authToken } }
      );
      console.log(res);
      Inputmessage.current.value = "";
    } catch (error) {
      console.log("error:", error);
    }

    try {
      let res = await axios.get("http://localhost:4000/message/get-messages", {
        headers: { Authorization: authToken },
      });
      setData(res.data);
    } catch (error) {
      console.log("error:", error);
    }
  };
  console.log(data);
  return (
    <>
      <div className="chat-app">
        <div className="chat-left-sidebar">
          <div className="chat-app-user-list">
            <div>{localStorage.getItem("name") || ""}</div>
          </div>
        </div>
        <div className="chat-right-sidebar">
          <div className="chat-app-header">
            <h1>Hello</h1>
            <div className="icons">
              <svg
                viewBox="0 0 24 24"
                height="24"
                width="24"
                preserveAspectRatio="xMidYMid meet"
                version="1.1"
                x="0px"
                y="0px"
              >
                <path
                  fill="currentColor"
                  d="M15.9,14.3H15L14.7,14c1-1.1,1.6-2.7,1.6-4.3c0-3.7-3-6.7-6.7-6.7S3,6,3,9.7 s3,6.7,6.7,6.7c1.6,0,3.2-0.6,4.3-1.6l0.3,0.3v0.8l5.1,5.1l1.5-1.5L15.9,14.3z M9.7,14.3c-2.6,0-4.6-2.1-4.6-4.6s2.1-4.6,4.6-4.6 s4.6,2.1,4.6,4.6S12.3,14.3,9.7,14.3z"
                ></path>
              </svg>
              <svg
                viewBox="0 0 24 24"
                height="24"
                width="24"
                preserveAspectRatio="xMidYMid meet"
                version="1.1"
                x="0px"
                y="0px"
                // enablBackground="new 0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12,7c1.104,0,2-0.896,2-2c0-1.105-0.895-2-2-2c-1.104,0-2,0.894-2,2 C10,6.105,10.895,7,12,7z M12,9c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,9.895,13.104,9,12,9z M12,15 c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,15.894,13.104,15,12,15z"
                ></path>
              </svg>
            </div>
          </div>
          <div className="chat-app-message-list">
            {data.map((msg, i) => {
              console.log(msg);
              return <div key={i}>{msg.message}</div>;
            })}
          </div>
          <div className="chat-message-composer">
            <form className="form">
              <Input
                ref={Inputmessage}
                border={"none"}
                h={"45px"}
                width={"100%"}
                type="text"
                placeholder="Enter Your Message"
              />
              <AiOutlineSend
                className="btn"
                onClick={handleMessage}
                fontSize={"32px"}
                color="black"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
