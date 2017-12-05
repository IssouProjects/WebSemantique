var googleSearch = require('google')

const express = require('express')
const app = express()

const dbpedia = require('./api/dbpedia.js')
const search = require('./api/search.js')

module.exports = app

app.set('port', (process.env.PORT || 3000));

app.get('/', express.static(__dirname))

app.get('/dbpedia/annotate', function (req, res) {
  if(process.env.ENV_VARIABLE === 'dev') {
    console.log(req.query.text)
  }
  dbpedia.annotate(req.query.text, function(error, response, body) {
    var retour = new Object({body: body})
    res.set('Content-Type', 'application/json')
    res.send(retour)
  })
})

app.get('/dbpedia/spotlight', function (req, res) {
  if(process.env.ENV_VARIABLE === 'dev') {
    console.log(req.query.text)
  }
  dbpedia.spotlight(req.query.text, function(error, response, body) {
    res.set('Content-Type', 'application/json')
    res.send(body)
  })
})

app.get('/dbpedia/sparql', function (req, res) {
  if(process.env.ENV_VARIABLE === 'dev') {
    console.log(req.query.text)
  }
  dbpedia.sparqlRequest(req.query.text, function(error, response, body) {
    res.set('Content-Type', 'application/json')
    res.send(body)
  })
})

app.get('/google/search', function (req, res) {
  if(process.env.ENV_VARIABLE === 'dev') {
    console.log(req.query)
  }
  googleSearch(req.query.query, function(err, result) {
    res.set('Content-Type', 'application/json')
    res.send(result.links)
  })
})

app.get('/search', function (req, res) {
  if(process.env.ENV_VARIABLE === 'dev') {
    console.log(req.query)
  }
  search.search(req.query.q, function(response) {
    res.send(response)
  })
})

app.use('/assets', express.static('assets'));

app.listen(app.get('port'), function() {
  if(process.env.ENV_VARIABLE === 'dev') {
    console.log('Node app is running on port', app.get('port'));
  }
});