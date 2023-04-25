import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ADDGROUP = (props) => {
  console.log(props.groupId);
  const authToken = useSelector((state) => state.auth.token);
  const groupId = useSelector((state) => state.message.groupId);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [member, setMember] = useState([]);
  const inputEmail = useRef();
  const handleShow = () => setShow(true);
  const handleClose = async () => {
    setShow(false);
    let email = inputEmail.current.value;

    if (email === "") {
      alert("Fill email");
    } else {
      try {
        let res = await axios.post(
          "http://localhost:4000/groups/addMember",
          { email: email, groupId: groupId },
          { headers: { Authorization: authToken } }
        );
        handleGetGroups();
      } catch (error) {
        console.log("error:", error);
      }
    }
  };

  const handleGetGroups = async () => {
    console.log(props.groupId);
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
    // try {
    //   let res = await axios.delete(
    //     `http://localhost:4000/groups/delete/${id}`,
    //     { headers: { Authorization: authToken } }
    //   );
    //   handleGetGroups();
    //   navigate("/chat");
    //   console.log(res);
    // } catch (error) {
    //   console.log("error:", error);
    // }
    // navigate("/chat");
  };

  useEffect(() => {
    handleGetGroups();
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
