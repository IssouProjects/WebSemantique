module.exports = {
    reqTitle: function() {
        return "PREFIX title: <http://dbpedia.org/property/title>\n\
        \
        SELECT * WHERE\
        {\
            currentGame: title: ?title.\
        }";
    },

    description: function() {
        return "PREFIX description: <http://dbpedia.org/ontology/abstract>\n\
        \
        SELECT * WHERE\
        {\
            currentGame: description: ?description.\
        }";
        
    },

    checkIfVideoGame: function() {
        return "PREFIX type: <http://www.w3.org/1999/02/22-rdf-syntax-ns#type>\n\
        PREFIX videoGame: <http://dbpedia.org/ontology/VideoGame>\n\
        \
        ask\
        {\
            currentResource: type: videoGame:.\
        }";
    },

    reqName: function() {
        return "PREFIX name: <http://xmlns.com/foaf/0.1/name>\n\
        \
        SELECT * WHERE\
        {\
            currentGame: name: ?name.\
        }";
    },

    reqGenre: function() {
        return "PREFIX genre: <http://dbpedia.org/ontology/genre>\n\
        SELECT * WHERE\
        {\
            currentGame: genre: ?genre.\
        }";
    },

    reqPlatform: function(){
        return "PREFIX platform: <http://dbpedia.org/ontology/computingPlatform>\n\
        SELECT * WHERE\
        {\
            currentGame: platform: ?platform.\
        }";
    },

    reqMode: function(){
        return "PREFIX mode: <http://dbpedia.org/property/modes>\n\
        SELECT * WHERE\
        {\
            currentGame: mode: ?mode.\
        }";
    },

    reqWikiPage: function(){
        return "PREFIX wikiPage: <http://dbpedia.org/ontology/wikiPageID>\n\
        SELECT * WHERE\
        {\
            currentGame: wikiPage: ?wikipage.\
        }";
    },
        
    reqReleaseDate: function(){
        return "PREFIX releaseDate: <http://dbpedia.org/ontology/releaseDate>\n\
        SELECT * WHERE\
        {\
            currentGame: releaseDate: ?releaseDate.\
        }";
    },

    reqReleaseShit: function(){
        return "PREFIX releaseShit: <http://dbpedia.org/property/released>\n\
        SELECT * WHERE\
        {\
            currentGame: releaseShit: ?releaseShit.\
        }";
    },

    reqPublisher: function(){
        return "PREFIX publisher: <http://dbpedia.org/ontology/publisher>\n\
        SELECT * WHERE\
        {\
            currentGame: publisher: ?publisher.\
        }";
    },

    reqDeveloper: function(){
        return "PREFIX developer: <http://dbpedia.org/ontology/developer>\n\
        SELECT * WHERE\
        {\
            currentGame: developer: ?developer.\
        }";
    },

    reqThumbnail: function(){
        return "PREFIX thumbnail: <http://dbpedia.org/ontology/thumbnail>\n\
        SELECT * WHERE\
        {\
            currentGame: thumbnail: ?thumbnail.\
        }";
    }
}