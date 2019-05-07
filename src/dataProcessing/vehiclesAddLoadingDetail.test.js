import vehicles from "../fakeServices/vehiclesFakeData";
import template from "./vehiclesAddLoadingDetail";
const testProps = ["id", "modelYear", "url", "media", "detail", "vehicleTitle"];

test("Vehicle Record structure", () => {
  const augmentedData = template(vehicles);
  expect(augmentedData.length).toEqual(vehicles.length);
  for (let prop of testProps) {
    expect(augmentedData[vehicles.length - 1][prop]).toBeTruthy();
  }
});
