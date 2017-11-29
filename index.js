const express = require('express')
const app = express()

const dbpedia = require('./api/dbpedia.js')

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/dbpedia', function (req, res) {
  console.log(req.query.text)
  dbpedia.spotlight(req.query.text, function(error, response, body) {res.send(body)})
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
