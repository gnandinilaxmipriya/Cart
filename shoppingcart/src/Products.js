import React from "react";
import { useContext } from "react";
import UserContext from "./userContext";
const Products = () => {
  const { cuser } = useContext(UserContext);
  return <div>Productssss {cuser}</div>;
};

export default Products;
