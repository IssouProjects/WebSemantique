$("#search").click(function () {
    if(document.getElementById("query").value === '') {return}
    $.get({
        url: 'search',
        type: 'GET',
        data: {
            q: document.getElementById("query").value
        },
        dataType: 'json'
    })
        .done(function (data) {
            
        })
        .fail(function () {
            alert('Une erreur est survenue')
        })
        .always(function (data) {
        });
});