import React from "react";
import { useContext } from "react";
import UserContext from "./userContext";
const Category = () => {
  const { cuser } = useContext(UserContext);
  return <div>Category {cuser}</div>;
};

export default Category;
