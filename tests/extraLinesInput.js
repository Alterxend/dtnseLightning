const fs = require('fs')
const modules = require('./../modules')

// This test should result in a warning message as output that states that it cannot parse a line because it is invalid.
//   The program will finish normally as this warning is handled.


// Set up the read stream to get asset data from files
let inputStream = fs.readFileSync('testData/extraLineInput.txt', {encoding: 'utf8'})

// Get the strike and asset data from files using fs stream
modules.unpackFile(inputStream)
