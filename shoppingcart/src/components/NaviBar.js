import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useContext } from "react";
import UserContext from "../userContext";
import Badge from "react-bootstrap/Badge";
const NavBar = ({ length }) => {
  const { cuser } = useContext(UserContext);
  return (
    <>
      <Navbar bg="dark" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand>Shop</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/Home">
                Home
              </Nav.Link>

              {cuser === "admin@gmail.com" && (
                <NavDropdown title="Products" id="collasible-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/AddProduct">
                    Add Product
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/ViewProductById">
                    View by Product Id
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              <Nav.Link as={Link} to="/Cart">
                Cart
                <Badge bg="dark">{length}</Badge>
              </Nav.Link>
              <NavDropdown title="Profile" id="collasible-nav-dropdown">
                <NavDropdown.Item as={Link} to="/Profile">
                  View Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/UpdateProfile">
                  Update Profile
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link className="justify-content-end" as={Link} to="/">
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
