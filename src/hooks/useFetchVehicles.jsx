import { useState, useEffect } from "react";
import getVehicles from "../api/getVehicles";
import addLoadingDetail from "../dataProcessing/vehiclesAddLoadingDetail";
import { toast } from "react-toastify";
import _ from "lodash";

/**
 * Issue:  useEffect required hook dependancies - further investigation required
 *
 * Setup:  A single useEffect is being deployed for both the intial loading of the vehicle data
 *         and the more detailed data for each vehicle.  Aftr the first render we do not need to have any
 *         hooke dependancies === cdm
 *
 *         Once each vehicle image has loaded an "onload" event is raised for the corresponding image
 *         The url, for making a further API call, is then passed to this custom hook as required dependancy
 *         so that we may fetch the details for the corresponding vehicle.  The vehiclesData state therefore needs
 *         to be updated to so that the DOM can be rerendered with the extra data  === cdu
 *
 *         We only need one dependancy for this hook (the url for the vehicle detail).
 *         eslint reports that we also need to add vehiclesData as a dependancy. It appears this is tiggered
 *         by the fact we are using the existing state of vehiclesData for checking the existance of any records and
 *         augmenting the data as and when it arrives back from the server.
 *
 *         Adding vehiclesData as a dependancy will cause an infinite loop as the custom hook will be called repeatadly
 */

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
        toast.error(e.response.data);
        return;
      }

      const vehicles = addLoadingDetail(result.data.vehicles);

      setVehiclesData(vehicles);
      setLoading(false);
    }

    async function fetchVehicleDetail() {
      let result;
      console.log("Fetching vehicle detail from API " + url);
      try {
        result = await getVehicles(url);
      } catch (e) {
        toast.error(e.response.data);
        return;
      }
      let vehicles = [...vehiclesData];
      const index = _.findIndex(vehicles, { url: url });
      vehicles[index].detail = result.data;
      setVehiclesData(vehicles);
    }

    if (url) fetchVehicleDetail();

    if (!vehiclesData.length) fetchVehicles();
  }, [url]);
  return { vehiclesData, loading };
};
