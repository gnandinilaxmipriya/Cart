// import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import "./card.css";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Badge from "react-bootstrap/Badge";
// import { useState } from "react";
// import { useState } from "react";
const ArrProducts = ({ data, index, mail }) => {
  // const [cartitemId, setCartitemId] = useState("");
  // const [quantity, setQuantity] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  let sublist = "";
  if (data["subcategory"] !== undefined && data["subcategory"] !== null) {
    data["subcategory"].map((val) => {
      sublist = sublist + " " + val + ".";
      return sublist;
    });
  } else {
    alert("wait");
  }
  // console.log(sublist);
  const handleAddtoCart = async () => {
    let userId;
    let productId = data["productId"];
    console.log(productId, "product id");
    await axios
      .get(`http://localhost:8080/getUserId/${mail}`)
      .then((result) => {
        console.log(result.data, "id id ");
        userId = result.data;
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(userId, "outside");
    await axios
      .get(`http://localhost:8080/cart/${userId}/getcartid/${productId}`)
      .then((result) => {
        console.log(result, "product's cartitem id");
        // setCartitemId(result.data[0]);
        // setQuantity(result.data[1]);
        // console.log(cartitemId, " hhhhh", quantity);
        if (result.data[0] === "empty") {
          console.log("no items");
          const list = {
            userId: userId,
            productId: productId,
            quantity: "1",
          };
          console.log(list);
          axios
            .put(`http://localhost:8080/cart/${userId}/put/${productId}`, list)
            .then((res) => {
              console.log(list, "its list");
              console.log(res, "hey aded");
              alert("Added to cart");
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          const list = {
            cartitemId: result.data[0],
            userId: userId,
            productId: productId,
            quantity: result.data[1],
          };
          console.log(list, "already in cart");
          axios
            .put(`http://localhost:8080/cart/${userId}/put/${productId}`, list)
            .then((res) => {
              console.log(list, "its list");
              console.log(res, "hey aded");
              alert("Added to cart");
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handlePop = () => {
    console.log("hehe");
    setShow(true);
  };
  return (
    <>
      <div className="">
        <Card
          style={{ width: "19rem", backgroundColor: "white" }}
          className="flex-fill col-lg mx-5 my-3"
          key={index}
        >
          {data["filepath"] !== undefined}
          <Button
            variant="outline-light"
            type="submit"
            onClick={() => {
              handlePop();
            }}
          >
            {" "}
            <Card.Img
              variant="top"
              src={data["filepath"]}
              style={{ width: "16rem", height: "10rem" }}
            />
          </Button>

          <Card.Body>
            <Accordion>
              <Accordion.Item eventKey="0">
                {data["name"] !== undefined}
                <Accordion.Header>{data["name"]}</Accordion.Header>
                <Accordion.Body>
                  {/* <Card.Title>Product Name</Card.Title>

            <Card.Text></Card.Text> */}
                  {/* <Card.Title>Details</Card.Title> */}
                  {data["details"] !== undefined}
                  <Card.Text>
                    <Badge bg="dark">Details</Badge> {data["details"]}
                  </Card.Text>

                  {/* <Card.Title>Category</Card.Title> */}
                  {data["category"] !== undefined}
                  <Card.Text>
                    <Badge bg="dark">Category</Badge> {data["category"]}
                  </Card.Text>

                  {/* {data["subcategory"] !== undefined &&
              data["subcategory"].map((val, i) => {
                return (
                  <div key={i}>
                    <Card.Title>Sub Category - {i + 1}</Card.Title>
                    <Card.Text>{val}</Card.Text>
                  </div>
                );
              })} */}
                  {data["subcategory"] !== undefined}
                  <Card.Text>
                    <Badge bg="dark">Sub Category</Badge>
                  </Card.Text>
                  <Card.Text>
                    <Badge bg="secondary">{sublist}</Badge>
                  </Card.Text>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <div className="d-flex justify-content-center align-items-center mt-3">
              {data["price"] !== undefined}
              <Card.Title>
                <Badge bg="dark">Price</Badge> {data["price"]}
              </Card.Title>
              {/* <Card.Text>{data["price"]}</Card.Text> */}
            </div>
            <div className="d-flex justify-content-center align-items-center mt-3">
              <Button
                variant="outline-dark"
                type="submit"
                onClick={() => {
                  handleAddtoCart();
                }}
              >
                Add to Cart
              </Button>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <Button
                variant="light"
                type="submit"
                onClick={() => {
                  handlePop();
                }}
              ></Button>
            </div>
          </Card.Body>
        </Card>
        <Modal show={show} onHide={handleClose} className="col-lg mx-5 my-3">
          <Modal.Header closeButton>
            <Modal.Title>{data["name"]}</Modal.Title>
          </Modal.Header>
          {/* <Modal.Body> */}
          <Card
            style={{ width: "20rem" }}
            className="flex-fill col-lg mx-5 my-3"
            key={index}
          >
            {data["filepath"] !== undefined}
            <Card.Img
              variant="top"
              src={data["filepath"]}
              style={{ width: "20rem", height: "10rem" }}
            />

            <Card.Body>
              {/* <Card.Title>Product Name</Card.Title>
                {data["name"] !== undefined}
                <Card.Text>{data["name"]}</Card.Text> */}
              <Accordion>
                <Accordion.Item eventKey="0">
                  {data["name"] !== undefined}
                  <Accordion.Header>{data["name"]}</Accordion.Header>
                  <Accordion.Item></Accordion.Item>
                  <Accordion.Body>
                    {/* <Card.Title>Details</Card.Title> */}
                    {data["details"] !== undefined}
                    <Card.Text>
                      <Badge bg="dark">Details</Badge>
                      {data["details"]}
                    </Card.Text>

                    {/* <Card.Title>Category</Card.Title> */}
                    {data["category"] !== undefined}
                    <Card.Text>
                      <Badge bg="dark">Category</Badge>
                      {data["category"]}
                    </Card.Text>

                    {/* {data["subcategory"] !== undefined &&
              data["subcategory"].map((val, i) => {
                return (
                  <div key={i}>
                    <Card.Title>Sub Category - {i + 1}</Card.Title>
                    <Card.Text>{val}</Card.Text>
                  </div>
                );
              })} */}
                    {data["subcategory"] !== undefined}
                    <Card.Text>
                      <Badge bg="dark">Sub Category</Badge>
                    </Card.Text>
                    <Card.Text>
                      <Badge bg="secondary">{sublist}</Badge>
                    </Card.Text>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <div className="d-flex justify-content-center align-items-center mt-3">
                {data["price"] !== undefined}
                <Card.Title>
                  <Badge bg="dark">Price</Badge> {data["price"]}
                </Card.Title>
                {/* <Card.Text>{data["price"]}</Card.Text> */}
              </div>
              <div className="d-flex justify-content-center align-items-center mt-3">
                <Button
                  variant="outline-dark"
                  type="submit"
                  onClick={() => {
                    handleAddtoCart();
                  }}
                >
                  Add to Cart
                </Button>
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <Button
                  variant="light"
                  type="submit"
                  onClick={() => {
                    handlePop();
                  }}
                ></Button>
              </div>
            </Card.Body>
          </Card>
          {/* </Modal.Body> */}
        </Modal>
      </div>
    </>
  );
};

export default ArrProducts;
