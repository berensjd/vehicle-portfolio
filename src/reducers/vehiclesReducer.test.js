import _ from "lodash";
import reducer, {
  ADD_VEHICLE_DETAIL,
  INITIALIZE_VEHICLES,
  COUNT_IMAGE_CLICKS
} from "./vehiclesReducer";
import data from "../fakeServices/vehiclesFakeData";
import vehicleDetail from "../fakeServices/xe";

import template from "../dataProcessing/vehiclesAddLoadingDetail";
const augmentedData = template(data);
const url = "/api/vehicle/xe";

describe("Vehicle Reducer operations - Initial Data Feed", () => {
  const state = { loading: true, vehiclesData: [] };
  const action = {
    type: INITIALIZE_VEHICLES,
    payload: { vehicles: data }
  };
  const result = reducer(state, action);
  test("Loading state should be false", () => {
    expect(result.loading).toEqual(false);
  });
  test("The vehiclesData state should match the augmented data set", () => {
    expect(result.vehiclesData).toMatchObject(augmentedData);
  });
});

describe("Vehicle Reducer operations - Add vehicle detail", () => {
  const vehiclesData = _.cloneDeep(augmentedData);
  const state = { loading: false, vehiclesData };
  const action = {
    type: ADD_VEHICLE_DETAIL,
    payload: { vehicleDetail, url }
  };
  const { vehiclesData: resultData } = reducer(state, action);
  const index = _.findIndex(resultData, { url });
  const description = resultData[index].detail.description;

  test("The new vehicle data object should not match the feed version", () => {
    expect(resultData).not.toEqual(augmentedData);
  });
  test("The vehicle should still exist in the recordset", () => {
    expect(index).toBeGreaterThanOrEqual(0);
  });
  test("The resultset detail description should equal the source vehicle description", () => {
    expect(description).toBe(vehicleDetail.description);
  });
});

describe("Clientside action - check correct state after client has clicked and image", () => {
  const action = {
    type: COUNT_IMAGE_CLICKS,
    payload: { vehicleDetail, url }
  };
  test("Counter should be 1", () => {
    const vehiclesData = _.cloneDeep(augmentedData);
    const state = { loading: false, vehiclesData };
    const { vehiclesData: resultData } = reducer(state, action);
    const index = _.findIndex(resultData, { url });
    expect(resultData[index].count).toBe(1);
  });

  describe("State shoulbe be unchanged on default action type", () => {
    test("Feeding an invalid action type will not change state", () => {
      const vehiclesData = _.cloneDeep(augmentedData);
      const state = { loading: false, vehiclesData };
      const { vehiclesData: resultData } = reducer(state, {
        type: "actionNotExist"
      });
      expect(resultData).toMatchObject(augmentedData);
    });
  });
});
