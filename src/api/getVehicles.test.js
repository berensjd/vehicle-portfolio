import getVehicles from "./getVehicles";

test("Integration - vehicle API", async () => {
  const response = await getVehicles();
  expect(response.status).toEqual(200);
  const returnedRecords = response.data;
  const recordCount = returnedRecords.length;
  expect(recordCount).toBeGreaterThanOrEqual(0);
});
