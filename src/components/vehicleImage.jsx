import React from "react";
import styles from "../vehiclePortfolio.module.css";

export default ({ vehicleTitle, handleVehicleHasLoaded, id, imageSource }) => {
  return (
    <img
      className={styles.vehicleImage}
      src={imageSource}
      alt={vehicleTitle}
      onLoad={e => handleVehicleHasLoaded(e)}
      id={id}
    />
  );
};
