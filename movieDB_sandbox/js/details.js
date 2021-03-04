"use strict";

/* 
Adresse API :
https://api.themoviedb.org/3/movie/19985?api_key=69a59336843cba77936e73fc3e3e5a69&language=fr-FR
*/

document.addEventListener('DOMContentLoaded', () => {

    const backBtn = document.querySelector('#back');
    backBtn.addEventListener('click', goBack);
    
    getMovieData(getMovieId());


    function getMovieId() {
        const params = (new URL(document.location)).searchParams;
        const movieId = params.get('id');
        return movieId;
    }

    function getMovieData(id) {
        let url = `https://api.themoviedb.org/3/movie/${id}?api_key=69a59336843cba77936e73fc3e3e5a69&language=fr-FR`;
        
        fetch(url)
        .then(response => response.json())
        .then(response => showMovieDetails(response));
    }

    function showMovieDetails(movie) {
        console.log(movie);
        const main = document.querySelector('main');

        const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/original/${movie.poster_path}` : `img/poster-tmdb-big.svg` ;

        const section = document.createElement('section');
        section.classList.add('movie');
        section.innerHTML = `
            <img src=${posterUrl} alt="poster">
            <h2>${movie.original_title || movie.original_name || movie.name || movie.title}</h2>
            <div class="movie_infos">
                <p class="movie_release">${movie.release_date}</p>
                <p class="movie_average">${movie.vote_average}</p>
            </div>
            <p class="movie_summary">${movie.overview}</p>
        `;

        main.append(section);
    }

    function goBack() {
        window.history.back();
    }

});