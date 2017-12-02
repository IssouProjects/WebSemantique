let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let expect = chai.expect();

let server = require('../index.js')

chai.use(chaiHttp);

process.env.ENV_VARIABLE = 'test'

describe('DBpedia', function () {
    it('should correctly annotate a text', (done) => {
        chai.request(server)
        .get('/dbpedia/annotate')
        .query({text: 'Lyon'})
        .end((err, res) => {
            res.should.have.status(200)
            res.text.should.be.a('string').that.includes('<a about=\\"http://dbpedia.org/resource/Lyon\\" typeof=\\"http://dbpedia.org/ontology/Settlement\\" href=\\"http://dbpedia.org/resource/Lyon\\" title=\\"http://dbpedia.org/resource/Lyon\\">Lyon</a>')
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
})