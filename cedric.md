Salut Cédric,

Voilà le code de ma calculette. J'ai encore avancé, mais la fonction formatDisplay() me donne du fil à retordre.

Mon problème:
Je saisi "2", puis "+" puis je veux ajouter un "-" et normalement le programme devrait effacer le plus et mettre le moins à la place (gestion des nombres négatifs). 

ligne 110 le slice pour effacer le "+" s'effectue bien (vérifié dans le debugger)
--> avant le slice display.textContent = "2 + "
--> après le slice display.textContent = "2"
ligne 11 le return renvoie bien " - "
au pas suivant, quand on remonte ligne 12, le " - " est bien ajouté à display.textContent 
sauf que ici display.textContent semble avoir ignoré le slice est vaut toujours "2 + " 
ce qui avec la concaténation du return donne "2 +  - " au lieu de "2 - ".

J'ai suivi plusieurs fois la manip pas à pas au débugger, je ne parviens pas à voir ce qui se passe, du coup je ne sais pas comment y remédier.
