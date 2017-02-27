//*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function() {

    "use strict";
    /* In this var you call the function routes.init*/
    var config = {
        apiKey: '6a1e8b6419fffff5e3744e2c3cd74df6',
        searchApi: 'https://api.themoviedb.org/3/search/movie?api_key=6a1e8b6419fffff5e3744e2c3cd74df6&query=',
        posterUrl: 'http://image.tmdb.org/t/p/w500/'
    };

    var app = {
        init: function() {
            routes.init();
        }
    };

    var routes = {
        init: function() {
            routie({
                'movies': function() {
                    // data.get('movies');
                    getData.overview();
                },

                'movies/:id': function(id) {
                    getData.details(id);
                }
            });
           location.hash = '#start';
        }
    };

    var getData  = {
        //  With this function you tell to take the query from the input field and how to construct the new url.
        overview: function () {
            // call to api movie list
            sections.overview(data);
        },
        details: function (id) {
            // call to api movie detail by id

            sections.details(data);
        },
    };

    var sections = {
        overview: function (data) {
            // render html with data
            this.toggle();
        },
        details: function (data) {
            //render html with data
            this.toggle();
        },

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
    };

    app.init();


}());














//    var showDetails = document.getElementById(queryResult);
//    showDetails.addEventListener('click', function(){
//        getDetails();
//    })
//
//    function getDetails(selectMovieOverview) {
//        var movieItem = document.getElementById('showDetails').value;
//        var apiUrlDetails = 'https://api.themoviedb.org/3/movie/'+element.id+'?api_key=api_key=6a1e8b6419fffff5e3744e2c3cd74df6&append_to_response=videos';
//


//
//if(getMovieOverview === true){
//  selectMovieOverview.addEventListener('click', function(event){
//                event.preventDefault();
//
//                getDetails(event.target.parentElement.id);
//                routes.init();
//              });
//}



//
//
//        //aja is the mini library.  With .url you tell where to get the info.  With .on you say: if successfull load the data in function(data).
//        aja()
//            .url(apiUrlDetails)
//            .on('success', function(data) {
//                console.log(data);
//                console.log("details zijn er");
//
//            var htmlDetail = '';
//
////                // With this function you tell what you want to show when a query is requested.
////                data.results.map(function(element) {
////                     html += '<div class="searchResult" id="'+ element.id +'"> <a href="#start/' + element.id + '"><h1>' + element.title + '</h1> <img src= "' + 'http://image.tmdb.org/t/p/w500' + element.poster_path + '"/></div></a>';
////                    element.genre_ids.map(function(idmap){
////                    console.log(idmap);
////                });
////
////            });
//                document.getElementById('showDetails').innerHTML = html;
//            })
//            .go();
//    }




/* zoeken
    query: function () {
            var searchInput = document.getElementById('user-input-field').value;
            var apiUrl = config.searchApi + 'john';

            //aja is the mini library.  With .url you tell where to get the info.  With .on you say: if successfull load the data in function(data).
            aja()
                .url(apiUrl)
                .on('success', function(data) {

    //
    //            function imageAvailable(){
    //                      if (poster_path !== null){
    //                          return config.posterUrl+ poster_path;
    //                      }else{
    //                        return "./img/noposter.png";
    //                      }
    //                    }

                    console.log(data);

                var html = '';

                // With this function you tell what you want to show when a query is requested.
                data.results.map(function(element) {
                     html += '<div class="searchResult" id="'+ element.id +'"> <a href="#start/' + element.id + '"><h1>' + element.title + '</h1> <img src= "' + config.posterUrl + element.poster_path + '"/></div></a>';

                    element.genre_ids.map(function(idmap){
                    console.log(idmap);

                    });

                });
                    document.getElementById('queryResult').innerHTML = html;


                 var source = document.getElementById("overview-template").innerHTML;
                        //content
                    var content = {
                            movieTitle: results.title,
    //                        moviePoster: imageAvailable(),
                            movieSummary: results.overview
                            }


                        var template = Handlebars.compile(source);
                        var htmlContent = template(data);

                       document.getElementById('detail-template').innerHTML = htmlContent;



                })
                .go();
        }

// If you click on the search button, start function getUserQuery
    var submitSearch = document.getElementById('submit-search');
    submitSearch.addEventListener('click', function(){
        getData.query();
    })

*/


























