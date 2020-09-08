# Difficultés rencontrées et solutions apportées

## Bug#1
Si on clique plusieurs fois sur lecture cela accélère le défilement et rend les clics sur pause ou stop inopérants
> Solution apportée: Ajouter un test pour lancer l'interval seulement s'il n'a pas déjà été lancé

## Bug#2
Après l'ajout du test pour fixer le bug#1, on ne peut plus relancer la lecture après avoir stoppé le défilement du timer
> Solution apportée: Remise à zéro de l'interval pour que le test prévu avant la lecture passe et qu'un nouvel interval soit lancé