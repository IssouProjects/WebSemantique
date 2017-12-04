$("#runSparql").click(function () {
    $.get({
        url: 'dbpedia/sparql',
        type: 'GET',
        data: {
            text: document.getElementById("sparql").value,
            confidence: 0.5,
        },
        dataType: 'json'
    })
        .done(function (data) {
            document.getElementById("results").innerText = JSON.stringify(data);
        })
        .fail(function () {
            alert('Une erreur est survenue')
        })
        .always(function (data) {
        });
});