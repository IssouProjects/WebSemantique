const google = require('google')

const dbpedia = require('./dbpedia.js')
const sparql = require('./sparql.js')

module.exports = {
    /*
    * Cette fonction sera la seule appelee par le navigateur
    * Elle va requeter les ressources necessaires et formater
    * les resultats pour les renvoyer au navigateur
    */
    search: function(query, callback) {

        let results = new Array()

        let isVideoGame = false;

        google.resultsPerPage = 25
        google(query, afterGoogleSearch)

        function afterGoogleSearch(err, res) {

            /* on récupere l'URI la plus fréquente des resultats google */

            var max = 0;
            var dbpediaLink = "";
            var wikipediaLink = "";

            res.links.forEach(function(value, key, map){
                if(value.title.includes('Wikipedia')) {
                    wikipediaLink = value.link
                }
            });

            dbpediaLink = wikipediaLink.replace('https://en.wikipedia.org/wiki', 'http://dbpedia.org/resource')

            /*
             * On teste si l'URI obtenu correspond bien à la page d'un jeu vidéal
             */
            
            var checkVGreq = "PREFIX currentResource: <"+dbpediaLink+">\n";
            checkVGreq += sparql.checkIfVideoGame();

            var promise = new Promise(function(resolve, reject) {
                dbpedia.sparqlRequest(checkVGreq, function(err, response, body) {
                    isVideoGame = false;
                    try {
                        isVideoGame = body.boolean;
                    } catch (e) {
                        let errorMessage = "ERROR: could not check if the URI provided was a video game\n";
                        errorMessage += response;
                        console.error(errorMessage);
                    }

                    resolve();
                })
            });

            promise.then(function(){
                if(isVideoGame){
                    extractDbPediaData(dbpediaLink);
                } else {
                    callback(null); //what should we do if the game does not exists @AmosTrask ? @Raul6469 ?
                }
            });
        }

        function extractDbPediaData(videoGameURI){
        
            /* on construit la requete qui va nous permettre d'obtenir les infos intéressantes */

            var promises = new Array()
            var requests = new Array()

            requests.push(sparql.reqTitle());
            requests.push(sparql.reqGenre());
            requests.push(sparql.reqMode());
            requests.push(sparql.reqName());
            requests.push(sparql.reqDeveloper());
            requests.push(sparql.reqPlatform());
            requests.push(sparql.reqPublisher());
            requests.push(sparql.reqReleaseDate());
            requests.push(sparql.reqReleaseShit());
            requests.push(sparql.reqTitle());
            requests.push(sparql.description());
            //requests.push(sparql.reqWikiPage());

            for(var i = 0; i<requests.length; i++){
                requests[i] = "PREFIX currentGame: <" + videoGameURI + ">\n" + requests[i];
            }

            requests.forEach(function(element) {
                promises.push(new Promise(function(resolve, reject) {
                    dbpedia.sparqlRequest(element, function(err, response, body) {
                        results.push(body)
                        resolve()
                    })
                }))
            })

            Promise.all(promises).then(afterSparqlRequest)
        }

        function afterSparqlRequest() {
            /*
            * Ici apres le resultat de la requete SPARQL
            * On analyse ce resultat et on construit un objet
            * que l'on va renvoyer dans le callback (ie le navigateur)
            */
            
            callback(convertJSON(results))
        }
    }
}

function convertJSON(results) {
    var retour = new Object()

    results.forEach(function(elem) {
        elem.results.bindings.forEach(function(properties) {
            var property = Object.getOwnPropertyNames(properties)[0]
            var list = new Array()
            try {
                elem.results.bindings.forEach(function(result) {
                    if(result[property]['xml:lang'] == undefined || result[property]['xml:lang'] == "en")
                    {
                        list.push(result[property]);
                    }
                })
            } catch (e) {
                // It is not a list
                list.push(properties[property])
            }
            retour[property] = list
        })
    })

    return retour
}