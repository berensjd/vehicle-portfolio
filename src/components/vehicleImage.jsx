import React, { useContext, memo } from "react";
import Context from "../contexts/VehicleContext";

import styles from "../vehiclePortfolio.module.css";

export default memo(({ vehicleTitle, id, imageSource }) => {
  const { dispatch } = useContext(Context);
  return (
    <img
      className={styles.vehicleImage}
      src={imageSource}
      alt={vehicleTitle}
      id={id}
      onClick={() =>
        dispatch({ type: "COUNT_IMAGE_CLICKS", payload: { url: id } })
      }
    />
  );
});
