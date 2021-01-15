<?php

/**
 * Edition d'une dominante
 */

//Connexion DB
require("../bdd.php");

// RECUPERATION DES DONNEES POUR PREREMPLIR LE FORMULAIRE
    //Si le paramètre id existe
    if (isset($_GET["id"])) { 
        //Récupération du id de la dominante
            $idMajor = $_GET["id"];
            // echo '<pre>';
            // var_dump($idMajor);
            // echo '<pre>';

        //Récupération des infos correspondantes dans la bdd pour préremplir le formulaire
        $sql = "SELECT * FROM major WHERE id = ?";
        $query = $pdo->prepare($sql);
        $query->execute([$idMajor]);
        $major = $query->fetch();
        // echo '<pre>';
        // var_dump($major);
        // echo '<pre>';
    }

// METTRE A JOUR LES DONNEES DANS LA BDD
    // Si les nouveaux champs de formulaire ont bien été envoyés
    if(!empty($_POST)){
        // Récupération des données saisies
            $id = $_POST["id"];
            $code = $_POST["code"];
            $name = $_POST["name"];
            $features = $_POST["features"];
            $skills = $_POST["skills"];
            $strongPoints = $_POST["strongPoints"];
            $weakPoints = $_POST["weakPoints"];
            $communication = $_POST["communication"];
            $context = $_POST["context"];
            // echo '<pre>';
            // var_dump($code, $name, $features, $skills, $strongPoints, $weakPoints, $communication, $context);
            // echo '<pre>';

        // Enregistrement des modifications dans la bdd   
            $sql = "UPDATE major SET code = ?, name = ?, features = ?, skills = ?, strongPoints = ?, weakPoints = ?, communication = ?, contexts = ? WHERE id = ?";
            $query = $pdo->prepare($sql);
            $query->execute([$code, $name, $features, $skills, $strongPoints, $weakPoints, $communication, $context, $id]);

        // Redirection vers la page de listing
            Header("Location: majorList.php"); 
            exit();
    }

$template = "majorUpdate.phtml";
include("layoutAdmin.phtml");