"use strict";

/**
 * LIBRAIRIE DE FONCTIONS
 */


/**
 * Fonction countChecked
 * Décompte du nombre de cases cochées
 */

function countChecked(classe){
    var questions = document.querySelectorAll('.' + classe);
    console.log("countChecked - contenu de questions: " + questions);
    var counter = 0;
    for (var i = 0; i < questions.length; i++){
        if (questions[i].checked === true){
            counter++
        }
        console.log("counter à l'intérieur de la boucle for: " + counter);
    }
    console.log(" counter juste après la boucle for: " + counter);
    return counter;
}


/**
 * Fonction countRadio
 * Pondération des boutons radio 
 */

function countRadio(classe){
    var counter = 0;
    var radios = document.querySelectorAll('.' + classe + ' input[type="radio"]');
    console.log("countradio - contenu de la variable radios : " + radios);
    for (var i = 0; i < radios.length; i++){
        if(radios[i].checked === true){
            console.log("countRadio - valeur de radios[i].value: " + radios[i].value);
            var value = radios[i].value;
            switch (value){
            case "1":
                counter++;
            break;
            case "2":
                counter += 2;
            break;
            case "3":
                counter += 3;
            break;      
            } 
            console.log("countRadio - counter à la fin après le switch: " + counter);
        }
    }
    return counter;
}
 
/**
 * Fonction calculScores: lancée au clic sur .confirmation
 * Calcul du score pour chaque lettre du tableau result courant
 */

function calculScores(){
    
    //Récupération du mode du formulaire
    var dataMode = document.querySelector('.questionnaire').dataset.mode;
    console.log("calculScores - affichage du mode: " + dataMode);

    //calcul conditionnel des scores en fonction du mode
    if (dataMode === "radio"){
        console.log("lancement de la fonction countRadio");
        for (var i = 0; i < result.length; i++){
            result[i].score += countRadio(result[i].letter);
        }
    }
    if (dataMode === "checkbox"){//Si dataMode = "checkbox"
        console.log("lancement de la fonction countChecked");
        for (var i = 0; i < result.length; i++){
            result[i].score += countChecked(result[i].letter);
            console.log(result[i].score);
        }    
    }
    console.log("calculScores - contenu de result après le décompte de points conditionnel: " + result);

    //Enregistrement des nouvelles données de result dans la localStorage
    localStorage.setItem("RESULT_ARRAY", JSON.stringify(result)); 
    console.log("calculScores - contenu de localStorage après enregistrement: " + localStorage.setItem("RESULT_ARRAY", JSON.stringify(result)));  
}
        

/**
 * Fonction SetProfile : lancée au clic sur #ok4
 * Appel de la fonction calculScores
 * Puis Définition des 3 variables du profil RIASEC
 */

function setProfile(){
    //Calcul des scores de la page
        console.log("lancement de la fonction setProfile");
        calculScores();
    
    //Tri du tableau result en fonction du score à chaque lettre    
        result.sort(function(a,b){
            return a.score - b.score;
        });
        result.reverse();
        console.log("setprofile - contenu de result après reverse: " + result); 

    //Récupération des trois lettres du profil final
        major = result[0].letter;
        console.log("major: " + major);
        minor1 = result[1].letter;
        console.log("minor1: " + minor1);
        minor2 = result[2].letter;
        console.log("minor2: " + minor2);
        
    //Insertion dans le HTML
        document.getElementById("major").value = major;
        document.getElementById("minor1").value = minor1;
        document.getElementById("minor2").value = minor2;

    //Reset du localStorage
        console.log("contenu de resultStorage avant effacement");
        // resultStorage.foreach(element => console.log(element));
};






function confirmer(){
console.log("Confirmation OK");
}
function valider(){
    console.log("ok4 OK");
    }