# resha
a game  
[![Greenkeeper badge](https://badges.greenkeeper.io/amir-arad/resha.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/amir-arad/resha.svg?branch=master)](https://travis-ci.org/amir-arad/resha)


### project features
 - Typescript in strict mode (the only way to roll!)
 - Customised 3rd party typings in `./custom_typings` folder
 - Fully automated tests that run both in node and browser using tape
 - Automatically discoverable tests (by glob pattern)
 - server for live updates in browser
 - Least opinionated setup: no run time dependencies and minimal configuration

## developer documentation
how to build and test:
 - clone the repository
 - in the cloned folder, run `npm install`
 - run `npm test` to build and test the code in both nodejs and browser

how to debug (browser):
 - run `npm run start:test` to run a tests server
 - open `http://localhost:8080/` to run live browser tests that will update while you change the source code
 
 or:
  - run `npm run start:dev` to run a develompent server
  - open `http://localhost:8080/` to run live browser game that will update while you change the source code
  - open `http://localhost:8080/test` to run live browser tests that will update while you change the source code

 how to build and run for production: 
  - run `npm run build` to build a production client
  - run `npm start` to run a production server. in some systems you'll need to `sudo` this command.
  - open `http://localhost/` to run browser game 
