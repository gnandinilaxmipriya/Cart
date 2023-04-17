import React, { useEffect, useState } from "react";
import { useContext } from "react";
import UserContext from "./userContext";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./App.css";
import { useNavigate } from "react-router";
// import Badge from "react-bootstrap/Badge";

const Profile = () => {
  // const [id, setId] = useState("");
  // const [username, setUsername] = useState("");
  // const [phone, setPhone] = useState("");
  let navigate = useNavigate();
  // const [Street, setStreet] = useState("");
  // const [city, setCity] = useState("");
  // const [state, setState] = useState("");
  // const [pincode, setPincode] = useState("");
  const { cuser } = useContext(UserContext);
  const [res, setRes] = useState();
  useEffect(() => {
    showProfile();
  }, []);
  const showProfile = () => {
    const url = `http://localhost:8080/viewprofile/${cuser}`;
    axios
      .get(url)
      .then((res) => {
        console.log(res.data, "hello inside useeffect");
        setRes(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log(r.data);
    // const result = r.data;

    // console.log(result, "only data with result");

    // setId(result[0]["id"]);
    // setUsername(result[0]["uname"]);
    // setPhone(result[0]["phone"]);
    // if (result[0]["address"] !== null) {
    //   setStreet(result[0]["address"]["street"]);
    //   setCity(result[0]["address"]["city"]);
    //   setState(result[0]["address"]["state"]);
    //   setPincode(result[0]["address"]["pincode"]);
    // } else {
    //   console.log("address is null");
    //   setStreet(null);
    //   setCity(null);
    //   setState(null);
    //   setPincode(null);
    // }
    // setStreet(result[0]["street"]);
    // setCity(result[0]["city"]);
    // setState(result[0]["state"]);
    // setPincode(result[0]["pincode"]);
  };
  return (
    <>
      {/* {console.log(phone === null ? "yes" : "No")} */}
      {console.log(res, "inside body")}
      <div className="d-flex align-items-center justify-content-center">
        <div className="mt-5 mx-5" style={{ width: "95%", height: "75%" }}>
          <Card
            className="mt-5 mx-5"
            style={{ backgroundColor: "black", color: "white" }}
          >
            <Card.Header as="h4">User Profile</Card.Header>
            <Card.Body className="mt-3 mx-5">
              {res === undefined ? (
                <Card.Text></Card.Text>
              ) : (
                <>
                  <Card.Text>UserID {res[0]["id"]}</Card.Text>
                  <hr />
                </>
              )}
              {res === undefined ? (
                <Card.Text></Card.Text>
              ) : (
                <>
                  <Card.Text>Username {res[0]["uname"]}</Card.Text>
                  <hr />
                </>
              )}
              {cuser === null ? (
                <Card.Text></Card.Text>
              ) : (
                <>
                  <Card.Text>Email {cuser}</Card.Text>
                  <hr />
                </>
              )}
              {res === undefined || res[0]["phone"] === null ? (
                <Card.Text></Card.Text>
              ) : (
                <>
                  <Card.Text>Phone {res[0]["phone"]}</Card.Text>
                  <hr />
                </>
              )}
              {res === undefined || res[0]["address"] === null ? (
                <Card.Text></Card.Text>
              ) : (
                <>
                  <Card.Text>Address </Card.Text>
                  <Card.Text>Street {res[0]["address"]["street"]}</Card.Text>
                  <hr />
                </>
              )}
              {res === undefined || res[0]["address"] === null ? (
                <Card.Text></Card.Text>
              ) : (
                <>
                  <Card.Text>City {res[0]["address"]["city"]}</Card.Text>
                  <hr />
                </>
              )}
              {res === undefined || res[0]["address"] === null ? (
                <Card.Text></Card.Text>
              ) : (
                <>
                  <Card.Text>State {res[0]["address"]["state"]} </Card.Text>
                  <hr />
                </>
              )}{" "}
              {res === undefined || res[0]["address"] === null ? (
                <Card.Text></Card.Text>
              ) : (
                <>
                  <Card.Text>Pincode {res[0]["address"]["pincode"]}</Card.Text>
                </>
              )}
              <Button
                variant="outline-primary"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/UpdateProfile");
                }}
              >
                Update Profile
              </Button>
            </Card.Body>
            {/* <Card.Footer className="text-muted"></Card.Footer> */}
          </Card>
        </div>
      </div>
    </>
  );
};

export default Profile;
