<?php
/**
 * Récupération en base des infos du profil et affichage
 */

//Inclusion de la connexion à la BDD
require("bdd.php");

//Récupération du score RIASEC 
    if (isset($_POST["major"]) && isset($_POST["minor1"]) && isset($_POST["minor2"]) ){
        $major = $_POST["major"];
        $minor1 = $_POST["minor1"];
        $minor2 = $_POST["minor2"];
        $minor1Code = $_POST["major"].$_POST["minor1"];
        $minor2Code = $_POST["major"].$_POST["minor2"];
        //var_dump($major, $minor1, $minor2, $minor1Code, $minor2Code);

    //Récupération des infos de la dominante 
        $sql = "SELECT * FROM major WHERE code = ?";
        $query = $pdo->prepare($sql);
        $query->execute([$major]);
        $majorData = $query -> fetchAll();
        // echo '<pre>';
        // var_dump($majorData);
        // echo '<pre>';

    //Récupération des infos des mineures
        $sql = "SELECT * FROM minor WHERE code = ? OR code = ?";
        $query = $pdo->prepare($sql);
        $query->execute([$minor1Code, $minor2Code]);
        $minorsData = $query -> fetchAll();
        // echo '<pre>';
        // var_dump($minorsData);
        // echo '<pre>';
    
    //Récupération des métiers associés aux deux mineures
        $sql = "SELECT name FROM professions WHERE minor_code = ? OR minor_code = ?";
        $query = $pdo->prepare($sql);
        $query->execute([$minor1Code, $minor2Code]);
        $jobs = $query -> fetchAll();
        // echo '<pre>';
        // var_dump($jobs);
        // echo '<pre>';
}


$template = "results.phtml";
include("layout.phtml");
?>