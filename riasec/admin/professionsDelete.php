<?php

/**
 * Suppression d'une profession
 */


//Connexion DB
require("../bdd.php");

//Si le paramètre id existe
if (isset($_GET["id"])) { 
    //Récupération du id de la dominante
        $idJob = $_GET["id"];
        var_dump($idJob);
        
    //Suppression de la profession correspondante dans la bdd
    $sql = "DELETE FROM professions WHERE id = ?";
    $query = $pdo->prepare($sql);
    $query->execute([$idJob]);
}

//Redirection vers la page de listing
Header("Location: professionsList.php"); 
exit();

