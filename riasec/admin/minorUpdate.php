<?php

/**
 * Edition d'une mineure
 */

//Connexion DB
require("../bdd.php");

// RECUPERATION DES DONNEES POUR PREREMPLIR LE FORMULAIRE
    //Si le paramètre id existe
    if (isset($_GET["id"])) { 
        //Récupération du id de la mineure
            $idMinor = $_GET["id"];
            //  echo '<pre>';
            //  var_dump($idMinor);
            //  echo '<pre>';

        //Récupération des infos correspondantes dans la bdd pour préremplir le formulaire
        $sql = "SELECT * FROM minor WHERE id = ?";
        $query = $pdo->prepare($sql);
        $query->execute([$idMinor]);
        $minor = $query->fetch();
        //  echo '<pre>';
        //  var_dump($minor);
        //  echo '<pre>';
    }

// METTRE A JOUR LES DONNEES DANS LA BDD
    // Si les nouveaux champs de formulaire ont bien été envoyés
    if(!empty($_POST)){
        // Récupération des données saisies
            $id = $_POST["id"];
            $code = $_POST["code"];
            $name = $_POST["name"];
            $description = $_POST["description"];

            //  echo '<pre>';
            //  var_dump($code, $name, $description);
            //  echo '<pre>';

        // Enregistrement des modifications dans la bdd   
            $sql = "UPDATE minor SET code = ?, name = ?, description = ? WHERE id = ?";
            $query = $pdo->prepare($sql);
            $query->execute([$code, $name, $description, $id]);
    
        // Redirection vers la page de listing
            Header("Location: minorList.php"); 
            exit();
    }

$template = "minorUpdate.phtml";
include("layoutAdmin.phtml");