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
        const display = {
            image: document.querySelector('#image'),
            title: document.querySelector('#title'),
            release: document.querySelector('#release'),
            average: document.querySelector('#average'),
            summary: document.querySelector('#summary')
        }

        const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/original/${movie.poster_path}` : `img/poster-tmdb-big.svg`;
        
        display.image.setAttribute('src', `${posterUrl}`);
        display.title.innerHTML = `${movie.original_title || movie.original_name || movie.display.name || movie.title}`;
        display.release.innerHTML = `${movie.release_date}`;
        display.average.innerHTML = `${movie.vote_average}`;
        display.summary.innerHTML = `${movie.overview}`;
    }

    

    function goBack() {
        window.history.back();
    }

});