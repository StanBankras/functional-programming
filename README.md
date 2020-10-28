# Functional Programming
_Cleaning raw survey data so it becomes usable_

During the functional programming course @CMDA-TT, the goal is to write code that cleans data with functional patterns. One of the most important things however is to describe the used patterns and show my understand and progress in the subject.

## Research question
**Do cities provide extra infrastructure and facilities on parking spots in environment zones to promote (more) green transportation?**

Subquestions:

* Are parkingspots closer to public transport to continue your travel this way?

_My expectation:_ environmental zones generally are in more crowded areas, so there's a good chance public transport is near.

* Do parkingspots generally have more charging points for electrical cars?

_My expectation:_ environmental zones should promote green transportation, so I expect more charging points in environmental zones on average.

* Are parkingspot in environment zones with more charging points more expensive to park?

_My expectation:_ I expect the cost of parking to be higher if there are more charging points installed, because of extra expenses. If the contrary is true, this would be very good since it would support green transportation even more.


## Usage
If you are cleaning survey data, you might be able to use this project as a template to start writing functional patterns right away. There are some requirements to running this project, which will be explained in the 'Installation' part of the readme.

### What can this project be used for?
If you have JSON data readily available of any kind of survey, this project contains some functions and methods that might help you clean up your data.

## Installation
Here's how to start using this project.
### Prerequisites
* NodeJS 
* NPM/Yarn
* Nodemon

### Install
1. Clone this repository
```git
git clone git@github.com:StanBankras/functional-programming.git
```
2. Install packages
```
npm install
// or
yarn install
```
3. Run the project in a terminal
```
npm run dev
// or 
yarn dev
```

## Acknowledgements
* [TimonWeb](https://timonweb.com/javascript/how-to-enable-es6-imports-in-nodejs/) for setting up my Node development environment where I could use ES6 functionality
* [StackOverflow](https://stackoverflow.com/) for small & quick bug fixes

## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
