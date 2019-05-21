import React from "react";

import useFetchVehicles from "../hooks/useFetchVehicles";
import { ContextState, ContextDispatch } from "../contexts/VehicleContext";

import Vehicles from "./Vehicles";

import styles from "../vehiclePortfolio.module.css";

export default props => {
  const { currentState, dispatch } = useFetchVehicles();

  /**Conditional Rendering */
  function renderVehicles() {
    const { vehiclesData } = currentState;
    return vehiclesData.length ? (
      <ContextState.Provider value={vehiclesData} {...props}>
        <ContextDispatch.Provider value={dispatch}>
          <Vehicles />
        </ContextDispatch.Provider>
      </ContextState.Provider>
    ) : (
      renderException("No Vehicles Found")
    );
  }

  function renderException(message) {
    return (
      <div className={styles.loading}>
        <h2>{message}</h2>
      </div>
    );
  }

  /**Final Render */
  return currentState.loading
    ? renderException("...Loading")
    : renderVehicles();
};
