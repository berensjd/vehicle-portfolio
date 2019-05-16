import React from "react";

import useFetchVehicles from "../hooks/useFetchVehicles";

import VehicleNarrative from "./vehiclePortfolioNarrative";
import VehicleImage from "./vehicleImage";
import styles from "../vehiclePortfolio.module.css";

export default props => {
  const { currentState, dispatch } = useFetchVehicles();

  /**Conditional Rendering */
  function renderVehicles() {
    const { vehiclesData } = currentState;
    return vehiclesData.length ? (
      <div className={styles.container}>
        {vehiclesData.map(vehicle => (
          <div key={vehicle.id} className={styles.vehicleBox}>
            {renderComponentVehicleImage(vehicle, dispatch)}
            {renderComponentVehicleNarrative(vehicle)}
          </div>
        ))}
      </div>
    ) : (
      renderException("No Vehicles Found")
    );
  }

  /**Render Components */
  function renderComponentVehicleNarrative({ vehicleTitle, count, detail }) {
    const { price, description } = detail;
    return (
      <VehicleNarrative
        vehicleTitle={vehicleTitle}
        vehiclePrice={price}
        vehicleDescription={description}
        count={count}
      />
    );
  }

  function renderComponentVehicleImage({ media, vehicleTitle, url }, dispatch) {
    return (
      <VehicleImage
        imageSource={`${process.env.REACT_APP_STATIC}${media[0].url}`}
        vehicleTitle={vehicleTitle}
        onClick={() =>
          dispatch({ type: "COUNT_IMAGE_CLICKS", payload: { url } })
        }
        id={url}
      />
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
