let chai = require('chai');
let should = chai.should();
let expect = chai.expect();

let extract = require('../api/extract')

process.env.ENV_VARIABLE = 'test'

describe('Extract', function() {
    this.timeout(10000)

    it('should correctly give all the URIs with the correct occurences', (done) => {
        extract.results('France', function(occurences) {
            occurences.should.be.a('Map')
            done()
        })
    })
})