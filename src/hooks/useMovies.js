import {
  useState,
  useCallback,
} from "react";


import {

getTrendingMovies,

getPopularMovies,

getTopRatedMovies,

getUpcomingMovies,

getNowPlayingMovies,

getMovieDetails,

getSimilarMovies

} from "../services/tmdbService";








export default function useMovies(){



const [movies,setMovies] =

useState([]);



const [movie,setMovie] =

useState(null);



const [similarMovies,setSimilarMovies] =

useState([]);




const [loading,setLoading] =

useState(false);



const [error,setError] =

useState(null);









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

"Something went wrong"

);


}



finally{


setLoading(false);


}



}









// ======================
// TRENDING
// ======================



const fetchTrending =

useCallback(async()=>{


const data =

await executeRequest(

getTrendingMovies

);



setMovies(data || []);



return data;



},[]);









// ======================
// POPULAR
// ======================



const fetchPopular =

useCallback(async()=>{


const data =

await executeRequest(

getPopularMovies

);



setMovies(data || []);



return data;



},[]);









// ======================
// TOP RATED
// ======================



const fetchTopRated =

useCallback(async()=>{


const data =

await executeRequest(

getTopRatedMovies

);



setMovies(data || []);



return data;



},[]);









// ======================
// UPCOMING
// ======================



const fetchUpcoming =

useCallback(async()=>{


const data =

await executeRequest(

getUpcomingMovies

);



setMovies(data || []);



return data;



},[]);









// ======================
// NOW PLAYING
// ======================



const fetchNowPlaying =

useCallback(async()=>{


const data =

await executeRequest(

getNowPlayingMovies

);



setMovies(data || []);



return data;



},[]);









// ======================
// DETAILS
// ======================



const fetchMovieDetails =

useCallback(async(id)=>{


const data =

await executeRequest(

()=>getMovieDetails(id)

);



setMovie(data);



return data;



},[]);









// ======================
// SIMILAR MOVIES
// ======================



const fetchSimilarMovies =

useCallback(async(id)=>{


const data =

await executeRequest(

()=>getSimilarMovies(id)

);



setSimilarMovies(data || []);



return data;



},[]);









return {


movies,

movie,

similarMovies,

loading,

error,


fetchTrending,

fetchPopular,

fetchTopRated,

fetchUpcoming,

fetchNowPlaying,

fetchMovieDetails,

fetchSimilarMovies


};



}