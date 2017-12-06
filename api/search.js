import { request } from 'https';

const extract = require('./extract.js')
const dbpedia = require('./dbpedia.js')
const sparql = require('./sparql.js')

module.exports = {
    /*
    * Cette fonction sera la seule appelee par le navigateur
    * Elle va requeter les ressources necessaires et formater
    * les resultats pour les renvoyer au navigateur
    */
    search: function(query, callback) {

        extract.results(query, afterExtractGoogle)

        /* Fonctions de callback */
        function afterExtractGoogle(occurences) {

            var max = 0;
            var dbpediaLink = "";

            occurences.foreach(function(value, key, map){
                if(value >= max){
                  max = value;
                  dbpediaLink = key;
                }
            });


            /*
            * Ici on recupere l'URI la plus representee et on construit
            * la requete SPARQL avec elle
            */

            var promises = new Array()
            var requests = new Array()

            request.push(sparql.reqTitle);
            request.push(sparql.reqGenre);
            request.push(sparql.reqMode);
            request.push(sparql.reqName);
            request.push(sparql.reqDeveloper);
            request.push(sparql.reqPlatform);
            request.push(sparql.reqPublisher);
            request.push(sparql.reqReleaseDate);
            request.push(sparql.reqReleaseShit);
            request.push(sparql.reqTitle);
            request.push(sparql.reqWikiPage);

            requests.forEach(function(element){
                element = "PREFIX currentGame: <" + dbpediaLink + ">\n" + element;
            });

            var results = new Array()

            foreach(requests, function(element) {
                promises.push(new Promise(function(resolve, reject) {
                    dbpedia.sparqlRequest(element, function(err, response, body) {
                        results.push(body)
                        resolve()
                    })
                }))
            })

            Promise.all(promises).then(afterSparqlRequest)
        }

        function afterSparqlRequest(results) {
            /*
            * Ici apres le resultat de la requete SPARQL
            * On analyse ce resultat et on construit un objet
            * que l'on va renvoyer dans le callback (ie le navigateur)
            */

            callback('Reached the end!')
        }
    }
}
