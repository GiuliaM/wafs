
//*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/

//https://api.themoviedb.org/3/movie/550?api_key=6a1e8b6419fffff5e3744e2c3cd74df6&query=johnny

(function() {

     "use strict";
/* In deze var roep je de functie routes.init op*/
   var app = {
       init: function() {
           routes.init();
       }
   };

/**/
   var routes = {
       init: function() {
           window.addEventListener("hashchange", function(){
               sections.toggle(location.hash);
           });
       }
   };

    var sections = {
        toggle: function(route/* this is location.hash */) {
            var sections = document.querySelectorAll('main section');
            console.log(sections);
            var i;
            var sectionList;
            var sectionsId;

            for (i = 0; i < sections.length; i++) {
                var sectionList = sections[i];
                var sectionsId = "#" + sections[i].id;


                if (sectionsId === route) {
                    sectionList.classList.remove("hide");
                } else {
                    sectionList.classList.add("hide");
                }
            }
   }
};

   app.init();

}());



function getUserQuery() {
    var userQuery = document.getElementById("user-input-field").value;
    var apiUrl = 'https://api.themoviedb.org/3/search/movie?api_key=6a1e8b6419fffff5e3744e2c3cd74df6&query='
;

    //aja is the mini library.  With .url you tell where to get the info.  With .on you say: if successfull load the data in function(data).
    aja()
    .url(apiUrl + userQuery)
    .on('success', function(data) {
        console.log(data);
        //html
        var html = '';

        data.results.map( function(element) {

            var apiUrl = apiUrl + element.id;
            html += '<p>' + element.title + '</p>' + '<img src= "' + 'http://image.tmdb.org/t/p/w500' + element.poster_path + '"/>';
        });

        document.getElementById('queryResult').innerHTML = html;
    })
    .go();

}




