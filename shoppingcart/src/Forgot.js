import React from "react";
import { useContext } from "react";
import UserContext from "./userContext";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import FloatingLabel from "react-bootstrap/FloatingLabel";
const Forgot = () => {
  const { cuser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(cuser);
    if (cpassword === password) {
      const url = `http://localhost:8080/updatePassword/${email}`;
      const list = { password: password };
      await axios
        .put(url, list)
        .then((result) => {
          console.log(result, "yo bro");
          alert("Password changed!");
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("password doesn't match");
    }
  };
  return (
    <>
      <h2 className="App mt-5 mx-5 mb-4" style={{ color: "whitesmoke" }}>
        Change Password
      </h2>
      <div className="App d-flex align-items-center justify-content-center mt-3">
        <Form
          className="App"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <Form.Group
            className="mb-3 col-lg-9 mt-3 mx-5"
            controlId="formBasicEmail3"
          >
            <FloatingLabel
              controlId="floatingInput3"
              label="Email Address"
              className="mb-3"
            >
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => {
                  e.preventDefault();
                  setEmail(e.target.value);
                }}
                required
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group
            className="mb-3 col-lg-9 mx-5"
            controlId="formBasicPassword1"
          >
            <FloatingLabel
              controlId="floatingInput4"
              label="Password"
              className="mb-3"
            >
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  e.preventDefault();
                  setPassword(e.target.value);
                }}
                required
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group
            className="mb-3 col-lg-9 mx-5"
            controlId="formBasicPassword2"
          >
            <FloatingLabel
              controlId="floatingInput5"
              label="Confirm Password"
              className="mb-3"
            >
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={cpassword}
                onChange={(e) => {
                  e.preventDefault();
                  setCpassword(e.target.value);
                }}
                required
              />
            </FloatingLabel>
          </Form.Group>
          <br />
          <Button variant="outline-primary" type="submit" className="mt-3 mx-5">
            Submit
          </Button>
          <Button
            variant="outline-danger"
            type="button"
            className="mt-3 mx-4"
            onClick={(e) => {
              e.preventDefault();
              navigate("/Login");
            }}
          >
            Cancel
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Forgot;
