const request = require('request')

module.exports = {
    annotate: function(query, callback) {
        const url = 'http://model.dbpedia-spotlight.org/fr/annotate'
        
        const parameters = {
            text: query
        }

        const headers = {
            Accept: 'application/json'
        }
    
        request({headers: headers, url: url, qs: parameters}, function (error, response, body) {
            if(process.env.ENV_VARIABLE === 'dev') {
                console.log('error:', error); // Print the error if one occurred
                console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            }
            try {
                body = JSON.parse(body)
            } catch (e) {
                // Tant pis
            }
            callback(error, response, body)
        });
    },

    spotlight: function(query, callback) {
        const url = 'http://model.dbpedia-spotlight.org/fr/spot'
        
        const parameters = {
            text: query
        }

        const headers = {
            accept: 'application/json'
        }
    
        request({headers: headers, url: url, qs: parameters}, function (error, response, body) {
            if(process.env.ENV_VARIABLE === 'dev') {
                console.log('error:', error); // Print the error if one occurred
                console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            }

            try {
                body = JSON.parse(body)
            } catch (e) {
                // Tant pis
            }

            callback(error, response, body)
        });
    },

    sparqlRequest: function(query, callback) {
        const url = 'https://dbpedia.org/sparql'
        const defaultGraph = 'http://dbpedia.org'

        var parameters = new Object()
        parameters.query = query
        parameters.format = 'application/sparql-results+json'

        request({url: url, qs: parameters}, function (error, response, body) {
            if(process.env.ENV_VARIABLE === 'dev') {
                console.log('error:', error); // Print the error if one occurred
                console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            }

            try {
                body = JSON.parse(body)
            } catch (e) {
                // Tant pis
            }
            
            callback(error, response, body)
        })
    }
}
