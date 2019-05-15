import _ from "lodash";

export default (state, action) => {
  switch (action.type) {
    case "INITIALIZE_VEHICLES": {
      console.log("Adding base vehicle data to state");
      return {
        loading: action.payload.loading,
        vehiclesData: action.payload.vehiclesData
      };
    }
    case "ADD_VEHICLE_DETAIL": {
      const { vehiclesData } = state;
      const { url, vehicleDetail } = action.payload;
      console.log(`Adding Vehicle detail to state - ${url}`);
      const index = _.findIndex(vehiclesData, { url });
      if (
        vehiclesData[index] &&
        !_.isEqual(vehiclesData[index].detail, vehicleDetail)
      ) {
        vehiclesData[index].detail = vehicleDetail;
      }
      return { ...state, vehiclesData };
    }

    default:
      return state;
  }
};
