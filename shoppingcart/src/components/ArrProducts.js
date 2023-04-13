import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import "./card.css";

const ArrProducts = ({ data, index }) => {
  return (
    <>
      <div className="">
        <Card
          style={{ width: "18rem" }}
          className="box col-lg mx-5 my-3"
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

            {data["subcategory"] !== undefined &&
              data["subcategory"].map((val, i) => {
                return (
                  <div key={i}>
                    <Card.Title>Sub Category - {i + 1}</Card.Title>
                    <Card.Text>{val}</Card.Text>
                  </div>
                );
              })}
            <Card.Title>Price</Card.Title>
            <Card.Text>{data["price"]}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default ArrProducts;
