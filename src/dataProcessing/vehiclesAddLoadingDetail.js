export default data => {
  const processedData = data.map(vehicle => {
    const { id, modelYear, url, media } = vehicle;
    //Create a Vehicle Title field for DOM display
    const vehicleTitle = `${media[0].name.toUpperCase()} ${id.toUpperCase()}`;
    // These two fields will be display for each vehicle.
    //Whilst we are waiting for the service to return the data
    //Let's indicate that this information is pending display
    const detail = {
      description: "...loading",
      price: "...loading"
    };
    return { vehicleTitle, id, modelYear, url, media, detail };
  });
  return processedData;
};
