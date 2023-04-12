import React, { useState } from "react";
import { useContext } from "react";
import UserContext from "./userContext";
import FileBase64 from "react-file-base64";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import "./App.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";
const AddProduct = () => {
  let navigate = useNavigate();
  const { cuser } = useContext(UserContext);
  const [listingData, setListingData] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [details, setDetails] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState([]);
  const handleAdd = () => {
    const arr = [...subcategory, []];
    setSubcategory(arr);
  };
  // const [filepath, setFilepath] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    // setFilepath(listingData.selectedFile);
    const list = {
      name: name,
      price: price,
      details: details,
      category: category,
      subcategory: subcategory,
      filepath: listingData.selectedFile,
    };
    console.log(list, "list hey meh");
    await axios
      .post("http://localhost:8080/addProduct", list)
      .then((result) => {
        console.log(result, "result huh bhai");
        console.log(result.data["subcategory"][0]);
        console.log(result.data["subcategory"][1]);
        alert("Product added");
        navigate("/Home");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // console.log(subcategory, "heyyy");
  return (
    <div className="App mt-5 mx-5" style={{ width: "95%", height: "75%" }}>
      <Card className="mt-5 mx-5">
        <Card.Header as="h4">Add Product {cuser}</Card.Header>
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
                label="Product Name"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Enter Product Name"
                  value={name}
                  onChange={(e) => {
                    e.preventDefault();
                    setName(e.target.value);
                  }}
                  required
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group
              className="mb-3 col-lg-9 mt-3 mx-5"
              controlId="formBasicEmail09"
            >
              <FloatingLabel
                controlId="floatingInput"
                label="Price"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Enter Price"
                  value={price}
                  onChange={(e) => {
                    e.preventDefault();
                    setPrice(e.target.value);
                  }}
                  required
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group
              className="mb-3 col-lg-9 mt-3 mx-5"
              controlId="formBasicEmail09"
            >
              <FloatingLabel
                controlId="floatingInput"
                label="Details"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Enter details"
                  value={details}
                  onChange={(e) => {
                    e.preventDefault();
                    setDetails(e.target.value);
                  }}
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group
              className="mb-3 col-lg-9 mt-3 mx-5"
              controlId="formBasicEmail898"
            >
              <FloatingLabel
                controlId="floatingInput"
                label="Category"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Enter Category"
                  value={category}
                  onChange={(e) => {
                    e.preventDefault();
                    setCategory(e.target.value);
                  }}
                  required
                />
              </FloatingLabel>
            </Form.Group>
            <Button
              variant="secondary"
              className="mt-3"
              onClick={() => handleAdd()}
            >
              Add Subcategories
            </Button>
            {subcategory.map((val, i) => {
              return (
                <div className="mt-3 mx-5" key={i}>
                  <InputGroup>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Subcategory"
                      className="mb-3 mt-3"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Enter Subcategory"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        value={val}
                        onChange={(e) => {
                          e.preventDefault();
                          const inputdata = [...subcategory];
                          inputdata[i] = e.target.value;
                          setSubcategory(inputdata);
                        }}
                        required
                      />
                    </FloatingLabel>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="mb-3 mt-3"
                      onClick={(e) => {
                        const deleteVal = [...subcategory];
                        deleteVal.splice(i, 1);
                        setSubcategory(deleteVal);
                      }}
                    >
                      X
                    </Button>
                  </InputGroup>
                </div>
              );
            })}

            <Form.Group
              className="mb-3 col-lg-9 mt-5 mx-5"
              controlId="formBasicEmail6767"
            >
              <div className="d-flex align-items-center justify-content-center">
                <FileBase64
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) =>
                    setListingData({ ...listingData, selectedFile: base64 })
                  }
                  required
                />
              </div>
            </Form.Group>

            <br />
            <Button variant="primary" type="submit" className="mt-3">
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
    </div>
  );
};

export default AddProduct;
