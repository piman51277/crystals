# Crystals
A script to generate images with a gradient of polygons

### Installation
* Install NodeJS version 14.15.3 or later.
* Install dependencies with `npm i`

### Configuration
cnfg.json contains the following parameters:

key | value
------ | ------
dimensions | dimensions of the finished image
density | approximate size of the triangle, in pixels
colors | what colors to use
blend | how much to blend different regions

### Execution
Run index.js. An image called out.png will be created in the current directory.