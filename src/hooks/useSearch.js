import {
  useState,
  useCallback,
} from "react";


import {

globalSearch,

searchMovies,

searchTV,

searchActors,

getTrendingSearches

} from "../services/searchService";








export default function useSearch(){



const [results,setResults] =

useState([]);



const [trending,setTrending] =

useState([]);



const [loading,setLoading] =

useState(false);



const [error,setError] =

useState(null);



const [query,setQuery] =

useState("");









async function executeRequest(

callback

){



try{


setLoading(true);

setError(null);



const data =

await callback();



return data;



}

catch(err){


console.error(err);


setError(

err.message ||

"Search failed"

);


}



finally{


setLoading(false);


}



}









// ======================
// GLOBAL SEARCH
// ======================



const search =

useCallback(async(value)=>{



if(!value.trim()){


setResults([]);


return;


}



setQuery(value);





const data =

await executeRequest(

()=>globalSearch(value)

);



setResults(data || []);



return data;



},[]);









// ======================
// MOVIE SEARCH
// ======================



const searchMovie =

useCallback(async(value)=>{



const data =

await executeRequest(

()=>searchMovies(value)

);



setResults(data || []);



return data;



},[]);









// ======================
// TV SEARCH
// ======================



const searchTVShows =

useCallback(async(value)=>{



const data =

await executeRequest(

()=>searchTV(value)

);



setResults(data || []);



return data;



},[]);









// ======================
// PEOPLE SEARCH
// ======================



const searchPeople =

useCallback(async(value)=>{



const data =

await executeRequest(

()=>searchActors(value)

);



setResults(data || []);



return data;



},[]);









// ======================
// TRENDING
// ======================



const fetchTrendingSearches =

useCallback(async()=>{



const data =

await executeRequest(

getTrendingSearches

);



setTrending(data || []);



return data;



},[]);









// ======================
// CLEAR
// ======================



function clearSearch(){



setResults([]);

setQuery("");

setError(null);



}









return {


query,

results,

trending,

loading,

error,


search,

searchMovie,

searchTVShows,

searchPeople,

fetchTrendingSearches,

clearSearch


};



}