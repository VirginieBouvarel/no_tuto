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
2/ Au clic sur la case de validation des réponses, on calcule les scores pour la page en cours et on met à jour l'objet scores en ajoutant les valeurs trouvées aux valeurs déjà sauvegardées pour chaque propriété
*/
    document.querySelector(".confirmation").addEventListener("click", setScores);

/*
3/ Au clic sur le bouton submit, on détermine les lettres du profil en fonction des scores
*/
    document.querySelector(".validation").addEventListener("click", setProfile);