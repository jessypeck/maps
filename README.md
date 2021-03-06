# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup

This app uses Font Awesome Pro icons, and may not work without the necessary token. This can be set
in `.npmrc` following [these instructions](https://fontawesome.com/how-to-use/on-the-web/setup/using-package-managers).

## How to Run

### 1. Run Flask server

#### Setup server

You may need to install [Poetry](https://python-poetry.org/) if you do not already have it. If you have issues with Poetry using the wrong python version, [this](https://github.com/python-poetry/poetry/issues/655#issuecomment-735634429) solution seems to work.

Flask will require a `.flaskenv` file to operate correctly. This file is not checked into git, so you will need to create it locally, with the following contents:

```
FLASK_APP=server/app.py
FLASK_ENV=development
```
#### Run server

`poetry run python -m flask run`
Runs the server.

The server will run on `localhost:5000`, but you should not need to open it in your browser.

### 2. Run frontend

`npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\

## Other Scripts

### `npm run lint`

Runs `eslint` with the `--fix` command, auto-fixing any errors it can.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

