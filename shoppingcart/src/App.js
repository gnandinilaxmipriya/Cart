import React, { useMemo, useState } from "react";
import Login from "./Login";
import "./App.css";
// import { useState } from "react";
// import Button from "react-bootstrap/Button";
import Signup from "./Signup";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cart from "./Cart";
import NavBar from "./components/NaviBar.js";
import Profile from "./Profile";
import UpdateProfile from "./UpdateProfile";
import UserContext from "./userContext";
import Forgot from "./Forgot";
import Home from "./Home";
import UpdateProduct from "./UpdateProduct";
import AddProduct from "./AddProduct";
import ViewProductById from "./ViewProductById";
import Category from "./Category";
function App() {
  const [cuser, setCuser] = useState(null);
  const providerValue = useMemo(() => ({ cuser, setCuser }), [cuser, setCuser]);
  return (
    <div>
      <UserContext.Provider value={providerValue}>
        <Router>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/Login" element={<Login />} />
            <Route exact path="/Signup" element={<Signup />} />
            <Route exact path="/Forgot" element={<Forgot />} />

            <Route
              exact
              path="/Home"
              element={
                <>
                  <NavBar />
                  <Home />
                </>
              }
            />
            <Route
              exact
              path="/Cart"
              element={
                <>
                  <NavBar />
                  <Cart />
                </>
              }
            />
            <Route
              exact
              path="/Profile"
              element={
                <>
                  <NavBar />
                  <Profile />
                </>
              }
            />
            <Route
              exact
              path="/UpdateProfile"
              element={
                <>
                  <NavBar />
                  <UpdateProfile />
                </>
              }
            />
            <Route
              exact
              path="/UpdateProduct"
              element={
                <>
                  <NavBar />
                  <UpdateProduct />
                </>
              }
            />
            <Route
              exact
              path="/AddProduct"
              element={
                <>
                  <NavBar />
                  <AddProduct />
                </>
              }
            />
            <Route
              exact
              path="/ViewProductById"
              element={
                <>
                  <NavBar />
                  <ViewProductById />
                </>
              }
            />
            <Route
              exact
              path="/Category"
              element={
                <>
                  <NavBar />
                  <Category />
                </>
              }
            />

            {/* <Route exact path="/Logout" element={<Login />} /> */}
          </Routes>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
/*const [change, setChange] = useState(true);
  const onclick = () => {
    setChange(false);
  };
  return change === false ? (
    <Signup />
  ) : (
    <div className="App">
      <Login />
      <br />
      <Button onClick={onclick}>Register?</Button>
    </div>
  ); */
