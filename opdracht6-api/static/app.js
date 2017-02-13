/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/


// POST /codecademy/learn-http HTTP/1.1
// Host: www.codecademy.com
// Content-Type: text/html; charset=UTF-8

// Name=Eric&Age=26


var apiKey= "dd38c2386787f64e844c36f6dec9c600"; // Dit is de api key van petfinder

var xhr= new XMLHttpRequest();
xhr.open("GET", "https://www.codecademy.com/", false); // GET is het aanvragen van info, de url en false betekent dat de functie wacht op reactie van de server
//the exercise will wait until it gets a response from the server

xhr.send();

console.log(xhr.status);
console.log(xhr.statusText);

