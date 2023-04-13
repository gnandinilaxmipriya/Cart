import React, { useEffect, useState } from "react";
import { useContext } from "react";
import UserContext from "./userContext";
import axios from "axios";
import ArrProducts from "./components/ArrProducts";
import "bootstrap/dist/css/bootstrap.min.css";

// import "./components/card.css";
const Home = () => {
  const [result, setResult] = useState([]);
  useEffect(() => {
    showProducts();
  }, []);
  const showProducts = async () => {
    await axios
      .get("http://localhost:8080/products/getAll")
      .then((result) => {
        console.log(result);
        setResult(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const { cuser } = useContext(UserContext);
  return (
    <div>
      {result.map((data, index) => {
        return (
          <div className="" key={index}>
            <ArrProducts data={data} index={index} />
          </div>
        );
      })}
    </div>
  );
};

export default Home;
