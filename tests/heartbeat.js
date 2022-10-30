const fs = require('fs')
const modules = require('./../modules')

//This test should result in no output because the input was tagged with flashType: 9 and is to be ignored


// Set up the read stream to get asset data from files
let assetsStream = fs.readFileSync('../resources/assets.txt', {encoding: 'utf8'})
let strikesStream = fs.readFileSync('testData/heartbeat.txt', {encoding: 'utf8'})

// Get the strike and asset data from files using fs stream
let assets = modules.unpackFile(assetsStream)
let strikes = modules.unpackFile(strikesStream)

// Initialize the lastTriggered field for each asset so we can keep track of
assets = modules.assetTimeInit(assets)

//Process the strike data
modules.processStrikes(strikes, assets, 300000)
