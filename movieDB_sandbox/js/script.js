"use strict";

document.addEventListener('DOMContentLoaded', () => {

    const input = document.querySelector("#search_input");
    const btn = document.querySelector("#search_btn");

    
    btn.addEventListener('click', getUserInput);
    

    function getUserInput(event) {
        event.preventDefault();
        console.log(input.value);
    }
    
    
});

