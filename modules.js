const quadkeytools = require("quadkeytools")


module.exports = {
    processStrikes: function (strikes, assets, timeThreshold) {
        //This function is for processing an array of objects containing lightning strike data
        for (let i = 0; i < strikes.length; i++) {
            let strike = strikes[i]
            if (strike['flashType'] == 9) {
                // If the flashType is a heartbeat it is ignored, and we move on to the next strike.
                continue
            } else {
                if (strike['latitude'] === undefined || strike['longitude'] === undefined) {
                    // If the JSON is missing fields lat/lng we cannot match it to an asset and because of this
                    //  generate an error message and move on to the next strike.
                    console.log('Warning: Strike was missing latitude or longitude.')
                    continue
                }
                let location = quadkeytools.locationToQuadkey({lat: strike['latitude'], lng: strike['longitude']}, 12)
                let matched_asset = assets.find(o => o.quadKey === location)
                if (matched_asset === undefined) {
                    // If there is no asset that matches the strikes location we move on from this strike.
                    continue
                }
                if (matched_asset['lastTriggered'] + timeThreshold > strike['strikeTime']) {
                    // This checks to see if the asset has been triggered on within the time threshold.
                    continue
                }
                // This updates the last triggered field of the asset to the time the strike took place
                assets[assets.indexOf(matched_asset)]['lastTriggered'] = strike['strikeTime']
                console.log(`lightning alert for ${matched_asset['assetOwner']}:${matched_asset['assetName']}`)
            }
        }
        // The assets array is returned to perpetuate the updated lastTriggered times. This is not so relevant for
        //   app.js since all strikes are handled at once but would be for server.js which is a different version of
        //   this program I wrote to accept args via http.
        return assets
    },

    unpackFile: function (inputFile) {
        // This function is used to unpack stream data from files and place the json objects into arrays
        let objList = []
        inputFile.split(/\r?\n/).forEach(line => {
            try {
                line = JSON.parse(line)
                objList.push(line)
            } catch (error) {
                console.log(`Warning: Failed to parse input to JSON because ${error}`)
            }
        })
        return objList
    },

    assetTimeInit: function (assets) {
        // This function is only needed to initialize assets for the simulation.
        let unixTime = Date.now()
        assets.forEach(asset => {
            asset['lastTriggered'] = unixTime
        })
        return assets
    }
}
