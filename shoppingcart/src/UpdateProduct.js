import React, { useEffect, useState } from "react";
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
import "./AddProduct.css";
import "./Main.css";
// import { useLocation } from "react-router";
import { useLocation } from "react-router-dom";
const UpdateProduct = () => {
  let navigate = useNavigate();
  // const { state } = useLocation().state;
  // const { data } = state;
  const location = useLocation();
  const productId = location.state["id"];
  console.log("location", productId);
  const { cuser } = useContext(UserContext);
  const [listingData, setListingData] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [details, setDetails] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState([]);
  // const [id, setId] = useState("");
  // const [res, setRes] = useState({});

  const [filepath, setFilepath] = useState("");
  useEffect(() => {
    showProducts();
  }, []);
  const showProducts = async () => {
    console.log(productId);

    const url = `http://localhost:8080/products/getById/${productId}`;
    await axios
      .get(url)
      .then((result) => {
        console.log(result);
        if (result && productId.length !== 0) {
          // setRes(result.data);
          setName(result.data["name"]);
          setCategory(result.data["category"]);
          setDetails(result.data["details"]);
          setPrice(result.data["price"]);
          console.log(result.data["subcategory"], "hey");
          setSubcategory(result.data["subcategory"]);
          setFilepath(result.data["filepath"]);
          // setId(productId);
        } else {
          alert("wait");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleAdd = () => {
    const arr = [...subcategory, []];
    setSubcategory(arr);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // setFilepath(listingData.selectedFile);
    if (!isNaN(price)) {
      const list = {
        productId: productId,
        name: name,
        price: price,
        details: details,
        category: category,
        subcategory: subcategory,
      };
      if (listingData.selectedFile === undefined) {
        list["filepath"] = filepath;
      } else {
        list["filepath"] = listingData.selectedFile;
      }
      await axios
        .put("http://localhost:8080/products/updateProduct", list)
        .then((res) => {
          console.log(res);
          if (res) {
            alert("product updated");
            navigate("/ViewProductById");
          } else {
            alert("wait");
            navigate("/updateProduct");
          }
        })
        .catch((error) => {
          console.log(error);
        });

      console.log(list, "list hey meh");
    } else {
      alert("Please enter a valid price");
    }
  };
  // console.log(subcategory, "heyyy");
  // console.log(state, "heheh");
  return (
    <div className="App mt-5 mx-5" style={{ width: "95%", height: "75%" }}>
      {/* <Card className="mt-5 mx-5"> */}
      {/* <Card.Header as="h4">Update Product</Card.Header> */}
      <div className="d-flex align-items-center justify-content-center">
        <h1 className="gify">Update Product</h1>
      </div>
      <div className="App d-flex align-items-center justify-content-center mt-3 mx-5">
        <Form
          className=""
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <Card.Img
            variant="top"
            src={filepath}
            style={{ width: "70%", height: "20%" }}
          />
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
            controlId="formBasicEmail095678"
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
            <div className="file mx-5">
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
          <Button variant="outline-primary" type="submit" className="mt-3">
            Submit
          </Button>
          <Button
            variant="outline-danger"
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
      </div>
      {/* </Card> */}
    </div>
  );
};

export default UpdateProduct;
