import React from "react";
import Col from "react-bootstrap/Col";
import ArrProducts from "./ArrProducts";
const Arr = ({ currentPosts, cuser }) => {
  return (
    <>
      {currentPosts.map((data, index) => {
        return (
          <>
            <Col md="4" key={index}>
              <div key={index}>
                <ArrProducts data={data} index={index} mail={cuser} />
              </div>
            </Col>
          </>
        );
      })}
    </>
  );
};

export default Arr;
