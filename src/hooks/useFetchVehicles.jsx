import { useReducer } from "react";

import getVehicles from "../api/getVehicles";

import vehiclesReducer, {
  INITIALIZE_VEHICLES,
  ADD_VEHICLE_DETAIL
} from "../reducers/vehiclesReducer";

import { toast } from "react-toastify";

const initialState = { loading: true, vehiclesData: [] };

const vehicles_API_Endpoint = "api/vehicle";

export default () => {
  const [currentState, dispatch] = useReducer(vehiclesReducer, initialState);

  /**
   * Fetch portfolio of vehicles
   * Update State
   */
  async function fetchVehicles() {
    let result;
    console.log("Fetching Vehicles from  API");
    try {
      result = await getVehicles(vehicles_API_Endpoint);
    } catch (e) {
      if (e && e.response && e.response.data) toast.error(e.response.data);
      return;
    }

    const { vehicles } = result.data;

    dispatch({
      type: INITIALIZE_VEHICLES,
      payload: { vehicles }
    });

    for (let current of vehicles) fetchVehicleDetail(current.url);
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
    dispatch({ type: ADD_VEHICLE_DETAIL, payload: { vehicleDetail, url } });
  }

  if (currentState.loading) fetchVehicles();

  return { currentState, dispatch };
};
