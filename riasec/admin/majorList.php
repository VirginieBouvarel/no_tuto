<?php

/**
 * Listing des dominantes
 */


//Connexion DB
require("../bdd.php");

//Récupération des dominantes
$sql = "SELECT * FROM major";
$query = $pdo->prepare($sql);
$query->execute();
$majors = $query->fetchAll();
// var_dump($majors);

$template = "majorList.phtml";
include("layoutAdmin.phtml");