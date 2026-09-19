import {
  useState,
  useCallback,
} from "react";


import {

getWatchlist,

addToWatchlist,

removeFromWatchlist

} from "../services/movieService";









export default function useWatchlist(){



const [watchlist,setWatchlist] =

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

"Watchlist action failed"

);


}



finally{


setLoading(false);


}



}









// ======================
// FETCH WATCHLIST
// ======================



const fetchWatchlist =

useCallback(async()=>{



const data =

await executeRequest(

getWatchlist

);



setWatchlist(data || []);



return data;



},[]);









// ======================
// ADD MOVIE
// ======================



const addToWatchLater =

useCallback(async(movie)=>{



const data =

await executeRequest(

()=>addToWatchlist(movie)

);



if(data){



setWatchlist(prev=>[

...prev,

movie

]);


}



return data;



},[]);









// ======================
// REMOVE MOVIE
// ======================



const removeFromWatchLater =

useCallback(async(movieId)=>{



const data =

await executeRequest(

()=>removeFromWatchlist(movieId)

);



if(data){



setWatchlist(prev=>

prev.filter(

movie=>

movie.id !== movieId

)

);


}



return data;



},[]);









// ======================
// CHECK STATUS
// ======================



function isInWatchlist(movieId){



return watchlist.some(

movie=>

movie.id === movieId

);



}









// ======================
// CLEAR
// ======================



function clearWatchlist(){



setWatchlist([]);



}









return {


watchlist,

loading,

error,


fetchWatchlist,

addToWatchLater,

removeFromWatchLater,

isInWatchlist,

clearWatchlist


};



}