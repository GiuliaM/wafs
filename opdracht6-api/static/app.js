//*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function() {

    "use strict";
    /* In deze var roep je de functie routes.init op*/
    var userQuery = document.getElementById("user-input-field");
    var app = {
        init: function() {
            routes.init();
        }
    };

    var routes = {
        init: function() {
            routie({
                'start': function() {
                    //            data.get('movies');
                    sections.toggle(location.hash)
                },

                'search': function() {
                    sections.toggle(location.hash)
                },
//
//                'genre/happy': function() {
//                    sections.showMovies('happy')
//                }

                //
                //            'search/bang': function() {
                //                sections.toggle(location.hash)
                //            },
            })
        }
    };

    var sections = {
        toggle: function(route /* this is location.hash */ ) {
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
//        showMovies: function(mood) {
//            var genres = {
//                happy: 1,
//                sad: 2,
//                ootw: 13
//            }
//
//            var genreID = genres[mood];
//
//            // haal data op met genreID
//        }
    };

    app.init();


    var submitSearch = document.getElementById('submit-search');
    submitSearch.addEventListener('click', function(){
        getUserQuery();
    })

    function getUserQuery() {
        var searchInput = document.getElementById('user-input-field').value;
        var apiUrl = 'https://api.themoviedb.org/3/search/movie?api_key=6a1e8b6419fffff5e3744e2c3cd74df6&query='+searchInput;

        //aja is the mini library.  With .url you tell where to get the info.  With .on you say: if successfull load the data in function(data).
        aja()
            .url(apiUrl)
            .on('success', function(data) {
                console.log(data);
                //html
                var html = '';

                data.results.map(function(element) {
                    html += '<p>' + element.title + '</p>' + '<img src= "' + 'http://image.tmdb.org/t/p/w500' + element.poster_path + '"/>';
                    element.genre_ids.map(function(idmap){
                    console.log(idmap);
                });

            });
                document.getElementById('queryResult').innerHTML = html;
            })
            .go();
    }
}());


//if checked controleer dan of happy array overeenkomt met genres_id

//function check() {
//    document.getElementById("user-input-happy").checked = true;
//
//    consol.log
//}



