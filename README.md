# Introduction

pickleJar is a test runner for gherkin-based tools written using nw.js

Currently it only supports behave

# Installation

 1. npm install
 1. download and unzip nw.js (tested with 0.12, 0.13, 0.26) (https://nwjs.io/downloads/)
 1. run nw <picklejar> where picklejar is the directory where you cloned to

# Developer notes

The basic application logic can be found in main.js. The underlying functionality is provided by custom node modules found in the node_modules directory.

test.js allows the test runner logic to be exercised without the nw.js GUI. Run it with node. It expects to find a `features` folder in the directory from which you run node with tests to run.
