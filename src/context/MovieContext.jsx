import {

createContext,

useContext,

useEffect,

useState,

useCallback

}

from "react";



import {

getTrendingMovies,

getPopularMovies,

getTopRatedMovies,

getUpcomingMovies,

getNowPlayingMovies

}

from "../services/tmdbService";









const MovieContext =

createContext();









export function MovieProvider({

children

}){



const [trending,setTrending] =

useState([]);



const [popular,setPopular] =

useState([]);



const [topRated,setTopRated] =

useState([]);



const [upcoming,setUpcoming] =

useState([]);



const [nowPlaying,setNowPlaying] =

useState([]);









const [loading,setLoading] =

useState(false);



const [error,setError] =

useState(null);









// ==========================
// LOAD MOVIES
// ==========================


const fetchMovies =

useCallback(async()=>{



try{


setLoading(true);

setError(null);





const [

trend,

pop,

top,

up,

playing

]

=

await Promise.all([



getTrendingMovies(),



getPopularMovies(),



getTopRatedMovies(),



getUpcomingMovies(),



getNowPlayingMovies()



]);









setTrending(

trend.results || trend

);



setPopular(

pop.results || pop

);



setTopRated(

top.results || top

);



setUpcoming(

up.results || up

);



setNowPlaying(

playing.results || playing

);





}

catch(err){



setError(

err.message ||

"Failed to load movies"

);



}

finally{


setLoading(false);


}



},[]);









// ==========================
// INITIAL LOAD
// ==========================


useEffect(()=>{



fetchMovies();



},[fetchMovies]);









// ==========================
// REFRESH
// ==========================


function refreshMovies(){



fetchMovies();



}









return (

<MovieContext.Provider

value={


{


trending,

popular,

topRated,

upcoming,

nowPlaying,


loading,

error,


refreshMovies


}


}

>



{children}



</MovieContext.Provider>

);



}









export function useMovies(){



return useContext(

MovieContext

);



}