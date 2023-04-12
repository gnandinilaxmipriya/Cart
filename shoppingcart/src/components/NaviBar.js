import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useContext } from "react";
import UserContext from "../userContext";
const NavBar = () => {
  const { cuser } = useContext(UserContext);
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/Home">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/Category">
              Category
            </Nav.Link>
            {cuser === "admin@gmail.com" && (
              <NavDropdown title="Products" id="collasible-nav-dropdown">
                <NavDropdown.Item as={Link} to="/AddProduct">
                  Add Product
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/UpdateProduct">
                  Update Products
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/ViewProductById">
                  View by Product Id
                </NavDropdown.Item>
              </NavDropdown>
            )}
            <Nav.Link as={Link} to="/Cart">
              Cart
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
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
