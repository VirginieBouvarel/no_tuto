<?php

/**
 * Ajout d'une question
 */

 //Connexion DB
require("../bdd.php");

//Si le formulaire a bien été envoyé et qu'on reçoit les champs souhaités
if(isset($_POST["number"]) && isset($_POST["type"]) && isset($_POST["class"]) && isset($_POST["question"])){
    // Récupération des données
        $number = $_POST["number"];
        $type = $_POST["type"];
        $class = $_POST["class"];
        $question = $_POST["question"];

        // var_dump($number, $type, $class, $question);

    // Insertion de la nouvelle question dans la bdd
        $sql = "INSERT INTO questions (type, class, number, question) VALUES (?, ?, ?, ?)";
        $query = $pdo->prepare($sql);
        $query->execute([$type, $class, $number, $question]);

    //Redirection vers le listing des dominantes
    header("Location: questionsList.php");
    exit();    
}



$template = "questionsAdd.phtml";
include("layoutAdmin.phtml");