import { Button, Heading } from "@chakra-ui/react";
import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../Store/auth-slice";

import "./Navbar.css";
const Navbar = () => {
  const name = localStorage.getItem("name");
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate("/login");
  };
  return (
    <Fragment>
      <div className="Navbar">
        <Heading>What's Chat</Heading>
        <div>
          <Link to={"/"}>Home</Link>
          <Link to={"/chat"}>Chat</Link>
        </div>
        <Button onClick={handleLogout}>Logout</Button>
        {name && <p style={{ color: "red" }}>User : {name}</p>}
      </div>
    </Fragment>
  );
};

export default Navbar;
