import React, { useEffect, useState } from "react";
import { useContext } from "react";
import UserContext from "./userContext";
import Card from "react-bootstrap/Card";
// import "./components/card.css";
import ListGroup from "react-bootstrap/ListGroup";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import axios from "axios";
import AllCartItems from "./components/AllCartItems";
import Button from "react-bootstrap/esm/Button";
import Accordion from "react-bootstrap/Accordion";
// import Offcanvas from "react-bootstrap/Offcanvas";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
// import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
// import Alert from "react-bootstrap/Alert";
const Cart = () => {
  const { cuser } = useContext(UserContext);
  // const [cartitemId, setCartitemId] = useState("");
  // const [productId, setProductId] = useState("");
  // const [quantity, setQuantity] = useState("");
  const [userId, setUserId] = useState("");
  const [result, setResult] = useState([]);
  let navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [finalRes, setFinalRes] = useState([]);
  const [finalProduct, setFinalProduct] = useState([]);
  // const [quantity, setQuantity] = useState({});
  // const [productId, setProductId] = useState({});
  // const [priceArr, setPriceArr] = useState([]);
  const [showbuttons, setShowbuttons] = useState(false);
  // const [palert, setPalert] = useState(false);
  let today = new Date();
  let date =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
  let time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  // console.log(date, " time date", time);
  const [totalPrice, setTotalPrice] = useState("");
  const handleClose = () => setShow(false);
  useEffect(() => {
    getAllCart();
  }, []);

  const getAllCart = async () => {
    let userId1;
    await axios
      .get(`http://localhost:8080/getUserId/${cuser}`)
      .then((result) => {
        console.log(result.data, "id id ");
        userId1 = result.data;
        setUserId(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(userId1, "outside");
    await axios
      .get(`http://localhost:8080/cart/getAllCart/${userId1}`)
      .then((result) => {
        console.log(result, "cart details");
        setResult(result.data);
        // setLength(result.data["quantity"].length);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDeleteAllFromCart = async () => {
    await axios
      .delete(`http://localhost:8080/cart/empty/${userId}`)
      .then((res) => {
        setResult("");
        // setLength(0);
        console.log("deleted");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handlePlaceOrder = async () => {
    console.log("hey");

    // navigate("/Order");
    finalRes.map(async (val) => {
      let list = {
        cartitemId: val["cartitemId"],
        userId: userId,
        orderstatus: "confirm",
        date: date,
        time: time,
        productId: val["productId"],
        quantity: val["quantity"],
      };
      return await axios
        .post(`http://localhost:8080/order/${userId}/createOrder`, list)
        .then(async (res) => {
          console.log(res, "order created");
        })
        .catch((error) => {
          console.log(error);
        });
    });
    await axios
      .delete(`http://localhost:8080/cart/empty/${userId}`)
      .then((rest) => {
        setResult("");
        setShow(false);
        console.log(rest, "deleted after placed");
      })
      .catch((error) => {
        console.log(error);
      });
    alert("Order Placed!");
  };
  const handleShow = async () => {
    // await axios
    //   .get(`http://localhost:8080/cart/totalprice/${userId}`)
    //   .then((res) => {
    //     console.log(res.data, "prices*quant");
    //     setPriceArr(res.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    if (result.length !== 0) {
      setShow(true);
      await axios
        .get(`http://localhost:8080/cart/getAllCart/${userId}`)
        .then((res) => {
          setFinalRes(res.data);
          console.log(res.data, "after quantity change");
        })
        .catch((error) => {
          console.log(error);
        });
      await axios
        .get(`http://localhost:8080/cart/getProducts/${userId}`)
        .then((res) => {
          console.log(res, "all products of userid");
          setFinalProduct(res.data);
          let sum = 0;
          let quantity = 0;
          let price = 0;
          res.data.map((val) => {
            quantity = parseInt(val["quantity"]);
            price = parseInt(val["price"]);
            sum = sum + quantity * price;
            console.log(quantity, " heyyeye", price);
            return "hey";
          });
          setTotalPrice(sum);
          // setLength(quantity);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setShowbuttons(true);
      setShow(false);
    }
  };
  const handleCheckOut = () => {
    navigate("/Order", {
      state: { id: userId },
    });
  };
  return (
    <div>
      <div className="mt-5 mx-4 d-flex justify-content-center align-items-center">
        <Button
          variant="outline-light"
          onClick={() => {
            handleShow();
          }}
          disabled={showbuttons}
        >
          Place Order
        </Button>
        <Button
          variant="outline-danger"
          className="mx-3"
          onClick={() => {
            handleDeleteAllFromCart();
          }}
          // disabled={result.length === 0 && showbuttons}
        >
          Empty Cart
        </Button>
        <Button
          variant="outline-light"
          className=""
          onClick={() => {
            handleCheckOut();
          }}
        >
          Checkout
        </Button>
      </div>
      {/* <Card className="" style={{ backgroundColor: "black" }}> */}
      <div className="mt-5">
        {result !== "" &&
          result.map((val, index) => {
            return (
              <ListGroup key={index} className="d-inline-flex" variant="flush">
                {/* <Row className="no-gutters">
                  <Col md="4"> */}
                <AllCartItems
                  res={val}
                  userId={userId}
                  setShowbuttons={setShowbuttons}
                  // setLength={setLength}
                />
                {/* </Col>
                </Row> */}
              </ListGroup>
            );
          })}
      </div>
      {/* </Card> */}
      <div>
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Please Confirm Order</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {finalProduct.map((val, index) => {
              return (
                // <div key={index}>
                //   <img
                //     src={val["filepath"]}
                //     alt="hey"
                //     style={{ width: "5rem" }}
                //     className="d-flex justify-content-end align-items-start"
                //   />
                //   Product name{val["name"]}
                // </div>

                <Accordion defaultActiveKey="0" key={index}>
                  <Accordion.Item eventKey={index}>
                    <Accordion.Header>{val["name"]}</Accordion.Header>
                    <Accordion.Body>
                      <img
                        src={val["filepath"]}
                        alt="hey"
                        style={{ width: "5rem", height: "5rem" }}
                      />

                      <h6>Quantity: {val["quantity"]}</h6>
                      <h6>Details: {val["details"]}</h6>
                      <h6>Price: {val["price"]}</h6>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              );
            })}
            <h4 className="d-flex justify-content-center align-items-center">
              Total Price: {totalPrice}
            </h4>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>

            <div className="d-flex justify-content-center align-items-center">
              <Button
                onClick={() => {
                  handlePlaceOrder();
                }}
                variant="info"
              >
                Confirm
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
        {/* {palert === true && <Alert variant="success">Order Placed!</Alert>} */}
      </div>
      {/* <div className=" mt-1 mx-4 col d-flex justify-content-end align-items-start">
        <Button
          variant="danger"
          className="mx-3 mt-5"
          onClick={() => {
            handleCheckOut();
          }}
        >
          Checkout
        </Button>
      </div> */}
      {/* {result !== "" && result.length !== 0 && ( */}
      {/* <div className="mt-5 mx-4 d-flex justify-content-center align-items-center">
        <Button
          variant="outline-light"
          onClick={() => {
            handleShow();
          }}
        >
          Place Order
        </Button>
        <Button
          variant="outline-danger"
          className="mx-3"
          onClick={() => {
            handleDeleteAllFromCart();
          }}
        >
          Empty Cart
        </Button>
        <Button
          variant="outline-light"
          className=""
          onClick={() => {
            handleCheckOut();
          }}
        >
          Checkout
        </Button>
      </div> */}
      {/* )} */}
    </div>
  );
};

export default Cart;
