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
            
        })
        .fail(function () {
            alert('Une erreur est survenue')
        })
        .always(function (data) {
        });
});