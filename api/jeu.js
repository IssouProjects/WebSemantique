const request = require('request')

module.exports = {
    infos: function(callback) {
        var test = new Object()
        test.name = 'Mario'
        test.genre = 'Plateforme'
        test.releaseDate = '04/10/1996'
        test.creators = 'Moi même'
        test.platforms = 'PS4 PC'
        callback('',200, test)
    }
}
