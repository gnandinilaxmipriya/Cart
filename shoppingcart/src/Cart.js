import React, { useEffect, useState } from "react";
import { useContext } from "react";
import UserContext from "./userContext";
import Card from "react-bootstrap/Card";
// import "./components/card.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import AllCartItems from "./components/AllCartItems";
const Cart = () => {
  const { cuser } = useContext(UserContext);
  // const [cartitemId, setCartitemId] = useState("");
  // const [productId, setProductId] = useState("");
  // const [quantity, setQuantity] = useState("");
  const [userId, setUserId] = useState("");
  const [result, setResult] = useState([]);
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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Card className="mt-5 mx-3">
        <Row lg={3}>
          {result.map((val, index) => {
            return (
              <Col className="d-flex" key={index}>
                <AllCartItems res={val} userId={userId} />
              </Col>
            );
          })}
        </Row>
      </Card>
    </div>
  );
};

export default Cart;
