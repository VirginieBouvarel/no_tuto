1/ On verifie si on est sur la première page

On vérifie si il y a déja un tableau dans localstorage
SI oui = on est pas sur la première page
ALORS on recupère ce tableau du localstorage et on l'attribue a notre tableau scores de la page 
SINON = on est sur la première page
ALORS on crée un tableau score qu'on initialise a 0


2/ On ajoute au tableau des scores, les scores de la page en cours

>>setScores()
    //On détermine le mode du formulaire
    //On détermine le type de décompte des scores en fonction du mode
        SI mode = check
        ALORS on parcours l'objet score et pour chaque propriété on execute ckeckByletter et on attribut le resultat à la propriété
        SINON mode = radio
        ALORS on parcours l'objet score et pour chaque propriété on execute radioByLetter et on attribut le resultat à la propriété

            checkByletter(letter)
            compteur;
            inputs = queryselectorall des inputs dans la div letter
            pour chaque input de inputs
                SI l'attribut est checked
                ALORS  compteur++
                return compteur

            radioByletter(letter)
            compteur;
            inputs = queryselectorall des inputs dans la div letter
            pour chaque input de inputs
                On recupère la valeur du groupname
                return compteur +=
    //On met à jour les scores sauvegardés à partir des scores calculés

3/ On détermine si on est sur la dernière page
last = ($queryselector("bouton")= "ok4")

si oui, on est sur la dernière page 
alors on execute la fonction setprofile()

setProfile()
On recupère les valeurs de chaque propriété dans un tableau (sauf si on peut le faire direct depuis l'objet en triant les propriéts en fonction des valeur)
on trie le tableau dans l'ordre ascendant
pour les 3 premières valeurs on execute la fonction key() afin de retrouver la clé coorespondante et on l'attribue aux variables de profile
major = key(tab[0]);
minor1 = key(tab[1]);
minor2 = key(tab[2]);

key(valeur);
parcoure l'objet score
et pour chaque property/value si value = valeur
return property
for (let [key, value] of object.entries(scores)){
    if (value = valeur){
        return key(string)
    }
}
ex: major = key(tab[0]);
major = property = letter(string)

4/ on envoie les variables de profile dans le html

    input hidden "major" prend pour valeur $major
    input hidden "major" prend pour valeur $major
    input hidden "major" prend pour valeur $major

5/ On remet le localStorage à zero pour un prochain usage