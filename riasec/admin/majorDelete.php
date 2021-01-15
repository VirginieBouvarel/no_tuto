<?php

/**
 * Suppression d'une dominante
 */


//Connexion DB
require("../bdd.php");

//Si le paramètre id existe
if (isset($_GET["id"])) { 
    //Récupération du id de la dominante
        $idMajor = $_GET["id"];
    
    //Suppression de la dominante correspondante dans la bdd
    $sql = "DELETE FROM major WHERE id = ?";
    $query = $pdo->prepare($sql);
    $query->execute([$idMajor]);
}

//Redirection vers la page de listing
Header("Location: majorList.php"); 
exit();

