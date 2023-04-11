import "./App.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import UserContext from "./userContext";
const Login = () => {
  const [change, setChange] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const { setCuser } = useContext(UserContext);
  // const [result, setResult] = useState("");
  // const [token, setToken] = useState(false);
  const onclick = () => {
    setChange(false);
  };
  // useEffect(() => {
  //   getUsers();
  // });
  // const getUsers = async () => {
  //   const url = `http://localhost:8080/validate/${email}/${password}`;
  //   const r = await axios.get(url);
  //   // setResult(r.data);
  //   console.log(r);
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, "email");
    console.log(password, "password");

    const url = `http://localhost:8080/validate/${email}/${password}`;
    const r = await axios.get(url);
    // setResult(r.data);
    console.log(r.data, "yayayyaya");
    const result = r.data;
    if (result) {
      setCuser(email);
      navigate("/Products");
    } else {
      alert("User doesn't exists or check password");
    }
    // console.log(result);

    // console.log(result[0]["email"], "with usestate");
    // const bemail = result[0]["email"];
    // const bpassword = result[0]["password"];
    // if (bemail === email && bpassword === password) {
    //   // setToken(true);
    //   console.log("successful");
    // } else {
    //   // setToken(false);
    //   alert("in valid ");
    // }
  };
  return change === false ? (
    <Navigate to="/Signup" />
  ) : (
    <>
      <div className="App d-flex align-items-center justify-content-center mt-5">
        <Form
          className=""
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <Form.Group
            className="mb-3 col-lg-9 mt-5 mx-5"
            controlId="formBasicEmail"
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
            controlId="formBasicPassword"
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
          <Button
            variant="light"
            type="submit"
            className="mt-3"
            onClick={(e) => {
              e.preventDefault();
              navigate("/Forgot");
            }}
          >
            Forgot Password
          </Button>
          <br />
          <Button variant="primary" type="submit" className="mt-3">
            Login
          </Button>
          <br />
          <Button onClick={onclick} className="mt-3">
            Register?
          </Button>
        </Form>
      </div>
    </>
  );
  /*
   */
};

export default Login;
