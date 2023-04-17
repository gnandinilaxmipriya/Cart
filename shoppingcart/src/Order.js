// import Button from "react-bootstrap/Button";
import React, { useEffect, useState } from "react";
// import Alert from "react-bootstrap/Alert";
import { useLocation } from "react-router-dom";
import axios from "axios";
import OrderItems from "./components/OrderItems";
import Card from "react-bootstrap/Card";
import "./Main.css";
const Order = () => {
  const location = useLocation();
  const userId = location.state["id"];
  const [orderList, setOrderList] = useState([]);
  useEffect(() => {
    getOrderDetails();
  }, []);
  const getOrderDetails = async () => {
    await axios
      .get(`http://localhost:8080/cart/getOrdersTime/${userId}`)
      .then((result) => {
        console.log(result, "order table data");
        setOrderList(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="mt-5 d-flex align-items-center justify-content-center">
        {orderList.length !== 0 && <h1 className="gify">Order History</h1>}
        {orderList.length === 0 && (
          <h1 className="gify">Embark the journey to Joy</h1>
        )}
      </div>

      <div className="mt-5 d-flex align-items-center justify-content-center">
        <Card style={{ width: "18rem" }}>
          {orderList.map((val, index) => {
            return (
              <div key={index} className="">
                <OrderItems userId={userId} res={val} />
              </div>
            );
          })}
        </Card>
      </div>
    </>
  );
};

export default Order;
