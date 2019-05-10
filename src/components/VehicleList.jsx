import React, { useState } from "react";
import useFechVehicles from "../hooks/useFetchVehicles";
import useWindowWidth from "../hooks/useWindowWidth";
import VehicleNarrative from "./vehiclePortfolioNarrative";
import VehicleImage from "./vehicleImage";
import styles from "../vehiclePortfolio.module.css";

export default props => {
  const [url, setUrl] = useState(null);

  /**Custom Hooks */
  const { vehiclesData, loading } = useFechVehicles(url);
  const width = useWindowWidth();

  /**Events */
  function handleVehicleHasLoaded(e) {
    if (!loading) setUrl(e.currentTarget.id);
  }

  /**Conditional Rendering */
  function renderVehicles() {
    return vehiclesData.length ? (
      <div className={styles.container}>
        {vehiclesData.map(vehicle => (
          <div key={vehicle.id} className={styles.vehicleBox}>
            {renderComponentVehicleImage(vehicle)}
            {renderComponentVehicleNarrative(vehicle)}
          </div>
        ))}
      </div>
    ) : (
      renderException("No Vehicles Found")
    );
  }

  /**Render Components */
  function renderComponentVehicleNarrative({ vehicleTitle, detail }) {
    const { price, description } = detail;
    return (
      <VehicleNarrative
        vehicleTitle={vehicleTitle}
        vehiclePrice={price}
        vehicleDescription={description}
      />
    );
  }

  function renderComponentVehicleImage({ media, vehicleTitle, url }) {
    return (
      <VehicleImage
        imageSource={`${process.env.REACT_APP_STATIC}${media[0].url}`}
        vehicleTitle={vehicleTitle}
        handleVehicleHasLoaded={handleVehicleHasLoaded}
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
  console.log(width);
  return loading ? renderException("...Loading") : renderVehicles();
};
