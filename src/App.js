import React, { Fragment } from "react";
import { ToastContainer } from "react-toastify";

import "./style.scss";
import VehicleList from "./components/VehicleList";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Fragment>
      <ToastContainer />
      <VehicleList />
    </Fragment>
  );
}

export default App;
