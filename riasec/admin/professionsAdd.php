<?php

/**
 * Ajout d'une profession
 */

 //Connexion DB
require("../bdd.php");

//Récupération du code des mineures
$sql = "SELECT code FROM minor";
$query = $pdo->prepare($sql);
$query->execute();
$minorCodes = $query->fetchAll();
// echo '<pre>';
// var_dump($minorCodes);
// echo '<pre>';

//Si le formulaire a bien été envoyé et qu'on reçoit les champs souhaités
if(isset($_POST["code"]) && isset($_POST["name"])){
    // Récupération des données
        $jobMinorCode = $_POST["code"];
        $jobName = $_POST["name"];
        var_dump($jobMinorCode, $jobName);

    // Insertion de la nouvelle profession dans la bdd
        $sql = "INSERT INTO professions (minor_code, name) VALUES (?, ?)";
        $query = $pdo->prepare($sql);
        $query->execute([$jobMinorCode, $jobName]);

    //Redirection vers le listing des dominantes
    header("Location: professionsList.php");
    exit();    
}



$template = "professionsAdd.phtml";
include("layoutAdmin.phtml");