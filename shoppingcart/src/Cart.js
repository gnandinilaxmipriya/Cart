import React from "react";
import { useContext } from "react";
import UserContext from "./userContext";
const Cart = () => {
  const { cuser } = useContext(UserContext);
  return <div>Cartt {cuser}</div>;
};

export default Cart;
