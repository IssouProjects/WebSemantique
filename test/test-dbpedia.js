let chai = require('chai');
let should = chai.should();
let expect = chai.expect();

let dbpedia = require('../api/dbpedia.js')

process.env.ENV_VARIABLE = 'test'

describe('DBpedia', function () {

    this.timeout(10000)

    it('should correctly annotate a text', (done) => {
        dbpedia.annotate('Lyon', function(error, response, body) {
            body.should.have.property('Resources')
            body.Resources.should.be.an('Array')
            body.Resources[0].should.have.property('@URI')
            body.Resources[0]['@URI'].should.equals('http://dbpedia.org/resource/Lyon')
            done()
        })
    })

    it('should correctly spotlight the words', (done) => {
        dbpedia.spotlight('Lyon', function(error, response, body) {
            response.statusCode.should.equals(200)
            body.should.have.property('annotation')
            body.annotation.should.have.property('@text')
            body.annotation['@text'].should.equals('Lyon')
            done()
        })
    })

    it('should correctly respond to a SPARQL request', (done) => {
        dbpedia.sparqlRequest('select distinct ?Concept where {[] a ?Concept} LIMIT 100', function(error, response, body) {
            response.statusCode.should.equals(200)
            body.should.have.property('head')
            body.should.have.property('results')
            body.results.bindings.should.be.an('Array')
            body.results.bindings[0].should.have.property('Concept')
            body.results.bindings[0].Concept.should.have.property('type')
            body.results.bindings[0].Concept.should.have.property('value')
            done()
        })
    })
})