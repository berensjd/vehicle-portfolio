import React from "react";
import styles from "../vehiclePortfolio.module.css";

export default ({ vehicleTitle, id, imageSource, onClick }) => {
  return (
    <img
      className={styles.vehicleImage}
      src={imageSource}
      alt={vehicleTitle}
      id={id}
      onClick={onClick}
    />
  );
};
