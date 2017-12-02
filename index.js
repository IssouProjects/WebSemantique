const express = require('express')
const app = express()

const dbpedia = require('./api/dbpedia.js')

app.get('/', express.static(__dirname))

app.get('/dbpedia/annotate', function (req, res) {
  console.log(req.query.text)
  dbpedia.annotate(req.query.text, function(error, response, body) {
    var retour = new Object({body: body})
    res.set('Content-Type', 'application/json')
    res.send(retour)
  })
})

app.get('/dbpedia/spotlight', function (req, res) {
  console.log(req.query.text)
  dbpedia.spotlight(req.query.text, function(error, response, body) {
    res.set('Content-Type', 'application/json')
    res.send(body)
  })
})

app.use('/assets', express.static('assets'));

app.listen(3000, function () {
  console.log('App listening on port 3000!')
})
