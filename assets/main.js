$("#query").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#search").click();
    }
});

$("#search").click(function () {
    if(document.getElementById("query").value === '') {return}
    document.getElementById("genre").innerHTML = '';
    document.getElementById("developer").innerHTML = '';
    document.getElementById("name").innerHTML = '';
    document.getElementById("releaseDate").innerHTML = '';
    //document.getElementById("wikipage").innerHTML = '';
    document.getElementById("mode").innerHTML = '';
    document.getElementById("publisher").innerHTML = '';
    document.getElementById("platform").innerHTML = '';
    document.getElementById("description").innerHTML = '';

    document.getElementById("similaires").innerHTML = '';

    document.getElementById("search").className = "btn btn-info"
    document.getElementById("search").disabled = true

    $.get({
        url: 'search',
        type: 'GET',
        data: {
            q: document.getElementById("query").value
        },
        dataType: 'json'
    })
        .done(function (data) {

            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    for(i=0; i< data[key].length; ++i){ 
                        var val = data[key][i].value;
                        var elem = document.getElementById(key);
                        if(elem!=null){
                            array = val.split('/');
                            if(data[key][i].type == "uri")
                                if (i == 0){
                                    document.getElementById(key).innerHTML = "<a href='"+ val + "'>" + array[array.length -1].replace(/_/g, ' ') +"</a>";
                                }
                                else {
                                    document.getElementById(key).innerHTML = document.getElementById(key).innerHTML + ", <a href='"+ val + "'>" + array[array.length -1].replace(/_/g, ' ') +"</a>";
                                }
                            else{
                                if (i == 0){
                                    document.getElementById(key).innerHTML =val ;
                                }
                                else {
                                    document.getElementById(key).innerHTML = document.getElementById(key).innerHTML + ", "+ val;
                                }
                            }     
                        }
                    }    
                }
            }

            data.similarGames.forEach(element => {
                var game = document.createElement("p")
                var array = element.similaire.value.split('/')
                game.innerHTML = '<a href="' + element.similaire.value + '">' + array[array.length -1].replace(/_/g, ' ') + '</a>'
                document.getElementById("similaires").appendChild(game)
            });
            
            var array = data.videoGameUri.split('/')
            document.getElementById("name").innerHTML = '<a href="' + data.videoGameUri + '">' + array[array.length -1].replace(/_/g, ' ') + '</a>'
            
        })
        .fail(function () {
            alert('Une erreur est survenue, vérifiez que vous recherchez bien un jeu vidéo.');
        })
        .always(function (data) {
            document.getElementById("search").className = "btn btn-primary"
            document.getElementById("search").disabled = false
        });
});