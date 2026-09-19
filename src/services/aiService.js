import {
  TMDB_API,
} from "../config/keys";





// AI Movie Database

const movieDatabase = [

{
id:1,
title:"Interstellar",
poster:
"https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
rating:8.7,
genres:[
"Sci-Fi",
"Drama"
],
reason:
"Space exploration with emotional storytelling"
},


{
id:2,
title:"Inception",
poster:
"https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
rating:8.8,
genres:[
"Sci-Fi",
"Thriller"
],
reason:
"Complex mind bending story"
},


{
id:3,
title:"The Martian",
poster:
"https://image.tmdb.org/t/p/w500/5aGhaIHYuQbqlHWvWYqMCnj40y2.jpg",
rating:8.0,
genres:[
"Sci-Fi",
"Adventure"
],
reason:
"Survival and human intelligence"
},


{
id:4,
title:"Arrival",
poster:
"https://image.tmdb.org/t/p/w500/x2FJsf1ElAgr63Y3PNPtJrcmpoe.jpg",
rating:7.9,
genres:[
"Sci-Fi",
"Mystery"
],
reason:
"Alien communication and emotional depth"
}


];









// Fake AI Processor
// Replace with OpenAI/Gemini API later


async function generateAIResponse(prompt){



return new Promise(
(resolve)=>{


setTimeout(()=>{


resolve({

message:

`Based on your request:
"${prompt}"

I found these cinematic recommendations.`


,

movies:
movieDatabase


});



},1500);



}

);



}











// TMDB Search


async function searchTMDB(query){


try{


const response =

await fetch(

`${TMDB_API.searchMovie}&query=${query}`

);



const data =
await response.json();



return data.results || [];



}

catch(error){


console.error(
"TMDB Error:",
error
);


return [];

}


}












// Main AI Request


export async function sendAIRequest(prompt){



try{



// Step 1
// AI Analysis


const aiResponse =

await generateAIResponse(
prompt
);







// Step 2
// Search related movies


const movies =

await searchTMDB(
prompt
);







return {


message:
aiResponse.message,



movies:

movies.length > 0

?

movies.slice(0,8).map(movie=>({


id:
movie.id,


title:
movie.title,


poster:

movie.poster_path

?

`https://image.tmdb.org/t/p/w500${movie.poster_path}`

:

null,



rating:
movie.vote_average,


genres:
[],


reason:

"AI selected this movie based on your preferences."


}))


:

aiResponse.movies




};



}

catch(error){



console.error(
error
);



return {


message:
"AI service unavailable",


movies:[]

};



}



}