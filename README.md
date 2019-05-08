## Summary

This is intended to demo the consumption of a primary API that returns a portfolio of vehicles. Once page has been rendered<br>
further API calls are made to render details for each vehicle within the portfolio.

## App depenancy

Requires [https://github.com/connect-group/frontend-technical-test](https://github.com/connect-group/frontend-technical-test)

Note: There is a need to serve the static assets. Therefore the folllowing steps were taken for the server side implementation

_Static files were configured to be served from folder "./dist"_<br>
`app.use(Express.static(path.join(__dirname, "./dist")));`

1. Creation of new **./public** folder
2. Copy static assets to **./public**
3. Change the following coding line from _./dist_ to **./public**

### `app.use(Express.static(path.join(__dirname, "./public")));`

## Custom Hook **useFechVehicles()** - Pending Issue requires further investigation

**Summary use case:** Where the previous local state is read within **useEffect** so that it can be enhanced with newly<br>
arrived data from the server.

App uses a custom hook with one required dependency - _url_ to get vehicle detail

**Setup:** A single **useEffect** is deployed for both the initial loading of the portfolio<br>
and the more detailed data augmentation for each vehicle.

Once a single vehicle image has loaded an _onload_ event is raised for the corresponding asset<br>
The _url_, for making a further API call, is then passed to this custom hook (via change of state within the functional component)<br>
as a required dependency so that we may fetch the detail for the corresponding vehicle. The **vehiclesData** state therefore needs<br>
to be updated to so that the DOM can be rerendered with the augmented data.

We only need one dependency for this hook - the _url_ for the vehicle detail.<br>
So that it will be executed upon the first render and subsequent changes to the _url_

**The issue:** _eslint_ reports that we also need to add **vehiclesData** as a dependancy. It appears this is tiggered<br>
by the fact we are using the existing state of **vehiclesData** for checking the existance of any records and<br>
enhancing this local state as and when additional data arrives back from the server.<br>

Adding **vehiclesData** as a dependancy will cause an infinite loop as the custom hook will be called repeatadly.

It is thought that an alterative pattern is required so that _eslint_ does not detect any dependancy issue within the custom<br>
hook.

**In the meantime this app demonstrates the operation of a custom hook useFechVehicles() as deployed by functional component VehicleList**

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
