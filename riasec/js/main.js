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
*/
    
    
    if(document.querySelector(".confirmation")){
        document.querySelector(".confirmation").addEventListener("click", setScores);
        
    }


/*
3/ Au clic sur la de case de validation du questionnaire:
- on détermine les lettres du profil en fonction des scores 
- on passe leur valeurs au html
- on reset le localStorage
*/

    if(document.querySelector(".validation")){
        document.querySelector(".validation").addEventListener("click", setProfile);
    }

/*
4/ On écoute l'état des cases de confirmation/validation pour activer/désactiver les boutons d'action suivant et résultats.
*/

    answersValidation();

/*
5/ Au clic sur les boutons de profils dans la page resultsDouble.phtml on affiche un profil ou l'autre
*/
    toggleProfile();
    

