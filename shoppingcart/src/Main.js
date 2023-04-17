import React from "react";
// import gify from "./images/giphy.gif";
import { useNavigate } from "react-router";
import Button from "react-bootstrap/Button";
import "./Main.css";
const Main = () => {
  const navigate = useNavigate();
  return (
    <div className="">
      <div className="d-flex justify-content-center align-items-center mt-5">
        <h1 style={{ color: "whitesmoke", marginTop: "10rem" }}>Shop.com</h1>
      </div>

      <div className="d-flex justify-content-center align-items-center mt-5">
        <Button
          variant="outline-light"
          className="mx-1"
          onClick={(e) => {
            e.preventDefault();
            navigate("/Login");
          }}
        >
          Login
        </Button>
        <Button
          variant="outline-light"
          onClick={(e) => {
            e.preventDefault();
            navigate("/SignUp");
          }}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default Main;
