import "./App.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
const Login = () => {
  const [uname, setUname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const user = { uname, email, password };
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      uname,
      " name",
      email,
      "email",
      password,
      "password",
      cpassword,
      "cpassword"
    );

    if (password === cpassword) {
      const url = `http://localhost:8080/active/${email}`;
      const r = await axios.get(url);
      const result = r.data;
      console.log(result);
      if (result === false) {
        await axios.post("http://localhost:8080/add", user);
        alert("Registered!");
        navigate("/Login");
      } else {
        alert("user already exists, sign up with a new email !");
        setUname("");
        setEmail("");
        setPassword("");
        setCpassword("");
      }
    } else {
      alert("password doesn't match");
    }
  };
  return (
    <>
      <h1 className="App mt-5" variant="danger">
        Sign Up
      </h1>
      <div className="App d-flex align-items-center justify-content-center mt-3">
        <Form
          className=""
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <Form.Group
            className="mb-3 col-lg-9 mt-5 mx-5"
            controlId="formBasicEmail2"
          >
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Full Name"
              value={uname}
              onChange={(e) => {
                e.preventDefault();
                setUname(e.target.value);
              }}
              required
            />
          </Form.Group>
          <Form.Group
            className="mb-3 col-lg-9 mt-3 mx-5"
            controlId="formBasicEmail3"
          >
            <Form.Label>Email address</Form.Label>
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
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group
            className="mb-3 col-lg-9 mx-5"
            controlId="formBasicPassword1"
          >
            <Form.Label>Password</Form.Label>
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
          </Form.Group>
          <Form.Group
            className="mb-3 col-lg-9 mx-5"
            controlId="formBasicPassword2"
          >
            <Form.Label>Confirm Password</Form.Label>
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
          </Form.Group>
          <br />
          <Button variant="primary" type="submit" className="mt-3">
            Submit
          </Button>
          <Button
            variant="danger"
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

export default Login;
