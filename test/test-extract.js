let chai = require('chai');
let should = chai.should();
let expect = chai.expect();

let extract = require('../api/extract')

process.env.ENV_VARIABLE = 'test'

describe('Extract', function() {
    this.timeout(100000)

    it('should correctly give all the URIs with the correct occurences', (done) => {
        extract.results('France', function(occurences) {
            setTimeout(function() {
                occurences.should.be.a('Map')
                occurences.get("http://fr.dbpedia.org/resource/France").should.be.a('number')
                occurences.get("http://fr.dbpedia.org/resource/France").should.be.above(5)
                done()
            })
        })
    })
})