<?php

/**
 * Affichage du questionnaire 2: Activités professionnelles
 */

require("requestQuestions.php");

//Récupération des questions
$questionsActivities = findQuestions('Activités', 15);

//Affichage
$template = "questions2-activities.phtml";
include("layout.phtml");