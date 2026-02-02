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







         
 */
function display_movie(data){
    const result_section = document.getElementById("movieResults");
    data.forEach( movie => {
        console.log(movie);
        const card = document.createElement("div");
        
        // adding image to the card..
        const movie_image = document.createElement("img");
        movie_image.src = movie.Poster;
        card.append(movie_image);

        // adding title to the card..
        const movie_title = document.createElement("h4");
        movie_title.textContent = movie.Title;
        card.appendChild(movie_title);

        

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