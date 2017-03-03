//*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function() {

    "use strict";
    /* In this var you call the function routes.init*/
    var config = {
        apiKey: '?api_key=6a1e8b6419fffff5e3744e2c3cd74df6',
        searchApi: 'https://api.themoviedb.org/3/search/movie?api_key=6a1e8b6419fffff5e3744e2c3cd74df6&query=',
        posterUrl: 'http://image.tmdb.org/t/p/w500/',
        detailPage: 'https://api.themoviedb.org/3/movie/'
    };

    var app = {
        init: function() {
            //snippet: search
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
           location.hash = '#movies';
        }
    };

    var getData  = {
        //  With this function you tell to take the query from the input field and how to construct the new url.
        overview: function () {
            // call to api movie list
//            var searchInput = document.getElementById('user-input-field').value;
            var apiUrl = config.searchApi + 'john';
//            console.log(apiUrl);

            //aja is the mini library.  With .url you tell where to get the info.  With .on you say: if successfull load the data in function(data).
            aja()
                .url(apiUrl)
                .on('success', function(data) {

                    //snippet: default cover image

//                    console.log(data,"aja");
                    sections.overview(data);
                })
            .go();
        },

        details: function (id) {
            // call to api movie detail by id
            var detailUrl = config.detailPage + id + config.apiKey;
//            console.log(detailUrl);

             aja()
                .url(detailUrl)
                .on('success', function(data) {

                    console.log(data,"You see me");
                    sections.details(data);
                })
            .go();
        }

    };

    var sections = {
        overview: function (data) {
//            console.log(data);
            // render html with data
            var html = '';

                // With this function you tell what you want to show when a query is requested.
                data.results.map(function(element) {
                     html += '<div class="searchResult" id="'+ element.id +'"> <a href="#movies/' + element.id + '"><h1>' + element.title + '</h1> <img src= "' + config.posterUrl + element.poster_path + '"/></div></a>';

                });

                // snippet default cover image
//                function imageAvailable(){
//                    if (poster_path !== null){
//                        return config.posterUrl+ poster_path;
//                  }else {
//                        poster_path = "img/noposter.png";
//                  }
//                }
                    document.getElementById('queryResult').innerHTML = html;

            this.toggle();
        },

        details: function (data) {
            //render html with data
            var htmlDetail = '';

            function idAvailable(){
                if (element.id !== null){
                    htmlDetail += '<div class="detailResult" id="'+ element.id +'"> <h1>' + element.title + '</h1> <img src= "' + config.posterUrl + element.poster_path + '"/></div>';
              }else {
                    console.log("werk mee");
              }
            }

                    document.getElementById('showDetails').innerHTML = htmlDetail;

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

//                if (sectionsId === route) {
//                    sectionList.classList.remove("hide");
//                } else {
//                    sectionList.classList.add("hide");
//                }
            }
        }
    };

    app.init();


}());






/* snippets */
// snippet default cover image
//function imageAvailable(){
//  if (poster_path !== null){
//      return config.posterUrl+ poster_path;
//  }else{
//    return "./img/noposter.png";
//  }
//}

//snippet search
// If you click on the search button, start function getUserQuery
//var submitSearch = document.getElementById('submit-search');
//            submitSearch.addEventListener('click', function(){
//                getData.overview();
//            });













//    var showDetails = document.getElementById(queryResult);
//    showDetails.addEventListener('click', function(){
//        getDetails();
//    })
//
//    function getDetails(selectMovieOverview) {
//        var movieItem = document.getElementById('showDetails').value;
//        var apiUrlDetails = 'https://api.themoviedb.org/3/movie/'+element.movie_id+'?api_key=6a1e8b6419fffff5e3744e2c3cd74df6&append_to_response=videos';
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

        }



*/








//                    element.genre_ids.map(function(idmap){
//                    console.log(idmap);
//                    });

















