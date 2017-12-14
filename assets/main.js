$("#search").click(function () {
    if(document.getElementById("query").value === '') {return}
    document.getElementById("genre").innerHTML = '';
    document.getElementById("developer").innerHTML = '';
    document.getElementById("name").innerHTML = '';
    document.getElementById("releaseDate").innerHTML = '';
    document.getElementById("wikipage").innerHTML = '';
    document.getElementById("mode").innerHTML = '';
    document.getElementById("publisher").innerHTML = '';
    document.getElementById("platform").innerHTML = '';
    $.get({
        url: 'search',
        type: 'GET',
        data: {
            q: document.getElementById("query").value
        },
        dataType: 'json'
    })
        .done(function (data) {

            console.log(data)

                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                      var val = data[key][0].value;
                      var elem = document.getElementById(key);
                      if(elem!=null){
                        document.getElementById(key).innerHTML = val;
                      }
                    }
                }
            
            
        })
        .fail(function () {
            alert('Une erreur est survenue')
        })
        .always(function (data) {
        });
});