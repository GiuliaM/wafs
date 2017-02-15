/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/

(function(){

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


//(function(){
//
//var app = {
//    init: function(){
//        routes.init();
//        console.log("routes init starten");
//    }
//};
//
//var routes = {
//    init: function(){
//    window.addEventListener("hashchange", function()
//    {
//        console.log("dit is m");
//    });
//        console.log("test13");
//    }
//};
//
//var sections = {
//    toggle: function(route){
//        route = console.log("test2");
//    }
//};
//
//app.init();
//
//}());







//   var sections = {
//       toggle: function(route/* this is location.hash */) {
//           var sections = document.querySelectorAll('main section');
//           for (i=0; i<sections.length; i++){
//           console.log(route);
//       }
