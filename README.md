## Summary

This is intended to demo the consumption of a primary API that returns a portfolio of vehicles. Once the page has been rendered<br>
further API calls are made to render the details for each vehicle within the portfolio.

## App depenancy

Requires [https://github.com/connect-group/frontend-technical-test](https://github.com/connect-group/frontend-technical-test)

Note: There is a need to serve the static assets. Therefore the folllowing steps were taken for the server side:

Originally static files were configured to be served from a non-existant folder "./dist"

1. creation of new ""./public" folder
2. copy the statice assets witnin the "./public" folder
3. Change the following coding line from ./dist to ./public

### `app.use(Express.static(path.join(__dirname, "./public")));`

## Custom Hook - Pending Issue requires further investigation

App uses a custom hook with one required dependancy - the url of the vehicle detail

Setup: A single useEffect is being deployed for both the intial loading of the vehicle data<br>
and the more detailed data for each vehicle. After the first render we do not need to have any<br>
hook dependancies === cdm

Once each vehicle image has loaded an "onload" event is raised for the corresponding image<br>
The url, for making a further API call, is then passed to this custom hook as a required dependancy<br>
so that we may fetch the details for the corresponding vehicle. The vehiclesData state therefore needs<br>
to be updated to so that the DOM can be rerendered with the extra data === cdu

We only need one dependancy for this hook (the url for the vehicle detail).
eslint reports that we also need to add vehiclesData as a dependancy. It appears this is tiggered
by the fact we are using the existing state of vehiclesData for checking the existance of any records and
augmenting the data as and when it arrives back from the server.

Adding vehiclesData as a dependancy will cause an infinite loop as the custom hook will be called repeatadly

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
