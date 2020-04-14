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


var resultStorage = localStorage.getItem("RESULT_ARRAY");
if(resultStorage){
    result = JSON.parse(resultStorage);
}

var major = "r";
var minor1 = "r";
var minor2 = "r";



/**
 * CODE PRINCIPAL
 */ 


//Gestionnaire d'évènements conditionnel

if (document.getElementById("ok3")){
    document.querySelector("#ok3").addEventListener("click", calculScores);
}













