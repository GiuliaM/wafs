//*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function() {

    "use strict";
    /* In this var you call the function routes.init*/
    var config = {
        apiKey: 'api_key=6a1e8b6419fffff5e3744e2c3cd74df6',
        searchApi: 'https://api.themoviedb.org/3/search/movie?api_key=6a1e8b6419fffff5e3744e2c3cd74df6&query=',
        genrePage:'https://api.themoviedb.org/3/discover/movie?with_genres=',
        detailPage: 'https://api.themoviedb.org/3/movie/',
        posterUrl: 'http://image.tmdb.org/t/p/w500/',
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
            var queryResult = document.getElementById('queryResult');
            var searchInput = document.getElementById('user-input-field').value;

            document.querySelectorAll('.searchResult, .noResults').forEach(function(result) {
                    result.parentNode.removeChild(result);
                });

            this.toggleLoading('#spinner-search');

            // aja is the mini library.  With .url you tell where to get the info.  With .on you say: if successfull load the data in function(data).
            var apiUrl = config.searchApi + searchInput;
            aja()
                .url(apiUrl)
                .on('success', function(data) {
                    getData.toggleLoading('#spinner-search');
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
            var form = config.genreForm;
            form.addEventListener('change', function(event) {
               var checked = this.querySelector('[name="emotion"]:checked').value;
               console.log(checked);

                document.querySelectorAll('.genreResult').forEach(function(result) {
                    result.parentNode.removeChild(result);
                });

               getData.toggleLoading('#spinner-genre');

              aja()
                .url(config.genrePage + checked + '&' + config.apiKey + '&sort_by=popularity.desc')
                .on('success', function(data) {
                    getData.toggleLoading('#spinner-genre');
                    sections.genre(data);
                })
                .go();
          });
        },
        toggleLoading: function(id) {
            document.querySelector(id).classList.toggle("hide");
        }
    };

    var sections = {
        overview: function(data) {

                var results = data.results.length > 0 ? data.results.reduce(function(accumulator, element) {
                var posterPath = element.poster_path ? config.posterUrl + element.poster_path : "img/noposter.png";
                return accumulator + `
                    <div class="searchResult" id="${element.id}">
                        <a href="#movies/${element.id}">
                            <h1>${element.title}</h1>
                            <img src= "${posterPath}" alt= "Movie poster ${element.title}"/>
                        </a>
                    </div>`;
            }, '') : `<div class="noResults">
                        <h2>No results found</h2>
                        <img src="img/noresults.svg"/>
                      </div>`;


            document.getElementById('queryResult').insertAdjacentHTML('beforeend', results);
            // render html with data
//            var html = '';
//
//            if (data.results.length === 0) {
//                         var html = '';
//                        html += '<div class="noResults"><h2>No results found</h2> <img src= "img/noresults.svg"> </div>';
//                        console.log ("geen resultaat");
//                    }
//            // With this function you tell what you want to show when a query is requested.
//            data.results.map(function(element) {
//                var posterPath;
//                if (element.poster_path !== null) {
//                    posterPath = config.posterUrl + element.poster_path
//                } else {
//                    posterPath = "img/noposter.png";
//                }
//
//                html += '<div class="searchResult" id="' + element.id + '"> <a href="#movies/' + element.id + '"><h1>' + element.title + '</h1> <img src= "' + posterPath + '"/> </div></a>';
//            });
//
//            document.getElementById('queryResult').innerHTML = html;
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

            htmlDetail += '<div class="buttonDiv"><button class="button"><a href="javascript:history.back()" class="overview"> &#8592; Go back to overview</a></button></div><div class="detailResult" id="' + detail.id + '"><img src= "' + posterPath + '" alt= "Movie poster '+ detail.title +'"/> <div class="detailBlok"><h1>' + detail.title + '</h1> <h2>Summary</h2><p>'+ detail.overview +'</p> <h2>Budget</h2><p>'+ detail.budget +'</p> <h2>Grade</h2> <p>'+ detail.vote_average +'</p> <a href="javascript:history.back()"> Go back to overview</a> </div> </div>';

            console.log(htmlDetail);

            document.getElementById('showDetails').innerHTML = htmlDetail;

        },

        genre: function(data) {
            //            console.log(data);
            // render html with data
            var results = data.results.reduce(function(accumulator, element) {
                var posterPath = element.poster_path ? config.posterUrl + element.poster_path : "img/noposter.png";
                return accumulator + `
                    <div class="genreResult" id="${element.id}">
                        <a href="#genre/${element.id}">
                            <h1>${element.title}</h1>
                            <img src= "${posterPath}" alt= "Movie poster ${element.title}"/>
                        </a>
                    </div>`;
            }, ''); // '' kan ook een 0, [] etc zijn bijv 1000 --> '' is de dom/accumulator

//            var htmlGenre = '';
//
//            // With this function you tell what you want to show when a query is requested.
//            data.results.map(function(element) {
//                var posterPath;
//                if (element.poster_path !== null) {
//                    posterPath = config.posterUrl + element.poster_path
//                } else {
//                    posterPath = "img/noposter.png";
//                }
//
//                htmlGenre += '<div class="genreResult" id="' + element.id + '"> <a href="#genre/' + element.id + '"><h1>' + element.title + '</h1> <img src= "' + posterPath + '"/> </div></a>';
//            });
//            document.getElementById('showGenre').innerHTML = htmlGenre;

            document.getElementById('showGenre').insertAdjacentHTML('beforeend', results);
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
