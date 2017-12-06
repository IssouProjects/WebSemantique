let chai = require('chai');
let should = chai.should();
let expect = chai.expect();

let search = require('../api/search')

process.env.ENV_VARIABLE = 'test'

describe('Search', function() {
    this.timeout(10000)

    it('should correctly give an object with the specific properties', (done) => {
        search.search('League of Legends', function(results) {
            results.should.be.an('Array')
            done()
        })
    })
})