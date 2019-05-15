import React, { useReducer } from "react";

import getVehicles from "../api/getVehicles";
import addLoadingDetail from "../dataProcessing/vehiclesAddLoadingDetail";

import vehiclesReducer from "../reducers/vehiclesReducer";

import VehicleNarrative from "./vehiclePortfolioNarrative";
import VehicleImage from "./vehicleImage";
import styles from "../vehiclePortfolio.module.css";

import { toast } from "react-toastify";

const initialState = { loading: true, vehiclesData: [] };

export default () => {
  const [currentState, dispatch] = useReducer(vehiclesReducer, initialState);

  /**
   * Fetch portfolio of vehicles
   * Update State
   */
  async function fetchVehicles() {
    const vehicles_API_Endpoint = "api/vehicle";
    let result;
    console.log("Fetching Vehicles from  API");
    try {
      result = await getVehicles(vehicles_API_Endpoint);
    } catch (e) {
      if (e && e.response && e.response.data) toast.error(e.response.data);
      return;
    }

    const vehiclesData = addLoadingDetail(result.data.vehicles);
    const loading = false;

    dispatch({
      type: "INITIALIZE_VEHICLES",
      payload: { loading, vehiclesData }
    });

    for (let current of vehiclesData) fetchVehicleDetail(current.url);
  }

  /**
   * Fetch the detailed information for the current vehicle
   * Update the state
   */
  async function fetchVehicleDetail(url) {
    let result;

    try {
      console.log(`Fetching vehicle detail from API ref - ${url}`);
      result = await getVehicles(url);
    } catch (e) {
      if (e && e.response && e.response.data) toast.error(e.response.data);
      return;
    }

    const vehicleDetail = result.data;
    dispatch({ type: "ADD_VEHICLE_DETAIL", payload: { vehicleDetail, url } });
  }

  if (currentState.loading) fetchVehicles();

  /**Conditional Rendering */
  function renderVehicles() {
    const { vehiclesData } = currentState;
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
