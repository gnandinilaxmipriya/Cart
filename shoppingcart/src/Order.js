// import Button from "react-bootstrap/Button";
import React, { useEffect, useState } from "react";
// import Alert from "react-bootstrap/Alert";
import { useLocation } from "react-router-dom";
import axios from "axios";
import OrderItems from "./components/OrderItems";
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
    <div className="mt-5 d-flex justify-content-center align-items-center">
      {orderList.map((val, index) => {
        return (
          <div key={index} className="">
            <OrderItems userId={userId} res={val} />
          </div>
        );
      })}
    </div>
  );
};

export default Order;
