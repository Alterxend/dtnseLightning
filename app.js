const fs = require('fs')
const modules = require('./modules')

//This is used to determine minimum time between lightning strikes. It is currently at 300000ms which is 5 minutes
const timeThreshold = 300000

// Set up the read stream to get strike and asset data from files
let strikesStream = fs.readFileSync('resources/input.txt', {encoding: 'utf8'})
let assetsStream = fs.readFileSync('resources/assets.txt', {encoding: 'utf8'})

// Get the strike and asset data from files using fs stream
let assets = modules.unpackFile(assetsStream)
let strikes = modules.unpackFile(strikesStream)

// Initialize the lastTriggered field for each asset so we can keep track of
assets = modules.assetTimeInit(assets)

//Process the strike data
modules.processStrikes(strikes, assets, timeThreshold)
