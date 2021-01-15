<?php

/**
 * Listing des professions
 */


//Connexion DB
require("../bdd.php");

//Récupération des professions
$sql = "SELECT * FROM professions ORDER BY minor_code";
$query = $pdo->prepare($sql);
$query->execute();
$jobs = $query->fetchAll();
// echo '<pre>';
// var_dump($jobs);
// echo '<pre>';

$template = "professionsList.phtml";
include("layoutAdmin.phtml");