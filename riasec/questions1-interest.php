<?php

/**
 * Affichage du questionnaire 1: Intérêts et Occupations
 */

require("requestQuestions.php");

//Récupération des questions
$questionsInterest = findQuestions('Intérêts', 15);

//Affichage
$template = "questions1-interest.phtml";
include("layout.phtml");