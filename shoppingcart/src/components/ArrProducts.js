// import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import "./card.css";
import Button from "react-bootstrap/Button";
import axios from "axios";
// import { useState } from "react";
// import { useState } from "react";
const ArrProducts = ({ data, index, mail }) => {
  // const [cartitemId, setCartitemId] = useState("");
  // const [quantity, setQuantity] = useState("");
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

  return (
    <>
      <div className="">
        <Card
          style={{ width: "18rem" }}
          className="flex-fill col-lg mx-5 my-3"
          key={index}
        >
          {data["filepath"] !== undefined}
          <Card.Img
            variant="top"
            src={data["filepath"]}
            style={{ width: "18rem", height: "10rem" }}
          />
          <Card.Body>
            <Card.Title>Details</Card.Title>
            {data["details"] !== undefined}
            <Card.Text>{data["details"]}</Card.Text>

            <Card.Title>Category</Card.Title>
            {data["category"] !== undefined}
            <Card.Text>{data["category"]}</Card.Text>

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
            <Card.Title>Sub Category</Card.Title>
            <Card.Text>{sublist}</Card.Text>
            <Card.Title>Price</Card.Title>
            <Card.Text>{data["price"]}</Card.Text>
            <div className="d-flex justify-content-center align-items-center">
              <Button
                variant="warning"
                type="submit"
                onClick={() => {
                  handleAddtoCart();
                }}
              >
                Add to Cart
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default ArrProducts;
