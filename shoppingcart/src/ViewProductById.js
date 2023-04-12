import React from "react";
import { useContext } from "react";
import UserContext from "./userContext";
const ViewProductById = () => {
  const { cuser } = useContext(UserContext);
  return <div>producst by id {cuser}</div>;
};

export default ViewProductById;
