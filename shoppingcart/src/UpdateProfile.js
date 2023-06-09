import React from "react";
import { useContext } from "react";
import UserContext from "./userContext";
import "./App.css";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import validator from "validator";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import "./Main.css";
const Profile = () => {
  const { cuser } = useContext(UserContext);
  let navigate = useNavigate();
  const [aid, setAid] = useState("");
  const [uname, setUname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [Street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  useEffect(() => {
    showProfile();
  }, []);

  const showProfile = async () => {
    const url = `http://localhost:8080/viewprofile/${cuser}`;
    await axios
      .get(url)
      .then((r) => {
        // console.log(r.data);
        const result = r.data;
        console.log(result[0], "only data with result");
        // console.log(result[0]["address"]["id"], "address id");

        setUname(result[0]["uname"]);
        setPhone(result[0]["phone"]);
        setEmail(cuser);
        if (result[0]["address"] !== null) {
          setAid(result[0]["address"]["id"]);
          setStreet(result[0]["address"]["street"]);
          setCity(result[0]["address"]["city"]);
          setState(result[0]["address"]["state"]);
          setPincode(result[0]["address"]["pincode"]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(cuser);
    console.log(Street, city, state, pincode, email, uname, phone, aid);
    if (!isNaN(pincode)) {
      const list = {
        uname: uname,
        email: email,
        phone: phone,
        address: {
          id: aid,
          street: Street,
          city: city,
          state: state,
          pincode: pincode,
        },
      };
      if (validator.isMobilePhone(phone) && phone.length === 10) {
        const url = `http://localhost:8080/updateProfile/${cuser}`;
        const res = await axios.put(url, list);
        console.log(res);
        alert("profile updated");
        navigate("/Profile");
      } else {
        alert("check phone number");
      }
    } else {
      alert("check pincode");
    }
  };

  return (
    <>
      <h3 className="gify App mt-5">Update Profile</h3>
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
            <FloatingLabel
              controlId="floatingInput"
              label="Name"
              className="mb-3"
            >
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
            </FloatingLabel>
          </Form.Group>
          <Form.Group
            className="col-lg-9 mt-3 mx-5"
            controlId="formBasicEmail3"
          >
            <FloatingLabel
              controlId="floatingInput"
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
            className="mb-3 col-lg-9  mt-3 mx-5"
            controlId="formBasicEmail2509876"
          >
            <FloatingLabel
              controlId="floatingInput"
              label="Phone Number"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Enter Phone Number"
                value={phone}
                onChange={(e) => {
                  e.preventDefault();
                  setPhone(e.target.value);
                }}
                required
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group
            className="mb-3 col-lg-9 mx-5"
            controlId="formBasicEmail25"
          >
            {/* <Form.Label>Address</Form.Label> */}
            <br />
            <FloatingLabel
              controlId="floatingInput"
              label="Street"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Enter street"
                value={Street}
                onChange={(e) => {
                  e.preventDefault();
                  setStreet(e.target.value);
                }}
                required
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group
            className="mb-3 col-lg-9 mx-5"
            controlId="formBasicEmail253"
          >
            <FloatingLabel
              controlId="floatingInput"
              label="City"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Enter City"
                value={city}
                onChange={(e) => {
                  e.preventDefault();
                  setCity(e.target.value);
                }}
                required
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group
            className="mb-3 col-lg-9 mx-5"
            controlId="formBasicEmail25999"
          >
            <FloatingLabel
              controlId="floatingInput"
              label="State"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Enter State"
                value={state}
                onChange={(e) => {
                  e.preventDefault();
                  setState(e.target.value);
                }}
                required
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group
            className="mb-3 col-lg-9 mx-5"
            controlId="formBasicEmail2509"
          >
            <FloatingLabel
              controlId="floatingInput"
              label="Pincode"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Enter Pincode"
                value={pincode}
                onChange={(e) => {
                  e.preventDefault();
                  setPincode(e.target.value);
                }}
                required
              />
            </FloatingLabel>
          </Form.Group>
          <Button variant="outline-primary" type="submit" className="mt-3 mx-3">
            Submit
          </Button>
          <Button
            variant="outline-danger"
            type="button"
            className="mt-3 mx-1"
            onClick={(e) => {
              e.preventDefault();
              navigate("/Profile");
            }}
          >
            Cancel
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Profile;
