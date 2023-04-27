import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import { useDispatch, useSelector } from "react-redux";
import { Image, Input } from "@chakra-ui/react";
import { AiOutlineSend } from "react-icons/ai";
import axios from "axios";
import { messageActions } from "../../Store/message-slice";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Groups from "../Groups/Groups";
import ADDGROUP from "../ADDGroup/ADDGROUP";
import { BsThreeDotsVertical } from "react-icons/bs";

const Chat = () => {
  const Inputmessage = useRef();
  const [userGroup, setuserGroup] = useState([]);
  const url = localStorage.getItem("url");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const [GroupId, setGroupId] = useState();
  const [name, setname] = useState();
  const authToken = useSelector((state) => state.auth.token);
  const authToken2 = useSelector((state) => state.auth.name);
  const messageArray = useSelector((state) => state.message.messages);
  const userId = useSelector((state) => state.auth.userId);
  const groups = useSelector((state) => state.message.groups);
  const dispatch = useDispatch();
  const groupName = useRef();
  const groupAdminName = useRef();
  const groupIcon = useRef();

  async function getData() {
    try {
      let res = await axios.get(
        `http://localhost:4000/message/get-messages/${GroupId}`,
        {
          headers: { Authorization: authToken },
        }
      );
      console.log(res);
      dispatch(messageActions.setMessages(res.data));
    } catch (error) {
      console.log("error:", error);
    }
  }

  const handleMessage = async () => {
    const Entermessage = Inputmessage.current.value;
    const message = {
      name: authToken2,
      message: Entermessage,
      groupId: GroupId,
    };
    if (Entermessage === "") {
      alert("Please Fill Some Message");
    } else {
      try {
        let res = await axios.post(
          "http://localhost:4000/message/send-message",
          message,
          { headers: { Authorization: authToken } }
        );
        getData();
        Inputmessage.current.value = "";
      } catch (error) {
        console.log("error:", error);
      }
    }
  };

  const handleGroup = async (e) => {
    e.preventDefault();
    let name = groupName.current.value;
    let adminname = groupAdminName.current.value;
    let avatar = groupIcon.current.value;
    localStorage.setItem("groupName", name);
    let group = {
      name: name,
      adminname: adminname,
      userId: userId,
      avatar: avatar,
    };
    if (name === "" || adminname === "") {
      alert("fill all fields");
    } else {
      try {
        let res = await axios.post(
          "http://localhost:4000/group/create-group",
          group,
          { headers: { Authorization: authToken } }
        );
        handleGroups();
        handleClose();
      } catch (error) {
        console.log("error:", error);
      }
    }
  };

  const handleGroups = async () => {
    try {
      let res = await axios.get(
        "http://localhost:4000/group/get-groups",

        {
          headers: { Authorization: authToken },
        }
      );
      dispatch(messageActions.setGroups(res.data.group));
    } catch (error) {
      console.log("error:", error);
    }
  };

  const switchChats = async (groupId, name) => {
    setGroupId(groupId);
    setname(name);
    try {
      let res = await axios.get(
        `http://localhost:4000/message/get-messages/${groupId}`,
        {
          headers: { Authorization: authToken },
        }
      );
      dispatch(messageActions.setMessages(res.data));
    } catch (error) {
      console.log("error:", error);
    }
  };

  const getMemberGroup = async () => {
    try {
      let res = await axios.get(
        "http://localhost:4000/group/get-Membergroups",
        { headers: { Authorization: authToken } }
      );
      setuserGroup(res.data.MemGroup);
    } catch (error) {
      console.log("error:", error);
    }
  };

  const handleDeleteMessage = async (id) => {
    console.log(id);
    try {
      let res = await axios.delete(
        `http://localhost:4000/message/deleteMessage/${id}`,
        { headers: { Authorization: authToken } }
      );
      getData();
      window.location.reload();
    } catch (error) {
      console.log("error:", error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      getData();
      handleGroups();
    }, 1000);
    getMemberGroup();
    return () => clearInterval(intervalId);
  }, [GroupId]);

  return (
    <>
      <div className="createBtn">
        <Button onClick={handleShow}>Create Group</Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create Group</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>GROUP NAME</Form.Label>
                <Form.Control
                  ref={groupName}
                  type="text"
                  placeholder="ENTER GROUP NAME"
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>ENTER ADMIN NAME</Form.Label>
                <Form.Control
                  ref={groupAdminName}
                  type="text"
                  placeholder="ENTER ADMIN NAME"
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>GROUP ICON</Form.Label>
                <Form.Control
                  ref={groupIcon}
                  type="text"
                  placeholder="ENTER GROUP ICON"
                  autoFocus
                />
              </Form.Group>
              <Form.Control
                onClick={handleGroup}
                type="submit"
                style={{
                  display: "block",
                  margin: "5% auto",
                  backgroundColor: "#0c6efd",
                  color: "white",
                }}
                value={"ADD GROUP"}
              />
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div className="chat-app">
        <div className="chat-left-sidebar">
          <div className="chat-app-user-list">
            <Image
              src={
                url ||
                "https://thumbs.dreamstime.com/b/businessman-icon-vector-male-avatar-profile-image-profile-businessman-icon-vector-male-avatar-profile-image-182095609.jpg"
              }
              alt="ImageName"
            />
            <p>{localStorage.getItem("name") || ""}</p>
          </div>
          <div className="groupPic-and-GroupName-parent">
            {groups.map((group) => (
              <Groups
                key={group.id}
                name={group.name}
                switchChats={switchChats}
                id={group.id}
                adminname={group.adminname}
                avatar={group.avatar}
                userId={group.userId}
              />
            ))}
            {userGroup.map((group) => {
              return (
                <div
                  key={group.id}
                  className="groupPic-and-GroupName"
                  onClick={() => switchChats(group.id, group.name)}
                >
                  <Image src={group.avatar} alt="image" />
                  <p> {group.name}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="chat-right-sidebar">
          <div className="chat-app-header">
            <h5>{name}</h5>
            <div className="add-members">
              <ADDGROUP groupId={GroupId} />
            </div>
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
              >
                <path
                  fill="currentColor"
                  d="M12,7c1.104,0,2-0.896,2-2c0-1.105-0.895-2-2-2c-1.104,0-2,0.894-2,2 C10,6.105,10.895,7,12,7z M12,9c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,9.895,13.104,9,12,9z M12,15 c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,15.894,13.104,15,12,15z"
                ></path>
              </svg>
            </div>
          </div>
          <div className="chat-app-message-list">
            {messageArray.length === 0 ? (
              <p
                style={{
                  color: "black",
                  width: "40%",
                  margin: "20% auto",
                }}
              >
                Messages are end-to-end encrypted . No one Outside of this chat
                ,not even What's Chat , can read or listen to them. Click to
                learn more .
              </p>
            ) : (
              messageArray.map((msg) => {
                return (
                  <div className="message-box" key={msg.id}>
                    <div>
                      <h6>{msg.name}</h6>
                      <p>{msg.message}</p>
                    </div>
                    <div>
                      <BsThreeDotsVertical
                        className="deletebtn"
                        onClick={() => handleDeleteMessage(msg.id)}
                      />
                    </div>
                  </div>
                );
              })
            )}
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
                className="btns"
                style={{ color: "grey", fontSize: "34px" }}
                onClick={handleMessage}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
