"use strict";

/* 
Adresse API :
https://api.themoviedb.org/3/search/keyword?api_key=69a59336843cba77936e73fc3e3e5a69&query=avatar&page=1
*/


document.addEventListener('DOMContentLoaded', () => {

    const input = document.querySelector("#search_input");
    const submitBtn = document.querySelector("#search_btn");

    
    submitBtn.addEventListener('click', searchKeywords);
    

    function searchKeywords(event) {
        event.preventDefault();
        let search = input.value;
        let url = `https://api.themoviedb.org/3/search/multi?api_key=69a59336843cba77936e73fc3e3e5a69&language=fr-FR&query=${search}&page=1&include_adult=false`;
        let promise = fetch(url)
        .then(response => response.json())
        .then(response => showResults(response.results));
    }

    function showResults(results) {
        //results = un tableau de 20 objets
        console.log(results);
        results.forEach(result => {
            let title = result.original_title || result.original_name || result.name || result.title
            console.log(title);
            //TODO: remplacer le console.log par la création/insertion d'une liste dans le html
        });
    }
    
});


/*
Exemple de résultat:
adult: false
backdrop_path: "/AmHOQ7rpHwiaUMRjKXztnauSJb7.jpg"
genre_ids: (4) [28, 12, 14, 878]
id: 19995
media_type: "movie"
original_language: "en"
original_title: "Avatar"
overview: "Malgré sa paralysie, Jake Sully, un ancien marine immobilisé dans un fauteuil roulant, est resté un combattant au plus profond de son être. Il est recruté pour se rendre à des années-lumière de la Terre, sur Pandora, où de puissants groupes industriels exploitent un minerai rarissime destiné à résoudre la crise énergétique sur Terre. Parce que l'atmosphère de Pandora est toxique pour les humains, ceux-ci ont créé le Programme Avatar, qui permet à des "pilotes" humains de lier leur esprit à un avatar, un corps biologique commandé à distance, capable de survivre dans cette atmosphère létale. Ces avatars sont des hybrides créés génétiquement en croisant l'ADN humain avec celui des Na'vi, les autochtones de Pandora."
popularity: 75.395
poster_path: "/3npygfmEhqnmNTmDWhHLz1LPcbA.jpg"
release_date: "2009-12-10"
title: "Avatar"
video: false
vote_average: 7.5
vote_count: 22853
*/