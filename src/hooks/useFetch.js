import {
  useState,
  useEffect,
  useCallback,
} from "react";








export default function useFetch(

fetchFunction,

autoFetch=true

){



const [data,setData] =

useState(null);



const [loading,setLoading] =

useState(false);



const [error,setError] =

useState(null);









const execute =

useCallback(async()=>{



try{


setLoading(true);

setError(null);





const response =

await fetchFunction();





setData(response);





return response;



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



},[fetchFunction]);









useEffect(()=>{



if(autoFetch){


execute();


}



},[execute,autoFetch]);









function reset(){



setData(null);

setError(null);



}









return {


data,

loading,

error,

refetch:execute,

reset


};



}