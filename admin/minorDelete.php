<?php

/**
 * Suppression d'une mineure
 */


//Connexion DB
require("../bdd.php");

//Si le paramètre id existe
if (isset($_GET["id"])) { 
    //Récupération du id de la dominante
        $idMinor = $_GET["id"];
        var_dump($idMinor);
        
    //Suppression de la mineure correspondante dans la bdd
    $sql = "DELETE FROM minor WHERE id = ?";
    $query = $pdo->prepare($sql);
    $query->execute([$idMinor]);
}

//Redirection vers la page de listing
Header("Location: minorList.php"); 
exit();

