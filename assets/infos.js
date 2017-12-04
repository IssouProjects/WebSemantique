$("#search").click(function () {
    $.get({
        url: 'jeu/infos',
        type: 'GET',
        data: {
            confidence: 0.5
        },
        dataType: 'json'
    })
        .done(function (data) {
            console.log(data)
            document.getElementById("name").innerText = data.name;
            document.getElementById("releaseDate").innerText = data.releaseDate;
            document.getElementById("creators").innerText = data.creators;
            document.getElementById("genre").innerText = data.genre;
            document.getElementById("platforms").innerText = data.platforms;
        })
        .fail(function () {
            alert('Une erreur est survenue')
        })
        .always(function (data) {
            //document.getElementById("name").innerText.append = 'test';
            console.log(data)
        });
});