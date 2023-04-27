import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ADDGROUP = (props) => {
  const authToken = useSelector((state) => state.auth.token);
  const groupId = useSelector((state) => state.message.groupId);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [member, setMember] = useState([]);
  const inputEmail = useRef();
  const inputName = useRef();
  const inputavatar = useRef();
  const handleShow = () => setShow(true);
  const handleClose = async () => {
    setShow(false);
    let email = inputEmail.current.value;
    let name = inputName.current.value;
    let avatar = inputavatar.current.value;
    if (email === "" || name === "" || avatar === "") {
      alert("Fill email");
    } else {
      try {
        let res = await axios.post(
          "http://localhost:4000/groups/addMember",
          { email: email, name: name, avatar: avatar, groupId: props.groupId },
          { headers: { Authorization: authToken } }
        );
        console.log(res);
        handleGetGroups();
      } catch (error) {
        console.log("error:", error);
      }
    }
  };

  const handleGetGroups = async () => {
    try {
      let res = await axios.get(
        `http://localhost:4000/groups/getMember/${props.groupId}`,
        {
          headers: { Authorization: authToken },
        }
      );
      console.log(res);
      setMember(res.data.groupsMember);
    } catch (error) {
      console.log("error:", error);
    }
  };

  const handleGetGroupsDirect = async () => {
    try {
      let res = await axios.get(
        `http://localhost:4000/groups/getMember/${props.groupId}`,
        {
          headers: { Authorization: authToken },
        }
      );
      console.log(res);
      setMember(res.data.groupsMember);
    } catch (error) {
      console.log("error:", error);
    }
  };

  const handleDeleteParti = async (e) => {
    let id = e.target.value;
    console.log(id);
    try {
      let res = await axios.delete(
        `http://localhost:4000/groups/delete/${id}`,
        { headers: { Authorization: authToken } }
      );
      handleGetGroups();
    } catch (error) {
      console.log("error:", error);
    }
  };

  useEffect(() => {
    const intervalID = setInterval(() => {
      handleGetGroups();
      handleGetGroupsDirect();
    }, 1000);

    return () => clearInterval(intervalID);
  }, [props.groupId]);

  return (
    <div className="add-members">
      <div>
        <Button variant="primary" onClick={handleShow}>
          Add group participants
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  ref={inputEmail}
                  type="email"
                  placeholder="name@example.com"
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Group Name</Form.Label>
                <Form.Control
                  ref={inputName}
                  type="text"
                  placeholder="Group Name"
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Group Avatar</Form.Label>
                <Form.Control
                  ref={inputavatar}
                  type="text"
                  placeholder="Group Avatar"
                  autoFocus
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              ADD
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <select className="groupsMem" onChange={handleDeleteParti}>
        <option>Members</option>
        {member.map((mem) => {
          return (
            <option key={mem.id} value={mem.id}>
              {mem.email}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default ADDGROUP;
