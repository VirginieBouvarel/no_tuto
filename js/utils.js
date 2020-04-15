
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
 * - elle récupère les valeurs des propriétés dans un tableau
 * - elle trie le tableau dans l'ordre descendant
 * - elle récupère les 3 premières valeurs, et associe les clés correspondantes aux 3 variables de profil
 * - elle retourne les 3 variables de profil
 */

function setProfile(){
    scoresTab = scores.values();
    console.log(scoresTab);
}