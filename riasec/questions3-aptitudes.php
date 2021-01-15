<?php

/**
 * Affichage du questionnaire 3: Aptitudes
 */

require("requestQuestions.php");

//Récupération des questions
$questionsAptitudes = findQuestions('Aptitudes', 10);

//Affichage
$template = "questions3-aptitudes.phtml";
include("layout.phtml");