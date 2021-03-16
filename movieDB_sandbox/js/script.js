"use strict";

document.addEventListener('DOMContentLoaded', () => {

    const input = document.querySelector("#search_input");
    const submitBtn = document.querySelector("#search_btn");
    const moviesList = document.querySelector('.cards');
    const resultSection = document.querySelector('.result');

    reloadPreviousSearch();
    submitBtn.addEventListener('click', sendNewSearch);
    

    function reloadPreviousSearch() {
        const params = (new URL(document.location)).searchParams;
        const keywords = params.get('keywords');
    
        if (keywords) {
            input.value = keywords;
            searchKeywords(keywords);
        }
    }

    function sendNewSearch(event) {
        event.preventDefault();
        searchKeywords(input.value);
    }
    
    function searchKeywords(keywords) {
        const url = `https://api.themoviedb.org/3/search/multi?api_key=69a59336843cba77936e73fc3e3e5a69&language=fr-FR&query=${keywords}&page=1&include_adult=false`;
        
        fetch(url)
        .then(response => response.json())
        .then(response => showResults(response.results));
    }

    function showResults(movies) {
        moviesList.innerHTML = "";

        fillResultsList(moviesList,movies);

        resultSection.append(moviesList);
    }

    function fillResultsList(movies) {
        movies.forEach(movie => {
            moviesList.append(createItem(movie));
        });
    }

    function createItem(movie) {
        const li = document.createElement('li');
        li.classList.add('card');

        li.append(createItemContent(movie));

        return li;
    }

    function createItemContent(movie) {
        const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : `img/poster-tmdb.png`;

        const link = document.createElement('a');
        link.setAttribute('href', `details.html?id=${movie.id}&keywords=${input.value}`);

        const image = document.createElement('img');
        image.setAttribute('src', `${posterUrl}`);
        image.setAttribute('alt', 'Poster');

        const title = document.createElement('h3');
        title.textContent = `${movie.original_title || movie.original_name || movie.name || movie.title}`;

        const date = document.createElement('p');
        date.textContent = `${movie.release_date}`;

        link.append(image, title, date);

        return link;
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