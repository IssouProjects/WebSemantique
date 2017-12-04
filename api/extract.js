const request = require('request')
const google = require('google')

const dbpedia =  require('./dbpedia.js')

const numberResults = 10

module.exports = {
    results: function(query, callback) {
        var processedResults = 0
        
        var results = new Array()

        var spotlightQueries = new Array()

        google.resultsPerPage = 25

        google(query.query, function(err, res) {
            for(var i = 0; i<numberResults; i++) {
                spotlightQueries[i] = new Promise(function(resolve, reject) {
                    dbpedia.spotlight(res.links[i].description, function(err, response, body) {
                        console.log('Received results')
                        if(response.statusCode === 200) {
                            results.push(body)
                        }
                        resolve()
                    }) 
                })
            }

            Promise.all(spotlightQueries).then(function () {
                console.log('All done')
            })
        })
    }
}