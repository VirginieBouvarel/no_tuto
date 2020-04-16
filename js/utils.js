
/**
 * setScores()
 * Fonction qui calcule les scores de la page de questionnaire en cours et les sauvegarde.
 * - elle détermine le mode du questionnaire (checkbox ou radio)
 * - elle détermine quelle méthode de calcul utiliser en fonction du mode
 * - elle appelle la méthode de calcul concernée pour chaque propriété de l'objet scores
 * - elle met à jour le localStorage avec les nouvelles valeurs de scores
 * - elle ne retourne rien
 */

 function setScores(){
    console.log("fonction setScores lancée");
    console.log(document.querySelector('.questionnaire'));
    //On récupère le questionnaire de la page et on vérifie son attribut data-mode
    var mode = document.querySelector('.questionnaire').dataset.mode;
    console.log(mode);
    //On détermine quelle fonction exécuter pour le calcul des scores de chaque propriété et on calcule les scores de chaque propriété
    if (mode === "checkbox"){
        console.log(scores);
        for (const property in scores){
            scores[property] += checkByLetter(property);
        }
        console.log(scores);
    }
    if (mode === "radio"){
        console.log(scores);
        for (const property in scores){
            scores[property] += radioByLetter(property);
        }
        console.log(scores);
    }
    //On met à jour le localStorage pour sauvegarder les nouveaux scores
    localStorage.setItem("SCORES_SAVED", JSON.stringify(scores)); 
    console.log("localStorage = ");
    console.log(localStorage.getItem("SCORES_SAVED")); 
 }

/**
 * checkByLetter()
 * Fonction qui compte le nombre de cases cochées par bloc de réponses.
 * - elle prend en paramètre la lettre du bloc à compter
 * - elle récupère les inputs du bloc
 * - pour chaque input elle vérifie si il est coché
 * - si oui elle incrémente un compteur
 * - elle retourne la valeur du compteur
 */
function checkByLetter(letter){
    console.log("fonction checkByLetter lancée");
    console.log(letter);
    var counter = 0;
    let inputs = document.querySelectorAll('.' + letter);
    // console.log(inputs);

    inputs.forEach(input => {
        if (input.checked === true){
            // console.log(input);
            // console.log("checked = true");
            counter++;
            // console.log(counter);
        } 
    });
    console.log(counter);
    return counter;   
}

/**
 * radioByLetter()
 * Fonction qui pondère les boutons radios cochés par bloc de réponses.
 * - elle prend en paramètre la lettre du bloc à compter
 * - elle récupère les inputs du bloc
 * - pour chaque input elle vérifie si il est coché
 * - si oui elle récupère sa valeur et l'ajoute à un compteur
 * - elle retourne la valeur du compteur
 */
function radioByLetter(letter){
    console.log("fonction radioByLetter lancée");
    console.log(letter);
    var counter = 0;
    var inputs = document.querySelectorAll('.' + letter + ' input[type="radio"]');
    console.log(inputs);

    inputs.forEach(input => {
        if(input.checked === true){
            console.log(input.value);
            
            switch (input.value){
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

            console.log(counter);
        }
    });
    return counter;    
}

/**
 * setProfile()
 * Fonction qui détermine les lettres du profil en fonction des scores
 * - elle trie l'objet scores en ordre descendant
 * - elle récupère les 3 premières valeurs, et associe les clés correspondantes aux 3 variables de profil
 * - elle verifie si 2 dominantes sont ex aequo
 * - elle appelle la fonction sendAndreset avec les variables de profil en paramètres
 * - elle ne retourne rien
 */

function setProfile(){
    //On trie l'objet scores dans l'ordre descendant des valeurs
    scoresSorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    console.log(scoresSorted);
    //On détermine la valeur des variables de profil 
    var major = scoresSorted[0][0];
    var minor1 = scoresSorted[1][0];
    var minor2 = scoresSorted[2][0] ;
    console.log("profile =");
    console.log(major, minor1, minor2);
    //On vérifie si le profil est mixte
    var double = "false";
    if(scoresSorted[0][1] === scoresSorted[1][1]){
        double = "true";
    }
    console.log("double =");
    console.log(double);
    //On envoie les infos au html et on vide le localStorage
    sendAndReset(major, minor1, minor2, double);
}

/**
 * sendAndReset()
 * Fonction qui envoie les valeurs des variables de profil au html et qui remet à zéro les scores sauvegardés
 * - elle insère chaque valeur dans l'input hidden coorespondant
 * - elle supprime l'objet "SCORES_SAVED" du localStorage
 * - elle ne retourne rien
 */
function sendAndReset(major, minor1, minor2, double){

    //On stocke les valeurs des variables de profil dans les champs cachés du html
    document.getElementById("major").value = major;
    document.getElementById("minor1").value = minor1;
    document.getElementById("minor2").value = minor2;
    document.getElementById("double").value = double;

    //On remet à zero le localStorage
    localStorage.removeItem("SCORES_SAVED");
}

/**
 * toggleProfile()
 * Fonction qui permet d'alterner l'affichage des deux profils sur la page resultsDouble.phtml
 * - elle récupère depuis le DOM les 2 boutons et les 2 sections
 * - elle écoute les clics sur les boutons
 * - elle ajoute ou enlève la classe hidden sur l'élément concerné
 * - elle ne retourne rien
 */
function toggleProfile(){
    var btnProfile1 = document.querySelector("#profil-1");
    var btnProfile2 = document.querySelector("#profil-2");
    var sectionProfile1 = document.querySelector(".profil-1");
    var sectionProfile2 = document.querySelector(".profil-2");

    if(btnProfile1){
        btnProfile1.addEventListener("click", ()=>{
            sectionProfile1.classList.remove("hidden");
            sectionProfile2.classList.add("hidden");
        });
        btnProfile2.addEventListener("click", ()=>{
           sectionProfile1.classList.add("hidden");
           sectionProfile2.classList.remove("hidden");
        });
    }
}




