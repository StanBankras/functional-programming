# Functional Programming
_Cleaning raw survey data so it becomes usable_

// The sketch of the visualization of my project will be here soon...

## Description

During the functional programming course @CMDA-TT, the goal is to write code that cleans data with functional patterns. One of the most important things however is to describe the used patterns and show my understanding and progress in the subject.

During the Tech Track, I will be working on a data research for De Volkskrant about parking in Dutch cities.

## Research question
**Do cities provide extra infrastructure and facilities on parking spots in environment zones to promote (more) green transportation?**

Subquestions:

* Are parkingspots closer to public transport to continue your travel this way?

_My expectation:_ environmental zones generally are in more crowded areas, so there's a good chance public transport is near.

* Do parkingspots generally have more charging points for electrical cars?

_My expectation:_ environmental zones should promote green transportation, so I expect more charging points in environmental zones on average.

* Are parkingspot in environment zones with more charging points more expensive to park?

_My expectation:_ I expect the cost of parking to be higher if there are more charging points installed, because of extra expenses. If the contrary is true, this would be very good since it would support green transportation even more.

[Data I expect to use to answer the questions can be found here](https://github.com/StanBankras/functional-programming/wiki/Concept#data-i-expect-to-use)


## Most interesting functions
* Getting tariff data per parking area: [click here](https://github.com/StanBankras/functional-programming/wiki/Parking-tariffs)
* Combining all data from 4 datapoints: [click here](https://github.com/StanBankras/functional-programming/wiki/Main-function-to-merge-all-data)

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
