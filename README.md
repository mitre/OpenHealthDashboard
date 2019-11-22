# Open Health Dashboard (OHD)

OHD is an open source dashboard framework that allows users to build highly sophisticated, interactive data visualizations to display on large touch screen systems. Currently, it is used to display population health related indicators on a 12 panel HD TV touch screen system. It is our hope to build an open source community that contributes to and collectively benefits from a growing repository of healthcare visualizations. 


Check repository 'projects' and 'issues' to see development roadmap.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

It uses [node](https://nodejs.org/en/) and [yarn](https://yarnpkg.com/lang/en/).

## Example

Here is an example of what you can do with the Open Health Dashboard: 

![dashboard_demo](images/health-dashboard-capability-demo.png)


## Getting Started

In the project directory, you can run:

### `yarn`
Installs the required node packages to run the application. Run this before running subsequent commands.

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn write-ids`

Since this project is currently entirely static, we've added a script to traverse through the JSON files in `src/data` and add unique identifiers to each object, similar to the way a database would. This helps with app state management in React, without requiring a data curator (user) to enter ID's manually. The resulting JSON (with ID's added) is written to `src/data/build/`, which are the files imported into the application.

_Note: This script is run before every `start` and `build` command._


## What's next?

- Topic creation guide
- Story creation guide
- Support for smaller screen sizes (2-TV, 4-TV layouts)
- Links to topics within data
- Idle mode
- Tutorial mode
- More chart types
- Free text types
- Additional interactions on charts
- ...

# License

Copyright 2019 The MITRE Corporation

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
