let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let expect = chai.expect();

let server = require('../index.js')

chai.use(chaiHttp);

process.env.ENV_VARIABLE = 'test'

describe('DBpedia', function () {

    this.timeout(10000)

    it('should correctly annotate a text', (done) => {
        chai.request(server)
        .get('/dbpedia/annotate')
        .query({text: 'Lyon'})
        .end((err, res) => {
            res.should.have.status(200)
            res.should.have.property('body')
            res.body.body.should.have.property('Resources')
            res.body.body.Resources.should.be.an('Array')
            res.body.body.Resources[0].should.have.property('@URI')
            res.body.body.Resources[0]['@URI'].should.equals('http://dbpedia.org/resource/Lyon')
            done()
        })
    })

    it('should correctly spotlight the words', (done) => {
        chai.request(server)
        .get('/dbpedia/spotlight')
        .query({text: 'Lyon'})
        .end((err, res) => {
            res.should.have.status(200)
            res.body.should.have.property('annotation')
            res.body.annotation.should.have.property('@text')
            done()
        })
    })

    it('should correctly respond to a SPARQL request', (done) => {
        chai.request(server)
        .get('/dbpedia/sparql')
        .query({text: 'select distinct ?Concept where {[] a ?Concept} LIMIT 100'})
        .end((err, res) => {
            res.should.have.status(200)
            res.body.should.have.property('results')
            done()
        })
    })
})