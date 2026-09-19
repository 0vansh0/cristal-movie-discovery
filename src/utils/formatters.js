
// ==========================
// DATE FORMATTERS
// ==========================


export function formatReleaseDate(

date

){


if(!date)

return "Unknown";



return new Date(date)

.toLocaleDateString(

"en-US",

{

year:"numeric",

month:"long",

day:"numeric"

}

);



}









export function formatShortDate(

date

){


if(!date)

return "";



return new Date(date)

.toLocaleDateString(

"en-US",

{

year:"numeric",

month:"short",

day:"numeric"

}

);



}









export function getReleaseYear(

date

){


if(!date)

return "";



return new Date(date)

.getFullYear();



}









// ==========================
// TIME FORMATTERS
// ==========================


export function formatRuntime(

minutes

){


if(!minutes)

return "N/A";



const hours =

Math.floor(

minutes / 60

);



const mins =

minutes % 60;





if(hours===0)

return `${mins}m`;





return `${hours}h ${mins}m`;



}









export function formatSeconds(

seconds

){


if(!seconds)

return "0s";



const mins =

Math.floor(

seconds / 60

);



const secs =

seconds % 60;



return `${mins}m ${secs}s`;



}









// ==========================
// NUMBER FORMATTERS
// ==========================


export function formatCompactNumber(

number

){


if(!number)

return "0";



return new Intl.NumberFormat(

"en",

{

notation:"compact",

maximumFractionDigits:1

}

)

.format(number);



}









export function formatVotes(

votes

){


if(!votes)

return "No votes";



return (

formatCompactNumber(votes)

+

" votes"

);



}









// ==========================
// RATING FORMATTERS
// ==========================


export function formatRating(

rating

){


if(!rating)

return "0.0";



return Number(rating)

.toFixed(1);



}









export function formatPercentage(

value

){


if(!value)

return "0%";



return `${Math.round(value)}%`;



}









// ==========================
// MONEY FORMATTERS
// ==========================


export function formatMoney(

amount

){


if(!amount)

return "$0";



return new Intl.NumberFormat(

"en-US",

{

style:"currency",

currency:"USD",

maximumFractionDigits:0

}

)

.format(amount);



}









// ==========================
// TEXT FORMATTERS
// ==========================


export function formatTitle(

title

){


if(!title)

return "";



return title

.split(" ")

.map(

word=>

word.charAt(0).toUpperCase()

+

word.slice(1)

)

.join(" ");



}









export function formatGenres(

genres

){


if(!genres || !genres.length)

return "Unknown";



return genres

.map(

genre=>

typeof genre === "string"

?

genre

:

genre.name

)

.join(", ");



}









// ==========================
// MOVIE DATA FORMATTER
// ==========================


export function formatMovieInfo(

movie

){


return {


title:

movie.title || movie.name || "Untitled",


year:

getReleaseYear(

movie.release_date || movie.first_air_date

),


rating:

formatRating(

movie.vote_average

),


votes:

formatVotes(

movie.vote_count

),


overview:

movie.overview || "No description available"


};



}

// Backwards-compatible alias used across the codebase
export const formatYear = getReleaseYear;