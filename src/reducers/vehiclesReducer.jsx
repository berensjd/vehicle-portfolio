import _ from "lodash";

export const INITIALIZE_VEHICLES = "INITIALIZE_VEHICLES";
export const ADD_VEHICLE_DETAIL = "ADD_VEHICLE_DETAIL";
export const COUNT_IMAGE_CLICKS = "COUNT_IMAGE_CLICKS";

export default (state, action) => {
  switch (action.type) {
    case INITIALIZE_VEHICLES: {
      console.log("Adding base vehicle data to state");
      return {
        loading: action.payload.loading,
        vehiclesData: action.payload.vehiclesData
      };
    }

    case ADD_VEHICLE_DETAIL: {
      const vehiclesData = addVehicleDetail(state, action);
      return { ...state, vehiclesData };
    }

    case COUNT_IMAGE_CLICKS: {
      const vehiclesData = countImageClicks(state, action);
      return { ...state, vehiclesData };
    }

    default:
      return state;
  }
};

function countImageClicks(state, action) {
  const { vehiclesData } = state;
  const { url } = action.payload;
  const index = _.findIndex(vehiclesData, { url });
  vehiclesData[index].count = vehiclesData[index].count
    ? vehiclesData[index].count + 1
    : 1;
  return vehiclesData;
}

function addVehicleDetail(state, action) {
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
  return vehiclesData;
}
