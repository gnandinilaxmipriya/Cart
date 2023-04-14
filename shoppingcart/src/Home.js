import React, { useEffect, useState } from "react";
import { useContext } from "react";
import UserContext from "./userContext";
import axios from "axios";
import ArrProducts from "./components/ArrProducts";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
// import "./components/card.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const Home = () => {
  const [result, setResult] = useState([]);
  const { cuser } = useContext(UserContext);
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

  return (
    <Card className="mt-5 mx-3">
      <Row lg={3}>
        {result !== null &&
          result.map((data, index) => {
            return (
              <Col className="d-flex" key={index}>
                <div key={index}>
                  <ArrProducts data={data} index={index} mail={cuser} />
                </div>
              </Col>
            );
          })}
      </Row>
    </Card>
  );
};

export default Home;
