const request = require('request')
const google = require('google')

const dbpedia =  require('./dbpedia.js')

const numberResults = 10

module.exports = {
    results: function(query, callback) {
        var processedResults = 0
        
        var results = new Array()

        var annotateQueries = new Array()

        google.resultsPerPage = 25

        google(query, function(err, res) {
            for(var i = 0; i<numberResults; i++) {
                annotateQueries[i] = new Promise(function(resolve, reject) {
                    dbpedia.annotate(res.links[i].description, function(err, response, body) {
                        if(response.statusCode === 200) {
                            results.push(body)
                        }
                        resolve()
                    }) 
                })
            }

            Promise.all(annotateQueries).then(function () {               
                var occurences = new Map()
                var searchOccurences = new Array()

                results.forEach(function(annotation) {
                    try{
                        annotation.Resources.forEach(function(resource) {
                            searchOccurences.push(new Promise(function(resolve, reject) {
                                if(occurences.has(resource['@URI'])) {
                                    var temp = occurences.get(resource['@URI']) + 1
                                    occurences.set(resource['@URI'], temp)
                                }
                                else {
                                    occurences.set(resource['@URI'], 1)
                                }
                                resolve()
                            }))
                        })
                    } catch (e) {
                        // Tant pis
                    }
                })

                Promise.all(searchOccurences).then(function() {
                    callback(occurences)
                })
            })
        })
    }
}