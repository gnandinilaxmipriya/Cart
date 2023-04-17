import React from "react";
// import Pagination from "react-bootstrap/Pagination";
import Button from "react-bootstrap/Button";
import "./Pagination.css";
const Pagination2 = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }
  // const nPages = pages.length;
  // const nextPage = () => {
  //   if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  // };
  // const prevPage = () => {
  //   if (currentPage !== 1) setCurrentPage(currentPage - 1);
  // };
  return (
    // <div className="pagination">
    //   {pages.map((page, index) => {
    //     return (
    //       <Button
    //         key={index}
    //         onClick={() => {
    //           setCurrentPage(page);
    //         }}
    //         className={page === setCurrentPage ? "active" : ""}
    //       >
    //         {page}
    //       </Button>
    //     );
    //   })}
    // </div>
    <>
      <nav>
        <ul className="pagination justify-content-center">
          {/* <li className="page-item">
            <a className="page-link" onClick={prevPage} href="#">
              Previous
            </a>
          </li> */}
          {pages.map((pgNumber) => (
            <li
              key={pgNumber}
              className={`page-item ${
                currentPage === pgNumber ? "active" : ""
              } `}
            >
              <Button
                variant="outline-dark"
                onClick={() => setCurrentPage(pgNumber)}
                className="page-link"
              >
                {pgNumber}
              </Button>
            </li>
          ))}
          {/* <li className="page-item">
            <a className="page-link" onClick={nextPage} href="#">
              Next
            </a>
          </li> */}
        </ul>
      </nav>
    </>
  );
};

export default Pagination2;
