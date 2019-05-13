import { useState, useEffect } from "react";
import getVehicles from "../api/getVehicles";
import addLoadingDetail from "../dataProcessing/vehiclesAddLoadingDetail";
import { toast } from "react-toastify";
import _ from "lodash";

export default url => {
  const vehicles_API_Endpoint = "api/vehicle";
  const [vehiclesData, setVehiclesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVehicles() {
      setLoading(true);
      let result;
      console.log("Fetching Vehicles from  API");
      try {
        result = await getVehicles(vehicles_API_Endpoint);
      } catch (e) {
        if (e && e.response && e.response.data) toast.error(e.response.data);
        return;
      }

      const vehicles = addLoadingDetail(result.data.vehicles);

      setVehiclesData(vehicles);
      setLoading(false);
    }

    async function fetchVehicleDetail() {
      let result;

      try {
        result = await getVehicles(url);
      } catch (e) {
        if (e && e.response && e.response.data) toast.error(e.response.data);
        return;
      }

      console.log("Fetched vehicle detail from API ref" + url);

      let vehicles = [...vehiclesData];
      const index = _.findIndex(vehicles, { url });

      if (vehicles[index] && !_.isEqual(vehicles[index].detail, result.data)) {
        vehicles[index].detail = result.data;
        setVehiclesData(vehicles);
      }
    }

    if (url) fetchVehicleDetail();

    if (!vehiclesData.length) fetchVehicles();
    return () => {};
  }, [url]);
  return { vehiclesData, loading };
};
