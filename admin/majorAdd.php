<?php

/**
 * Ajout d'une dominante
 */

 //Connexion DB
require("../bdd.php");

//Si le formulaire a bien été envoyé et qu'on reçoit les champs souhaités
if(isset($_POST["code"]) && isset($_POST["name"])){
    // Récupération des données
        $majorCode = $_POST["code"];
        $majorName = $_POST["name"];
        $majorFeatures = $_POST["features"];
        $majorSkills = $_POST["skills"];
        $majorStrongPoints = $_POST["strongPoints"];
        $majorWeakPoints = $_POST["weakPoints"];
        $majorCommunication = $_POST["communication"];
        $majorContext = $_POST["context"];
        // var_dump($majorCode, $majorName, $majorFeatures, $majorSkills, $majorStrongPoints, $majorWeakPoints, $majorCommunication, $majorContext);

    // Insertion de la nouvelle dominante dans la bdd
        $sql = "INSERT INTO major (code, name, features, skills, strongPoints, weakPoints, communication, contexts) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        $query = $pdo->prepare($sql);
        $query->execute([$majorCode, $majorName, $majorFeatures, $majorSkills, $majorStrongPoints, $majorWeakPoints, $majorCommunication, $majorContext]);

    //Redirection vers le listing des dominantes
    header("Location: majorList.php");
    exit();    
}



$template = "majorAdd.phtml";
include("layoutAdmin.phtml");