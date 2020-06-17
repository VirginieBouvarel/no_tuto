<?php

/*CODE POUR SE CONNECTER A LA BDD*/
//local
$pdo = new PDO('mysql:host=localhost;dbname=riasec;charset=UTF8', "root", "", [ PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);



