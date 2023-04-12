import React from "react";
import { useContext } from "react";
import UserContext from "./userContext";

const Home = () => {
  const { cuser } = useContext(UserContext);
  return <div>Home {cuser}</div>;
};

export default Home;
