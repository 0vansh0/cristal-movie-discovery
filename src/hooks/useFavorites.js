import {
  useState,
  useCallback,
} from "react";


import {

getFavorites,

addFavorite,

removeFavorite

} from "../services/movieService";









export default function useFavorites(){



const [favorites,setFavorites] =

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

"Favorite action failed"

);


}



finally{


setLoading(false);


}



}









// ======================
// FETCH FAVORITES
// ======================



const fetchFavorites =

useCallback(async()=>{



const data =

await executeRequest(

getFavorites

);



setFavorites(data || []);



return data;



},[]);









// ======================
// ADD FAVORITE
// ======================



const addToFavorites =

useCallback(async(movie)=>{



const data =

await executeRequest(

()=>addFavorite(movie)

);



if(data){



setFavorites(prev=>[

...prev,

movie

]);


}



return data;



},[]);









// ======================
// REMOVE FAVORITE
// ======================



const removeFromFavorites =

useCallback(async(movieId)=>{



const data =

await executeRequest(

()=>removeFavorite(movieId)

);



if(data){



setFavorites(prev=>

prev.filter(

movie=>

movie.id !== movieId

)

);


}



return data;



},[]);









// ======================
// CHECK FAVORITE
// ======================



function isFavorite(movieId){



return favorites.some(

movie=>

movie.id === movieId

);



}









// ======================
// CLEAR
// ======================



function clearFavorites(){



setFavorites([]);



}









return {


favorites,

loading,

error,


fetchFavorites,

addToFavorites,

removeFromFavorites,

isFavorite,

clearFavorites


};



}