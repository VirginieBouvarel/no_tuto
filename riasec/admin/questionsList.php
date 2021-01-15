<?php

/**
 * Listing des questions
 */


//Connexion DB
require("../bdd.php");

//Récupération des questions
$sql = "SELECT * FROM questions ORDER BY number";
$query = $pdo->prepare($sql);
$query->execute();
$questions = $query->fetchAll();
// echo '<pre>';
// var_dump($questions);
// echo '<pre>';

$template = "questionsList.phtml";
include("layoutAdmin.phtml");