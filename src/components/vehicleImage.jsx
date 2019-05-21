import React, { useContext, memo } from "react";
import { ContextDispatch } from "../contexts/VehicleContext";
import { COUNT_IMAGE_CLICKS } from "../reducers/vehiclesReducer";

import styles from "../vehiclePortfolio.module.css";

export default memo(({ vehicleTitle, id, imageSource }) => {
  const dispatch = useContext(ContextDispatch);
  return (
    <img
      className={styles.vehicleImage}
      src={imageSource}
      alt={vehicleTitle}
      id={id}
      onClick={() =>
        dispatch({ type: COUNT_IMAGE_CLICKS, payload: { url: id } })
      }
    />
  );
});
