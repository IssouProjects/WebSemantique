let chai = require('chai');
let should = chai.should();
let expect = chai.expect();

let search = require('../api/search')

process.env.ENV_VARIABLE = 'test'

describe('Search', function() {
    this.timeout(100000)

    it('should correctly return an object with the specific properties', (done) => {
        search.search('League of Legends', function(results) {
            setTimeout(function() {
                results.should.be.an('Object')

                results.should.have.property('developer')
                results.should.have.property('genre')
                results.should.have.property('mode')
                results.should.have.property('name')
                results.should.have.property('platform')
                results.should.have.property('publisher')
                results.should.have.property('releaseDate')
    
                results.developer[0].value.should.equals('http://dbpedia.org/resource/Riot_Games')
                results.genre[0].value.should.equals('http://dbpedia.org/resource/Multiplayer_online_battle_arena')
    
                done()
            })
        })
    })
})