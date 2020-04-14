"use strict";

/**
 * DONNEES
 */
var result = [
  {"letter":"r", "score":0},
  {"letter":"i", "score":0},
  {"letter":"a", "score":0},
  {"letter":"s", "score":0},
  {"letter":"e", "score":0},
  {"letter":"c", "score":0},
];
console.log("contenu de result au départ :");
result.forEach(element => console.log(element));

var resultStorage = localStorage.getItem("RESULT_ARRAY");
if(resultStorage){
    result = JSON.parse(resultStorage);
}
console.log("contenu de resultStorage au départ: ");
resultStorage.foreach(element => console.log(element));
console.log("result après remplissage avec resultStorage: ");
result.forEach(element => console.log(element));

var major = "r";
var minor1 = "r";
var minor2 = "r";



/**
 * CODE PRINCIPAL
 */ 


//Gestionnaire d'évènements


if (document.querySelector(".confirmation")){
    var confirmation = document.querySelector('.confirmation');
    console.log(confirmation);
    confirmation.addEventListener("click", calculScores);
}
if (document.querySelector("#ok4")){
    var ok4 = document.querySelector('#ok4');
    console.log(ok4);
    ok4.addEventListener("click", setProfile);
}


/*
condtitions ok : elles trouvent les elements et declenchent le code
fonction confirmer/ valider ok
calculScores renvoie toujours 0
setprofile renvoie ?
*/








