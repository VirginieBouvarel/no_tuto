<?php

/**
 * Edition d'une question
 */

//Connexion DB
require("../bdd.php");

// RECUPERATION DES DONNEES POUR PREREMPLIR LE FORMULAIRE
    //Si le paramètre id existe
    if (isset($_GET["id"])) { 
        //Récupération du id de la question
            $idQuestion = $_GET["id"];
            //  echo '<pre>';
            //  var_dump($idQuestion);
            //  echo '<pre>';

        //Récupération des infos correspondantes dans la bdd pour préremplir le formulaire
        $sql = "SELECT * FROM questions WHERE id = ?";
        $query = $pdo->prepare($sql);
        $query->execute([$idQuestion]);
        $questionData = $query->fetch();
        //  echo '<pre>';
        //  var_dump($questionData);
        //  echo '<pre>';
    }

// METTRE A JOUR LES DONNEES DANS LA BDD
    // Si les nouveaux champs de formulaire ont bien été envoyés
    if(!empty($_POST)){
        // Récupération des données saisies
            $id = $_POST["id"];
            $number = $_POST["number"];
            $type = $_POST["type"];
            $class = $_POST["class"];
            $question = $_POST["question"];

            //  echo '<pre>';
            //  var_dump($number, $type, $class, $question);
            //  echo '<pre>';

        // Enregistrement des modifications dans la bdd   
            $sql = "UPDATE questions SET type = ?, class = ?, number = ?, question = ? WHERE id = ?";
            $query = $pdo->prepare($sql);
            $query->execute([$type, $class, $number, $question, $id]);
    
        // Redirection vers la page de listing
            Header("Location: questionsList.php"); 
            exit();
    }

$template = "questionsUpdate.phtml";
include("layoutAdmin.phtml");