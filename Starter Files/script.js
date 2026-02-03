/*
    we i click on search button, it should give me all the movies that are of that category ?

    so i search category .. 

    maybe when i search about something then it is going to 

    iterate over all the movies and if this matches then it

    is going to send that movie data.. 

    storing and removing movies from localStorage is not that 

    difficult 

    so now we have the json response.. 
    
    now we will mostly use the containers that are predefined to add

    these movies.. 
    
        

*/

const API_URL = "https://www.omdbapi.com/?i=tt3896198&apikey=603248ba";

// async function fetch_movies(query){
//     try{
//         const response = await fetch(`${API_URL}&s=${query}&page=${1}`);
//         const data = await response.json();
//         console.log(data);
//     }
//     catch(error){
//         console.log("Error occured while fetching movies..");
//     }
// }
// const search_query = "Action";
// fetch_movies(search_query);


/* 
    first we will try to implement the functionality that whenever used types something we take that input and return the json 

    object in the console.. 


*/
const search_button = document.getElementById("searchBtn");
search_button.onclick = function( ) { 
    // first we will take whatever user has written in the input field..
    var input_value = document.getElementById("searchInput").value.trim();
    console.log(input_value);
    // now we have the  input value and with the help of this 
    // we will get the json response 

    // use the api only if the user has written some input..
    if(input_value){    
        fetch_movies(input_value);
    }
}

 /*
    there is a section of movieResults, there we need to somehow 
    
    add all of these json response.. 

    maybe its like we iterate on all these json response.. 

    and we use the appendChild method to keep adding these movies 

    in the movieResults section.. 

    now we have title, poster, year, type, 

    all these information .. 

    either we display all of them independently 

    like image in a js img element, title in a new p ..

    or maybe we create a div in js and then inside that 

    we add these images and p ....

    mostly it is second option because there is css 

    for movie card as well..

    now we need to implement the button functionality to 

    add the movie to favorites..

    if i just have to add it to favorites..

    then i should assign a class or id to it and then 

    if clicked then add it to favorites div.. 

    first we need to store it in localStorage as well so that

    it remains in the later sessions as well..

    we will mostly store on the basis of ibmId..





         
 */
document.addEventListener("DOMContentLoaded", function(){
    load_all_the_favorites();
});
function load_all_the_favorites(){
    // here i need to load all the movies from localStorage.. 
    for(let i = 0; i < localStorage.length; i++){
        const key = localStorage.key(i);
        const json_string = localStorage.getItem(key);
        try{
            const movie = JSON.parse(json_string);
            if(!movie.Title ) continue;
            const card = document.createElement("div");
            card.innerHTML = `<img src = "${movie.Poster}" alt = "${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>`
            const button = document.createElement('button');
            button.textContent = 'Remove From Favorites';
            card.append(button);
            card.classList.add("movie-card");
            favorites_section.add(card);
        }
        catch(error){
            console.log("THIS IS NOT JSON..");
        }
    }
}
function add_movie_to_favorites(movie){
    // adding to localStorage..
    localStorage.setItem(`${movie.imdbID}`,JSON.stringify(movie));

    // adding to favorites section..
    const favorites_section = document.getElementById("favorites");
    const card = document.createElement("div");
    card.innerHTML = `<img src = "${movie.Poster}" alt = "${movie.Title}">
        <h3>${movie.Title}</h3>
        <p>${movie.Year}</p>
        `
        const button_to_add = document.createElement('button');
        button_to_add.textContent = "Remove From Favorites";
        card.append(button_to_add);
        card.classList.add("movie-card");
    favorites_section.append(card);


}

function display_movie(data){
    const result_section = document.getElementById("movieResults");
    data.forEach( movie => {
        console.log(movie);
        const card = document.createElement("div");
        
        card.innerHTML = `<img src = "${movie.Poster}" alt = "${movie.Title}">
        <h3>${movie.Title}</h3>
        <p>${movie.Year}</p>
        `
        const button_to_add = document.createElement('button');
        button_to_add.textContent = "Add to Favorites";
        card.append(button_to_add);

        button_to_add.onclick = () => add_movie_to_favorites(movie);
        
        
        

        // adding the card to the results section..
        result_section.append(card);

        card.classList.add("movie-card");
        
        
    });
}

async function fetch_movies(query){
    try{
        var response = await fetch(`${API_URL}&s=${query}&p=${2}`);
        if(!response.ok){
            throw new Error(`HTTP error! Status : ${response.status}`);
        }
        var data = await response.json();

        // now instead of just logging the response we will 
        // try to display it on webpage.. 

        if(data.Response === 'True'){
            console.log("We are getting some Response..");
            
            display_movie(data.Search);
        }
        else{
            console.log("No Movie found :( ");
        }
        
    }
    catch(error){
        console.log("Some Error occured while loading the movie..",error);
    }
}