const request = require('request')

module.exports = {
    spotlight: function(query, callback) {
        //const url = 'http://model.dbpedia-spotlight.org/en/spot'
        const url = 'http://model.dbpedia-spotlight.org/en/annotate'
        
        const parameters = {
            text: query
        }
    
        request({url: url, qs: parameters}, function (error, response, body) {
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the HTML for the Google homepage.
            callback(error, response, body)
        });
    }
}
