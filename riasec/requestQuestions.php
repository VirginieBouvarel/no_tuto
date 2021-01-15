<?php

/**
 * Code qui récupére les questions dans la base de données sous forme d'un tableau
 * puis qui scinde ce tableau en 6 (1 par profil)
 */



/**
 * Fonction pour scinder un tableau en plusieurs tableaux
 * @parameter : $array = tableau à scinder
 * @parameter : $slice = interval de hachage
 */

function sliceArray($array, $slice){

    return [
    array_slice($array, 0, $slice),
    array_slice($array, $slice, $slice),
    array_slice($array, $slice*2, $slice),
    array_slice($array, $slice*3, $slice),
    array_slice($array, $slice*4, $slice),
    array_slice($array, $slice*5, $slice)
    ];
}


/**
 * Fonction pour récupérer les questions 
 * @parameter : $questionnaire = questionnaire à récupérer
 * @parameter : $slice = interval de hachage pour la fonction sliceArray
 */

 function findQuestions($questionnaire, $slice){

    //Connexion DB
    require("bdd.php");

    //Récupération des questions dans la bdd
    $sql = "SELECT type, class, number, question FROM questions WHERE part = ?";
    $query = $pdo->prepare($sql);
    $query->execute([$questionnaire]);
    $questions = $query->fetchAll();

    //Hachage du tableau $questions pour obtenir un tableau multidimensionnel
    $questions = sliceArray($questions, $slice);
    return $questions;
 }


















