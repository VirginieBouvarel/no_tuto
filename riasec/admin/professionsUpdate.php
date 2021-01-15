<?php

/**
 * Edition d'une profession
 */

//Connexion DB
require("../bdd.php");

// RECUPERATION DES DONNEES POUR PREREMPLIR LE FORMULAIRE
    //Si le paramètre id existe
    if (isset($_GET["id"])) { 
        //Récupération du id de la mineure
            $idJob = $_GET["id"];
            //  echo '<pre>';
            //  var_dump($idJob);
            //  echo '<pre>';

        //Récupération des infos correspondantes dans la bdd pour préremplir le formulaire
        $sql = "SELECT * FROM professions WHERE id = ?";
        $query = $pdo->prepare($sql);
        $query->execute([$idJob]);
        $job = $query->fetch();
        //  echo '<pre>';
        //  var_dump($job);
        //  echo '<pre>';
    }

// METTRE A JOUR LES DONNEES DANS LA BDD
    // Si les nouveaux champs de formulaire ont bien été envoyés
    if(!empty($_POST)){
        // Récupération des données saisies
            $id = $_POST["id"];
            $code = $_POST["code"];
            $name = $_POST["name"];

            //  echo '<pre>';
            //  var_dump($code, $name);
            //  echo '<pre>';

        // Enregistrement des modifications dans la bdd   
            $sql = "UPDATE professions SET minor_code = ?, name = ? WHERE id = ?";
            $query = $pdo->prepare($sql);
            $query->execute([$code, $name, $id]);
    
        // Redirection vers la page de listing
            Header("Location: professionsList.php"); 
            exit();
    }

$template = "professionsUpdate.phtml";
include("layoutAdmin.phtml");