const extract = require('./extract.js')
const dbpedia = require('./dbpedia.js')

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
            /*
            * Ici on recupere l'URI la plus representee et on construit
            * la requete SPARQL avec elle
            */

            dbpedia.sparqlRequest('select distinct ?Concept where {[] a ?Concept} LIMIT 100', afterSparqlRequest)
        }
        
        function afterSparqlRequest(err, response, body) {
            /*
            * Ici apres le resultat de la requete SPARQL
            * On analyse ce resultat et on construit un objet
            * que l'on va renvoyer dans le callback (ie le navigateur)
            */

            callback('Reached the end!')
        }
    }
}