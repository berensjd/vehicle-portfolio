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

#### Deployment of a custom hook - useFetchVehicles and further hooks useReducer, useContext

This app demonstrates the operation of custom hook _useFetchVehicles_ <br>
Within this hook it builds state via _useReducer_ as an alternative to useState. <br>
This is the preferred method as _state_ is augmented via further API calls.<br>

For purely demo purposes the reducer also deals with a client side action<br>
**a click on the vehicle image**. All actions and their payload are serviced via<br>
the reducer so that _state_ is maintained. Updated state is displayed via the counter for each vehicle.

The app also demos the _useContext_ hook<br>
_state_ and _dispatch_ are feed into two seperate context providers to be consumed by their child components<br>

React.memo has been deployed to help make things more efficient by not performing any uneccessary component re-renders<br>

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
