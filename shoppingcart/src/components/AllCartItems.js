import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import "./card.css";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
const AllCartItems = ({ res, userId, setShowbuttons }) => {
  const [data, setData] = useState([]);
  const [cartItem, setCartItem] = useState([]);
  const [totalPrice, setTotalPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  //   let sublist = "";
  //   if (data["subcategory"] !== undefined && data["subcategory"] !== null) {
  //     data["subcategory"].map((val) => {
  //       sublist = sublist + " " + val + ".";
  //       return sublist;
  //     });
  //   } else {
  //     alert("wait");
  //   }
  useEffect(() => {
    getProductFromCart();
  }, []);
  const getProductFromCart = async () => {
    console.log(res, "child");
    const userId = res["userId"];
    const productId = res["productId"];
    const cartitemId = res["cartitemId"];
    // setLength(quantity);
    await axios
      .get(
        `http://localhost:8080/cart/${userId}/get/${productId}/${cartitemId}`
      )
      .then((res) => {
        console.log(res, "products details");
        setData(res.data[1]);
        setCartItem(res.data[0]);
        setQuantity(res.data[0]["quantity"]);
        setPrice(res.data[1]["price"]);
        let q = res.data[0]["quantity"];
        let p = res.data[1]["price"];
        let tprice = q * p;
        setTotalPrice(tprice);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDelete = async () => {
    const list = {
      cartitemId: cartItem["cartitemId"],
      userId: userId,
      productId: data["productId"],
      quantity: quantity,
    };
    console.log(list, "already in cart");
    if (data.length !== 0) {
      if (quantity !== 1) {
        await axios
          .put(
            `http://localhost:8080/cart/${userId}/delete/${data["productId"]}`,
            list
          )
          .then((res) => {
            console.log(list, "its list delete");
            console.log(res, "hey deleted");
            let q = res.data["quantity"];
            let p = price;
            let tprice = q * p;
            setTotalPrice(tprice);
            setQuantity(res.data["quantity"]);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log("quantity=1");
        await axios
          .delete(
            `http://localhost:8080/cart/${userId}/remove/${data["productId"]}`
          )
          .then((res) => {
            console.log(res, "hey");
            setData("");

            setCartItem("");
          })
          .then((error) => console.log(error));
      }
    } else {
      setShowbuttons(true);
    }
  };
  const handleAdd = () => {
    const list = {
      cartitemId: cartItem["cartitemId"],
      userId: userId,
      productId: data["productId"],
      quantity: quantity,
    };
    console.log(list, "already in cart");
    axios
      .put(
        `http://localhost:8080/cart/${userId}/put/${data["productId"]}`,
        list
      )
      .then((res) => {
        console.log(list, "its list cart");
        console.log(res, "hey aded in cartt");
        let q = res.data["quantity"];
        let p = price;
        let tprice = q * p;
        setTotalPrice(tprice);
        setQuantity(res.data["quantity"]);
        // setLength(res.data["quantity"]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      {data !== "" && cartItem !== "" && (
        <div className="">
          <ListGroup.Item
            style={{ backgroundColor: "black" }}
            className="mx-5 my-3"
          >
            <Card style={{ width: "20rem" }} className="flex-fill col-lg  my-3">
              {data["filepath"] !== undefined}
              <Card.Img
                variant="top"
                src={data["filepath"]}
                className="mx-3 mt-3"
                style={{ width: "18rem", height: "10rem" }}
              />{" "}
              <Card.Body>
                <Accordion>
                  <Accordion.Item eventKey="0">
                    {data["name"] !== undefined}
                    <Accordion.Header>{data["name"]}</Accordion.Header>
                    <Accordion.Body>
                      {/* <Card.Title>Details</Card.Title> */}
                      {data["details"] !== undefined}
                      <Card.Text>
                        <Badge bg="dark">Details</Badge> {data["details"]}
                      </Card.Text>

                      {/* <Card.Title>Category</Card.Title> */}
                      {data["category"] !== undefined}
                      <Card.Text>
                        {" "}
                        <Badge bg="dark">Category</Badge> {data["category"]}
                      </Card.Text>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                {/* {data["subcategory"] !== undefined &&
          data["subcategory"].map((val, i) => {
            return (
              <div key={i}>
                <Card.Title>Sub Category - {i + 1}</Card.Title>
                <Card.Text>{val}</Card.Text>
              </div>
            );
          })} */}
                {/* {data["subcategory"] !== undefined}
            <Card.Title>Sub Category</Card.Title>
            <Card.Text>{sublist}</Card.Text> */}
                {/* <Card.Title>Price</Card.Title> */}
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
                    onClick={(e) => {
                      handleDelete();
                    }}
                  >
                    -
                  </Button>
                  <Card.Title className="mx-3">{quantity}</Card.Title>
                  <Button
                    variant="outline-dark"
                    type="submit"
                    onClick={() => {
                      handleAdd();
                    }}
                  >
                    +
                  </Button>
                </div>
                <div className="d-flex justify-content-center align-items-center mt-5">
                  <Card.Title>Total Price - {totalPrice}</Card.Title>
                </div>
              </Card.Body>
            </Card>
          </ListGroup.Item>
        </div>
      )}
      {/* {data === "" && cartItem === "" && (
        <>
          <h5 className="d-flex justify-content-center align-items-center mt-5">
            Cart empty
          </h5>
        </>
      )} */}
    </>
  );
};

export default AllCartItems;
