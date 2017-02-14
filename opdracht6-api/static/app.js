///*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/

(function() {
    'use strict';

var config = {
//    apiKey:'#',
//    apiSecret:'#',
    apiUrl: 'http://dennistel.nl/movies'
}

var localStorage, table = [];

//aja is the mini library.  With .url you tell where to get the info.  With .on you say: if successfull load the data in function(data). In function data I made the object newEntry which states the function saveData(). Which pushes the data to the array table.
aja()
    .url(config.apiUrl)
    .on('success', function(data) {
        localStorage = {
          saveData: function(){
              table.push(data);
              console.log(table);
          }
        }
        localStorage.saveData()
    })
    .go();




    //    function getUserInput() {
//      var userInput = document.getElementById("user-input-field").value;
//      console.log(userInput);
//    }

}());













