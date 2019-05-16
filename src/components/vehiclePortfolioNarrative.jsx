import React from "react";
import styles from "../vehiclePortfolio.module.css";

export default ({ vehicleTitle, count, vehiclePrice, vehicleDescription }) => {
  return (
    <div className={styles.vehicleDetails}>
      <div>
        <span className={styles.vehicleTextHeading}>{vehicleTitle}</span>
      </div>
      <div className={styles.vehicleText} />
      <div className={styles.vehicleText}>{`From ${vehiclePrice}`}</div>
      <div className={styles.vehicleText}>{vehicleDescription}</div>
      {count && (
        <div className={`${styles.vehicleText} ${styles.badge}`}>{count}</div>
      )}
    </div>
  );
};
