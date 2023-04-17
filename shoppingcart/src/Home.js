import React, { useEffect, useState } from "react";
import { useContext } from "react";
import UserContext from "./userContext";
import axios from "axios";
// import ArrProducts from "./components/ArrProducts";
import "bootstrap/dist/css/bootstrap.min.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Card from "react-bootstrap/Card";
// import "./components/card.css";

import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import Offcanvas from "react-bootstrap/Offcanvas";
// import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Pagination from "./Pagination2";
import Arr from "./components/Arr";

const Home = () => {
  const [result, setResult] = useState([]);
  const { cuser } = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [clear, setClear] = useState(false);
  const [filter, setFilter] = useState(false);
  const [category, setCategory] = useState("");
  const [catData, setCatData] = useState([]);
  const [showCat, setShowCat] = useState(false);
  const [showmodal, setShowmodal] = useState(false);

  const [mcategory, setMcategory] = useState("");
  const [mprice, setMprice] = useState("");
  const [mname, setMname] = useState("");

  const [modalFilterData, setModalFilterData] = useState([]);
  const [modalfiltershow, setModalFilterShow] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(6);

  const [currentPage2, setCurrentPage2] = useState(1);
  const [currentPage3, setCurrentPage3] = useState(1);
  const [currentPage4, setCurrentPage4] = useState(1);
  // const [price, setPrice] = useState(false);
  // const handleClose = () => {
  //   setFilter(false);
  // };
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;

  const lastPostIndex2 = currentPage2 * postPerPage;
  const firstPostIndex2 = lastPostIndex2 - postPerPage;

  const lastPostIndex3 = currentPage3 * postPerPage;
  const firstPostIndex3 = lastPostIndex3 - postPerPage;

  const lastPostIndex4 = currentPage4 * postPerPage;
  const firstPostIndex4 = lastPostIndex4 - postPerPage;

  let currentPosts;
  let currentPostsSearchData;
  let currentPostsCatData;
  let currentPostsModalFilterData;
  if (result === null) {
    currentPosts = result;
  } else {
    currentPosts = result.slice(firstPostIndex, lastPostIndex);
  }
  if (searchData === null) {
    currentPostsSearchData = searchData;
  } else {
    currentPostsSearchData = searchData.slice(firstPostIndex2, lastPostIndex2);
  }
  if (catData === null) {
    currentPostsCatData = catData;
  } else {
    currentPostsCatData = catData.slice(firstPostIndex3, lastPostIndex3);
  }
  if (modalFilterData === null) {
    currentPostsModalFilterData = modalFilterData;
  } else {
    currentPostsModalFilterData = modalFilterData.slice(
      firstPostIndex4,
      lastPostIndex4
    );
  }

  const handleModalClose = () => {
    setShowmodal(false);
  };
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
  const handleClear = () => {
    // setShow(false);
    setClear(true);
    setSearch("");
    setSearchData(null);

    setCatData(null);
    setCategory("");
    setMcategory("");
    setMname("");
    setMprice("");

    setModalFilterData(null);

    showProducts();
    setFilter(false);
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    console.log("Hey", search);
    setResult(null);
    setShow(true);
    setClear(false);
    await axios
      .get(`http://localhost:8080/products/search/${search}`)
      .then((result) => {
        if (result.data.length === 0) {
          setSearchData(null);
          console.log("empty");
        } else {
          console.log(result);
          setSearchData(result.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleFilter = () => {
    setFilter(true);
    console.log(filter);
  };
  const handleCategoryFilter = async (e) => {
    e.preventDefault();
    setShowCat(true);
    setResult(null);
    setClear(false);
    await axios
      .post(`http://localhost:8080/products/search/${category}`)
      .then((result) => {
        console.log(result);
        if (result.data.length === 0) {
          setCatData(null);
          console.log("empty");
        } else {
          console.log(result);
          setCatData(result.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // const handlePrice = () => {
  //   setPrice(true);
  // };
  const handleShowModal = () => {
    setShowmodal(true);
  };
  const handleShowModalFilter = async (e) => {
    e.preventDefault();
    if (!isNaN(mprice)) {
      setShowmodal(false);
      console.log(mcategory);
      setResult(null);
      setClear(false);
      setModalFilterShow(true);
      const list = {
        name: mname,
        price: mprice,
      };
      await axios
        .post(`http://localhost:8080/products/searchbyboth/${mcategory}`, list)
        .then((result) => {
          console.log(result, "modal filter");
          if (result.data.length === 0) {
            setModalFilterData(null);
            console.log("empty");
          } else {
            console.log(result);
            setModalFilterData(result.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("enter valid price");
    }
  };
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Explore!</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />

          <div>
            <Form
              className="d-flex"
              onSubmit={(e) => {
                handleSearch(e);
              }}
            >
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={search}
                onChange={(e) => {
                  e.preventDefault();
                  setSearch(e.target.value);
                }}
                required
              />
              <Button variant="outline-success" type="submit">
                Search
              </Button>

              <Button
                variant="outline-success"
                type="button"
                onClick={() => {
                  handleClear();
                }}
              >
                Clear
              </Button>
              {filter === false && (
                <Button
                  variant="outline-success"
                  type="button"
                  onClick={() => {
                    handleFilter();
                  }}
                >
                  Filter
                </Button>
              )}
            </Form>
          </div>
          {filter === true && (
            <div>
              <Form
                className="d-flex"
                onSubmit={(e) => {
                  handleCategoryFilter(e);
                }}
              >
                <Form.Control
                  type="search"
                  placeholder="Category"
                  className="me-2 mx-3"
                  aria-label="Search"
                  value={category}
                  onChange={(e) => {
                    e.preventDefault();
                    setCategory(e.target.value);
                  }}
                  required
                />
                <Button variant="outline-success" type="submit">
                  Filter
                </Button>
                <br />
              </Form>
            </div>
          )}
          {filter === true && (
            <div>
              <Form className="d-flex">
                <Button
                  variant="outline-success"
                  onClick={() => {
                    handleShowModal();
                  }}
                >
                  More
                </Button>
                <br />
              </Form>
            </div>
          )}
        </Container>
      </Navbar>

      <div>
        <div>
          <div className="">
            <Row className="no-gutters">
              {currentPosts !== null && (
                <>
                  <Arr currentPosts={currentPosts} cuser={cuser} />
                  <Pagination
                    totalPosts={result.length}
                    postsPerPage={postPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                  />
                </>
              )}
              {show === true && currentPostsSearchData !== null && (
                <>
                  <Arr currentPosts={currentPostsSearchData} cuser={cuser} />
                  <Pagination
                    totalPosts={searchData.length}
                    postsPerPage={postPerPage}
                    setCurrentPage={setCurrentPage2}
                    currentPage={currentPage2}
                  />
                </>
              )}
              {showCat === true && currentPostsCatData != null && (
                <>
                  <Arr currentPosts={currentPostsCatData} cuser={cuser} />
                  <Pagination
                    totalPosts={catData.length}
                    postsPerPage={postPerPage}
                    setCurrentPage={setCurrentPage3}
                    currentPage={currentPage3}
                  />
                </>
              )}
              {modalfiltershow === true &&
                currentPostsModalFilterData !== null && (
                  <>
                    <Arr
                      currentPosts={currentPostsModalFilterData}
                      cuser={cuser}
                    />
                    <Pagination
                      totalPosts={modalFilterData.length}
                      postsPerPage={postPerPage}
                      setCurrentPage={setCurrentPage4}
                      currentPage={currentPage4}
                    />
                  </>
                )}
            </Row>
            {/* {searchData === null && show === true && (
              <h1 className="d-flex justify-content-center align-items-center mt-5 mx-3">
                Ummm... No results Found! Check Out more{" "}
              </h1>
            )}
            {catData === null && showCat === true && (
              <h1 className="d-flex justify-content-center align-items-center mt-5 mx-3">
                Ummm... No results Found! Check Out more{" "}
              </h1>
            )} */}
            {(result === null && searchData === null && show === true) ||
              (result === null && catData === null && showCat === true) ||
              (result === null &&
                modalFilterData === null &&
                modalfiltershow === true && (
                  <h1 className="d-flex justify-content-center align-items-center mt-5 mx-3">
                    Ummm... No results Found! Check Out more{" "}
                  </h1>
                ))}
          </div>
        </div>
      </div>
      <Modal show={showmodal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Filter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            className="mx-5 mt-4"
            onSubmit={(e) => {
              handleShowModalFilter(e);
            }}
          >
            <FloatingLabel
              controlId="floatingInput"
              label="Category"
              className=""
            >
              <Form.Control
                type="search"
                placeholder="Category"
                aria-label="Search"
                value={mcategory}
                onChange={(e) => {
                  e.preventDefault();
                  setMcategory(e.target.value);
                }}
                required
              />
            </FloatingLabel>

            <br />
            <FloatingLabel
              controlId="floatingInput"
              label="Name"
              className="mb-3"
            >
              <Form.Control
                type="search"
                placeholder="Name"
                aria-label="Search"
                value={mname}
                onChange={(e) => {
                  e.preventDefault();
                  setMname(e.target.value);
                }}
                required
              />
            </FloatingLabel>

            <br />
            <FloatingLabel
              controlId="floatingInput"
              label="Price"
              className="mb-3"
            >
              <Form.Control
                type="search"
                placeholder="Price"
                aria-label="Search"
                value={mprice}
                onChange={(e) => {
                  e.preventDefault();
                  setMprice(e.target.value);
                }}
                required
              />
            </FloatingLabel>

            <br />
            <Button variant="outline-success" type="submit">
              Filter
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Home;
