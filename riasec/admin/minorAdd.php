<?php

/**
 * Ajout d'une mineure
 */

 //Connexion DB
require("../bdd.php");

//Si le formulaire a bien été envoyé et qu'on reçoit les champs souhaités
if(isset($_POST["code"]) && isset($_POST["name"]) && isset($_POST["description"])){
    // Récupération des données
        $minorCode = $_POST["code"];
        $minorName = $_POST["name"];
        $minorDescription = $_POST["description"];

        // var_dump($minorCode, $minorName, $minorDescription);

    // Insertion de la nouvelle dominante dans la bdd
        $sql = "INSERT INTO minor (code, name, description) VALUES (?, ?, ?)";
        $query = $pdo->prepare($sql);
        $query->execute([$minorCode, $minorName, $minorDescription]);

    //Redirection vers le listing des dominantes
    header("Location: minorList.php");
    exit();    
}



$template = "minorAdd.phtml";
include("layoutAdmin.phtml");