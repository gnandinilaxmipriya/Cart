import React, { useMemo, useState } from "react";
import Login from "./Login";
import "./App.css";
// import { useState } from "react";
// import Button from "react-bootstrap/Button";
import Signup from "./Signup";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Products from "./Products";
import Cart from "./Cart";
import NavBar from "./components/NavBar.js";
import Profile from "./Profile";
import UpdateProfile from "./UpdateProfile";
import UserContext from "./userContext";
import Forgot from "./Forgot";
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
              path="/Products"
              element={
                <>
                  <NavBar />
                  <Products />
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
