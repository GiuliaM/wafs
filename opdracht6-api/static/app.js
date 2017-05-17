//*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function() {

    "use strict";
    /* In this var you call the function routes.init*/
    var config = {
        apiKey: 'api_key=6a1e8b6419fffff5e3744e2c3cd74df6',
        searchApi: 'https://api.themoviedb.org/3/search/movie?api_key=6a1e8b6419fffff5e3744e2c3cd74df6&query=',
        genrePage:'https://api.themoviedb.org/3/discover/movie?with_genres=',
        posterUrl: 'http://image.tmdb.org/t/p/w500/',
        detailPage: 'https://api.themoviedb.org/3/movie/',
//        filterUrl: 'https://api.themoviedb.org/3/genre/35',
        submitSearch: document.getElementById('submit-search'),
        detailSection: document.getElementById('details'),
        genreForm: document.getElementById('genreRB')
    };

    var app = {
        init: function() {
            //If you click on the search button, start function getUserQuery
            config.submitSearch.addEventListener('click', function(event) {
                event.preventDefault();
                getData.overview();
            });
            routes.init();

        }
    };

    var routes = {
        init: function() {
            window.location.hash = 'movies';
            routie({
                'movies': function() {
//                     getData.overview('movies');
//                    getData.overview();
                    sections.toggle(location.hash);
                    console.log('Youre at the movies');
                },

                'movies/:id': function(id) {
                    sections.toggle(location.hash);
                    getData.details(id);
                    console.log('Youre at the detailpage');
                },

                'genre': function() {
                    sections.toggle(location.hash);
                    getData.genre();
                    console.log('Youre at Mooooooodvie');
                },

                'genre/:id': function(id){
                    sections.toggle(location.hash);
                    getData.details(id);
                    console.log('Youre at the genredetailpage');
                }
            });
        }
    };

    var getData = {
        //  With this function you tell to take the query from the input field and how to construct the new url.
        overview: function() {
            // call to api movie list
            var searchInput = document.getElementById('user-input-field').value;
            var apiUrl = config.searchApi + searchInput;
            console.log(apiUrl);

            //aja is the mini library.  With .url you tell where to get the info.  With .on you say: if successfull load the data in function(data).
            aja()
                .url(apiUrl)
                .on('success', function(data) {
                    sections.overview(data);
                })
                .go();
        },

        details: function(id) {
            // call to api movie detail by id
            var detailUrl = config.detailPage + id + '?' + config.apiKey;
            console.log(detailUrl);

            aja()
                .url(detailUrl)
                .on('success', function(data) {

                    console.log(data, "You see me");
                    sections.details(data);
                })
                .go();
        },

        genre: function() {
          var form = document.getElementById('genreRB'); form.addEventListener('change', function(event) {
               var checked = this.querySelector('[name="emotion"]:checked').value;
              console.log(checked);

//              var genreUrl = config.genrePage + checked + '&' + config.apiKey + '&sort_by=popularity.desc';
//              console.log(genreUrl);

              aja()
                .url(config.genrePage + checked + '&' + config.apiKey + '&sort_by=popularity.desc')
                .on('success', function(data) {
                    sections.genre(data);
                })
                .go();
          });
        }
    };

    var sections = {
        overview: function(data) {
            //            console.log(data);
            // render html with data
            var html = '';

            // With this function you tell what you want to show when a query is requested.
            data.results.map(function(element) {
                var posterPath;
                if (element.poster_path !== null) {
                    posterPath = config.posterUrl + element.poster_path
                } else {
                    posterPath = "img/noposter.png";
                }

                html += '<div class="searchResult" id="' + element.id + '"> <a href="#movies/' + element.id + '"><h1>' + element.title + '</h1> <img src= "' + posterPath + '"/> </div></a>';
            });

            document.getElementById('queryResult').innerHTML = html;
        },

        details: function(detail) {
            //render html with data
            var htmlDetail = '';

            var posterPath;
            if (detail.poster_path !== null) {
                posterPath = config.posterUrl + detail.poster_path
            } else {
                posterPath = "img/noposter.png";
            }

            htmlDetail += '<div class="detailResult" id="' + detail.id + '"><img src= "' + posterPath + '"/> <div class="detailBlok"><h1>' + detail.title + '</h1> <h2>Summary</h2><p>'+ detail.overview +'</p> <h2>Budget</h2><p>'+ detail.budget +'</p> <h2>Grade</h2> <p>'+ detail.vote_average +'</p> <a href="javascript:history.back()"> Go back to overview</a> </div> </div>';

            console.log(htmlDetail);

            document.getElementById('showDetails').innerHTML = htmlDetail;

        },

        genre: function(data) {
            //            console.log(data);
            // render html with data
            var htmlGenre = '';

            // With this function you tell what you want to show when a query is requested.
            data.results.map(function(element) {
                var posterPath;
                if (element.poster_path !== null) {
                    posterPath = config.posterUrl + element.poster_path
                } else {
                    posterPath = "img/noposter.png";
                }

                htmlGenre += '<div class="genreResult" id="' + element.id + '"> <a href="#genre/' + element.id + '"><h1>' + element.title + '</h1> <img src= "' + posterPath + '"/> </div></a>';
            });

            document.getElementById('showGenre').innerHTML = htmlGenre;
        },

        toggle: function(route /* this is location.hash */ ) {
            var sections = document.querySelectorAll('main section');
            console.log(sections);

            for (var i = 0; i < sections.length; i++) {
                var sectionList = sections[i];
                var sectionsId = "#" + sections[i].id;

                if (sectionsId === route) {
                    sectionList.classList.remove("hide");
                    console.log(sectionsId);
                    console.log(route);

                } else if (route.length > 7) {
                    console.log("true")
                    sectionList.classList.add("hide");
                    config.detailSection.classList.remove('hide');
                } else {
                    sectionList.classList.add("hide");
                }
            }
        }
    };

    app.init();


}());
