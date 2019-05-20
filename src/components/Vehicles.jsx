import React, { useContext } from "react";
import VehicleNarrative from "./vehiclePortfolioNarrative";
import VehicleImage from "./vehicleImage";
import Context from "../contexts/VehicleContext";
import styles from "../vehiclePortfolio.module.css";

export default () => {
  const { vehiclesData } = useContext(Context);

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

  function renderComponentVehicleImage({ media, vehicleTitle, url }) {
    return (
      <VehicleImage
        imageSource={`${process.env.REACT_APP_STATIC}${media[0].url}`}
        vehicleTitle={vehicleTitle}
        id={url}
      />
    );
  }

  /**Final Render */
  return (
    <div className={styles.container}>
      {vehiclesData.map(vehicle => (
        <div key={vehicle.id} className={styles.vehicleBox}>
          {renderComponentVehicleImage(vehicle)}
          {renderComponentVehicleNarrative(vehicle)}
        </div>
      ))}
    </div>
  );
};
