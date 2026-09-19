import axios from "axios";





const API_KEY =

import.meta.env.VITE_TMDB_API_KEY;



const BASE_URL =

import.meta.env.VITE_TMDB_BASE_URL ||

"https://api.themoviedb.org/3";








const searchApi = axios.create({

baseURL:BASE_URL,


params:{


api_key:API_KEY,


language:"en-US"


}


});









// ==========================
// GLOBAL SEARCH
// Movie + TV + Person
// ==========================



export async function globalSearch(query){



if(!query.trim())
return [];



const response =

await searchApi.get(

"/search/multi",

{


params:{


query

}


}

);



return response.data.results;

}









// ==========================
// MOVIE SEARCH
// ==========================



export async function searchMovies(query){



const response =

await searchApi.get(

"/search/movie",

{


params:{


query

}


}

);



return response.data.results;

}









// ==========================
// TV SEARCH
// ==========================



export async function searchTV(query){



const response =

await searchApi.get(

"/search/tv",

{


params:{


query

}


}

);



return response.data.results;

}









// ==========================
// PEOPLE SEARCH
// ==========================



export async function searchActors(query){



const response =

await searchApi.get(

"/search/person",

{


params:{


query

}


}

);



return response.data.results;

}









// ==========================
// TRENDING SEARCHES
// ==========================



export async function getTrendingSearches(){



const response =

await searchApi.get(

"/trending/all/day"

);



return response.data.results;

}









// ==========================
// DISCOVER MOVIES
// ==========================



export async function discoverMovies(filters={}){



const response =

await searchApi.get(

"/discover/movie",

{


params:{


...filters


}


}

);



return response.data.results;

}









// ==========================
// RECENT SEARCH STORAGE
// ==========================



export function saveRecentSearch(query){



const oldSearches =

JSON.parse(

localStorage.getItem(
"recentSearches"
)

)||[];





const updated=[


query,


...oldSearches.filter(

item=>item!==query

)

].slice(0,10);





localStorage.setItem(

"recentSearches",

JSON.stringify(updated)

);



return updated;

}









export function getRecentSearches(){



return (

JSON.parse(

localStorage.getItem(
"recentSearches"
)

)||[]

);


}









export function clearRecentSearches(){



localStorage.removeItem(

"recentSearches"

);


}