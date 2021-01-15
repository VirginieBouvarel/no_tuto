<?php

/**
 * Suppression d'une question
 */


//Connexion DB
require("../bdd.php");

//Si le paramètre id existe
if (isset($_GET["id"])) { 
    //Récupération du id de la dominante
        $idQuestion = $_GET["id"];
        var_dump($idQuestion);
        
    //Suppression de la mineure correspondante dans la bdd
    $sql = "DELETE FROM questions WHERE id = ?";
    $query = $pdo->prepare($sql);
    $query->execute([$idQuestion]);
}

//Redirection vers la page de listing
Header("Location: questionsList.php"); 
exit();

