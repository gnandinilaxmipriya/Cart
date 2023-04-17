import "./App.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import UserContext from "./userContext";
import FloatingLabel from "react-bootstrap/FloatingLabel";
// import Alert from "react-bootstrap/Alert";
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
    await axios
      .get(url)
      .then((r) => {
        console.log(r.data, "yayayyaya");
        const result = r.data;
        if (result) {
          setCuser(email);
          navigate("/Home");
        } else {
          alert("User doesn't exists or check password");
          // <Alert variant="danger">User doesn't exists or check password</Alert>;
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
            controlId="formBasicEmail4"
          >
            <FloatingLabel
              controlId="floatingInput55"
              label="Email"
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

            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group
            className="mb-3 col-lg-9 mx-5"
            controlId="formBasicPassword"
          >
            <FloatingLabel
              controlId="floatingInput"
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
          <div className="d-flex justify-content-center align-items-center">
            <Button
              variant="outline-primary"
              type="submit"
              className="mt-3 mx-1"
            >
              Login
            </Button>
            <Button onClick={onclick} className="mt-3" variant="outline-light">
              Register?
            </Button>
          </div>

          <br />
          <br />

          <Button
            variant="outline-light"
            type="submit"
            className="mt-3"
            onClick={(e) => {
              e.preventDefault();
              navigate("/Forgot");
            }}
          >
            Forgot Password
          </Button>
        </Form>
      </div>
    </>
  );
  /*
   */
};

export default Login;
