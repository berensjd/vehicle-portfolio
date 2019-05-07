import React, { useState } from "react";
import useFechVehicles from "../hooks/useFetchVehicles";
import VehicleNarrative from "./vehiclePortfolioNarrative";
import VehicleImage from "./vehicleImage";
import styles from "../vehiclePortfolio.module.css";

export default props => {
  const [url, setUrl] = useState(null);

  /**Custom Hooks */
  const { vehiclesData, loading } = useFechVehicles(url);

  /**Events */
  function handleVehicleHasLoaded(e) {
    if (!loading) setUrl(e.currentTarget.id);
  }

  /**Render Components */
  return loading ? (
    <div className={styles.loading}>
      <h2>...Loading</h2>
    </div>
  ) : vehiclesData.length ? (
    <div className={styles.container}>
      {vehiclesData.map(vehicle => (
        <div key={vehicle.id} className={styles.vehicleBox}>
          <VehicleImage
            imageSource={`${process.env.REACT_APP_STATIC}${
              vehicle.media[0].url
            }`}
            vehicleTitle={vehicle.vehicleTitle}
            handleVehicleHasLoaded={handleVehicleHasLoaded}
            id={vehicle.url}
          />
          <VehicleNarrative
            vehicleTitle={vehicle.vehicleTitle}
            vehiclePrice={vehicle.detail.price}
            vehicleDescription={vehicle.detail.description}
          />
        </div>
      ))}
    </div>
  ) : (
    <div className={styles.loading}>
      <h2>Nothing to display</h2>
    </div>
  );
};
