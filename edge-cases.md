# Edge cases

Définition du contenu à afficher en fonction du dernier caractère affiché et de la touche cliquée

> currentKey = CK
> ultimteKey = UK
> penultimateKey = PK

previous keys \ key to display | number | dot | % | + | - | x | ÷ |
-------------------------------|--------|-----|---|---|---|---|---|
UK undefined | CK | "" | "" | "" | CK | "" | "" |
Uk NUMBER | CK | CK | " %" | " + " | " - " | " x " | " ÷ " |
UK dot | CK | "" | "0 %" | "0 + " | "0 - " | "0 x " | "0 ÷ " |
