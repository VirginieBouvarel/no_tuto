/*
1/ On vérifie si on est sur la première page, c'est à dire si il y a déjà du contenu sauvegardé dans le localStorage ou non. SI oui on le récupère et on l'assigne à notre objet scores, SINON on crée un objet scores avec chaque valeur à 0.
*/
    //Test pour voir si avec un localStorage déjà rempli, on récupère bien les valeurs dans scores
    // let scoresTest = {r:12, i:6, a:34, s:2, e:15, c:7};
    // localStorage.setItem("SCORES_SAVED", JSON.stringify(scoresTest));

    //Reset manuel de localStorage
    // let scoresReset = {r:0, i:0, a:0, s:2, e:0, c:0};
    // localStorage.setItem("SCORES_SAVED", JSON.stringify(scoresReset));

    let scoresStorage = localStorage.getItem("SCORES_SAVED");
    if(scoresStorage){
        scores = JSON.parse(scoresStorage);
    }else{
        scores = {r:0, i:0, a:0, s:0, e:0, c:0};
    }
    console.log(scores);

/*
2/ Au clic sur la case de confirmation des réponses, on calcule les scores pour la page en cours et on met à jour l'objet scores en ajoutant les valeurs trouvées aux valeurs déjà sauvegardées pour chaque propriété. 
En fonction de l'état cochée/décochée de la case on active/désactive le bouton pour passer au questionnaire suivant.
*/
    let confirmation = document.querySelector(".confirmation");
    let buttonNext = document.querySelector("#next");
    
    if(confirmation){
        confirmation.addEventListener("click", setScores);
        confirmation.addEventListener("change", function(){
                if(buttonNext){
                    buttonNext.classList.toggle("disabled");
                }
            });
        }


/*
3/ Au clic sur case de validation du questionnaire:
- on détermine les lettres du profil en fonction des scores 
- on passe leur valeurs au html
- on reset le localStorage
En fonction de l'état cochée/décochée de la case on active/désactive le bouton submit.
*/
    let validation = document.querySelector(".validation");
    let buttonResults = document.querySelector("#results");
    if(validation){
        validation.addEventListener("click", setProfile);
        validation.addEventListener("change", function(){
            buttonResults.classList.toggle("disabled");
        })
    }
    
// /*
// 4/ Au clic sur les boutons next ou results désactivés, on affiche un message pour indiquer que les cases de confirmation/validation ne sont pas cochées
// */
//     let disabled = document.querySelector(".disabled");
//     console.log(disabled);
//     disabled.addEventListener("mouseover", function(){
//         console.log("ajoute un div message d'erreur");
//     });

/*
5/ Au clic sur les boutons de profils dans la page resultsDouble.phtml on affiche un profil ou l'autre
*/
    toggleProfile();
    

