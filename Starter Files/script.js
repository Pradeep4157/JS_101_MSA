/*
    we i click on search button, it should give me all the movies that are of that category ?

    so i search category .. 

    maybe when i search about something then it is going to 

    iterate over all the movies and if this matches then it

    is going to send that movie data.. 

    storing and removing movies from localStorage is not that 

    difficult 

        

*/

const API_URL = "https://www.omdbapi.com/?i=tt3896198&apikey=603248ba";

async function fetch_movies(query){
    try{
        const response = await fetch(`${API_URL}&s=${query}&page=${1}`);
        const data = await response.json();
        console.log(data);
    }
    catch(error){
        console.log("Error occured while fetching movies..");
    }
}
const search_query = "Action";
fetch_movies(search_query);