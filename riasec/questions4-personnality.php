<?php

/**
 * Affichage du questionnaire 4: Personnalité
 */

require("requestQuestions.php");

//Récupération des questions
$questionsPersonality = findQuestions('Personnalité', 10);

//Affichage
$template = "questions4-personnality.phtml";
include("layout.phtml");