import React, { useMemo } from "react";

import useFetchVehicles from "../hooks/useFetchVehicles";
import Context from "../contexts/VehicleContext";

import Vehicles from "./Vehicles";

import styles from "../vehiclePortfolio.module.css";

export default props => {
  const { currentState, dispatch } = useFetchVehicles();

  const value = useMemo(() => {
    const { vehiclesData } = currentState;
    return { vehiclesData, dispatch };
  }, [currentState, dispatch]);

  /**Conditional Rendering */
  function renderVehicles() {
    const { vehiclesData } = currentState;
    return vehiclesData.length ? (
      <Context.Provider value={value} {...props}>
        <Vehicles />
      </Context.Provider>
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
