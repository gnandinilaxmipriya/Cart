import { React, useState } from "react";
// import { useContext } from "react";
// import UserContext from "./userContext";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import "./App.css";
// import Navigate from "react-dom";
// import UpdateProduct from "./UpdateProduct";
// import validator from "validator";
const ViewProductById = () => {
  // const { cuser } = useContext(UserContext);
  const [productId, setProductId] = useState("");
  const [res, setRes] = useState({});
  const [show, setShow] = useState(false);
  // const [update, setUpdate] = useState(false);
  const handleClose = () => {
    setProductId("");
    setShow(false);
  };

  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(productId);
    const url = `http://localhost:8080/products/getById/${productId}`;
    await axios
      .get(url)
      .then((result) => {
        console.log(result);
        if (result && productId.length !== 0) {
          setRes(result.data);
          setShow(true);
        } else {
          alert("check input");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      {/* {console.log(res["name"], "stattettttt")} */}
      <div className="App mt-5 mx-5" style={{ width: "95%", height: "75%" }}>
        <Card className="mt-5 mx-5">
          <Card.Header as="h4">View Product By Id </Card.Header>
          <Card.Body className="App d-flex align-items-center justify-content-center mt-3 mx-5">
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
                  label="Product Id"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Enter Product Id"
                    value={productId}
                    onChange={(e) => {
                      e.preventDefault();
                      setProductId(e.target.value);
                    }}
                    required
                  />
                </FloatingLabel>
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3 mx-5">
                Submit
              </Button>
              <Button
                variant="danger"
                type="button"
                className="mt-3 mx-4"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/Home");
                }}
              >
                Cancel
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            {res["name"] !== undefined}
            <Modal.Title className="">{res["name"]}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="mx-5 my-3">
            <Card style={{ width: "18rem" }} className="col-lg mx-5 my-3">
              {res["filepath"] !== undefined}
              <Card.Img variant="top" src={res["filepath"]} />
              <Card.Body>
                <Card.Title>Details</Card.Title>
                {res["details"] !== undefined}
                <Card.Text>{res["details"]}</Card.Text>
                <hr />
                <Card.Title>Category</Card.Title>
                {res["category"] !== undefined}
                <Card.Text>{res["category"]}</Card.Text>
                <hr />
                {res["subcategory"] !== undefined &&
                  res["subcategory"].map((data, i) => {
                    return (
                      <div key={i}>
                        <Card.Title>Sub Category - {i + 1}</Card.Title>
                        <Card.Text>{data}</Card.Text>
                        <hr />
                      </div>
                    );
                  })}
                <Card.Title>Price</Card.Title>
                <Card.Text>{res["price"]}</Card.Text>
              </Card.Body>
            </Card>
          </Modal.Body>
          <Modal.Footer>
            {/* {update === true && <UpdateProduct id={res["productId"]} />} */}
            <Button
              variant="primary"
              onClick={() => {
                // setUpdate(true);
                navigate("/updateProduct", {
                  state: { id: productId },
                });
                // <Navigate to={"/updateProduct"} state={{ productId }} />;
              }}
            >
              Update product
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default ViewProductById;
