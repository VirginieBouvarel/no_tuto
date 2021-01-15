<?php

/**
 * Listing des mineures
 */


//Connexion DB
require("../bdd.php");

//Récupération des dominantes
$sql = "SELECT * FROM minor";
$query = $pdo->prepare($sql);
$query->execute();
$minors = $query->fetchAll();
// echo '<pre>';
// var_dump($minors);
// echo '<pre>';

$template = "minorList.phtml";
include("layoutAdmin.phtml");