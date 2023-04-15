import axios from "axios";
import React, { useEffect, useState } from "react";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import Accordion from "react-bootstrap/Accordion";
const OrderItems = ({ userId, res, index }) => {
  console.log(res, "heheh");
  const [productData, setProductData] = useState([]);
  const [totalPrice, setTotalPrice] = useState();
  useEffect(() => {
    getProductsdetails();
  }, []);
  const getProductsdetails = async () => {
    let p;
    let q = parseInt(res["quantity"]);
    await axios
      .get(
        `http://localhost:8080/cart/${userId}/get/${res["productId"]}/${res["cartitemId"]}`
      )
      .then((result) => {
        console.log(result.data[1], "productsss");
        setProductData(result.data[1]);
        p = parseInt(result.data[1]["price"]);
        setTotalPrice(p * q);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="mt-1">
        <ListGroup as="ul">
          <ListGroup.Item className="d-flex justify-content-between align-items-start">
            <Accordion defaultActiveKey="0" key={index}>
              <Accordion.Item eventKey={index}>
                <Accordion.Header>
                  {productData["name"]}{" "}
                  <Badge bg="primary" pill className="mx-3">
                    {res["quantity"]}
                  </Badge>
                </Accordion.Header>
                <Accordion.Body>
                  <img
                    src={productData["filepath"]}
                    alt="hey"
                    style={{ width: "5rem", height: "5rem" }}
                  />

                  <h6>Details: {productData["details"]}</h6>
                  <h6>Price: {productData["price"]}</h6>
                  <h6>Ordered Date: {res["date"]}</h6>
                  <h6>Ordered Time: {res["time"]}</h6>
                  <h6>Total Price: {totalPrice}</h6>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </ListGroup.Item>
        </ListGroup>
      </div>
    </>
  );
};

export default OrderItems;
