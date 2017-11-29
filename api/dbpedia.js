const request = require('request')

module.exports = {
    annotate: function(query, callback) {
        const url = 'http://model.dbpedia-spotlight.org/en/annotate'
        
        const parameters = {
            text: query
        }
    
        request({url: url, qs: parameters}, function (error, response, body) {
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            callback(error, response, body)
        });
    },

    spotlight: function(query, callback) {
        const url = 'http://model.dbpedia-spotlight.org/en/spot'
        
        const parameters = {
            text: query
        }
    
        request({url: url, qs: parameters}, function (error, response, body) {
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            callback(error, response, body)
        });
    }
}
