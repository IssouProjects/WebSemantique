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

        let results = new Array()

        extract.results(query, afterExtractGoogle)

        /* Fonctions de callback */
        function afterExtractGoogle(occurences) {

            var max = 0;
            var dbpediaLink = "";

            occurences.forEach(function(value, key, map){
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
            requests.push(sparql.reqWikiPage());

            for(var i = 0; i<requests.length; i++){
                requests[i] = "PREFIX currentGame: <" + dbpediaLink + ">\n" + requests[i];
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

            callback(results)
        }
    }
}
