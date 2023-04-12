import React from "react";
import { useContext } from "react";
import UserContext from "./userContext";
const UpdateProduct = () => {
  const { cuser } = useContext(UserContext);
  return <div> update producst {cuser}</div>;
};

export default UpdateProduct;
