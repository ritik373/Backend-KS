import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Login from "./Login/Login";
import Sign from "./Sign/Sign";
import Chat from "./Chat/Chat";
import Private from "./PrivateRoutes/Private";
const AllRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Private>
            <Home />
          </Private>
        }
      ></Route>
      <Route
        path="/chat"
        element={
          <Private>
            <Chat />
          </Private>
        }
      ></Route>
      <Route path="/sign" element={<Sign />}></Route>
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  );
};
export default AllRoutes;
