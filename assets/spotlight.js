$("#searchDB").click(function () {
    if(document.getElementById("query").value === '') {return}
    $.get({
        url: 'dbpedia/annotate',
        type: 'GET',
        data: {
            text: document.getElementById("query").value,
            confidence: 0.5,
        },
        dataType: 'json'
    })
        .done(function (data) {
            document.getElementById("annotated").innerHTML = data.body;
        })
        .fail(function () {
            alert('Une erreur est survenue')
        })
        .always(function (data) {
        });
});