<?php


/*CODE POUR SE CONNECTER A LA BDD*/
//local
$pdo = new PDO('mysql:host=localhost;dbname=riasec;charset=UTF8', "root", "", [ PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);

//hébergeur
// $pdo = new PDO('mysql:host=ohio.o2switch.net;dbname=bovi8406_riasec;charset=UTF8', "bovi8406", "PuZ65yyb5brB", [ PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);



