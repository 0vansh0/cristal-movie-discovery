
// ==========================
// RATING HELPERS
// ==========================


export function getRatingPercentage(

rating

){


if(!rating)

return 0;



return Math.round(

rating * 10

);


}









export function getRatingStars(

rating

){


const stars =

Math.round(

rating / 2

);



return "★".repeat(stars)

+

"☆".repeat(

5 - stars

);



}









// ==========================
// TEXT HELPERS
// ==========================


export function truncateText(

text,

length=100

){


if(!text)

return "";




if(text.length <= length)

return text;



return (

text.substring(

0,

length

)

+

"..."

);



}









export function capitalize(

text

){


if(!text)

return "";



return (

text.charAt(0).toUpperCase()

+

text.slice(1)

);



}









// ==========================
// DATE HELPERS
// ==========================


export function formatDate(

date

){


if(!date)

return "Unknown";



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









export function getYear(

date

){


if(!date)

return "";



return new Date(date)

.getFullYear();



}









// ==========================
// NUMBER HELPERS
// ==========================


export function formatNumber(

number

){


if(!number)

return "0";



return new Intl.NumberFormat(

"en-US"

)

.format(number);



}









export function formatCurrency(

amount

){


return new Intl.NumberFormat(

"en-US",

{


style:"currency",

currency:"USD"


}

)

.format(amount);



}









// ==========================
// ARRAY HELPERS
// ==========================


export function shuffleArray(

array

){


return [...array]

.sort(

()=>Math.random()-0.5

);



}









export function getRandomItem(

array

){


if(!array?.length)

return null;



return array[

Math.floor(

Math.random()*array.length

)

];



}









export function sortByRating(

movies

){


return [...movies]

.sort(

(a,b)=>

b.vote_average -

a.vote_average

);



}









export function sortByDate(

movies

){


return [...movies]

.sort(

(a,b)=>

new Date(b.release_date)

-

new Date(a.release_date)

);



}









// ==========================
// STRING HELPERS
// ==========================


export function createSlug(

text

){


return text

.toLowerCase()

.trim()

.replace(

/[^a-z0-9]+/g,

"-"

)

.replace(

/(^-|-$)/g,

""

);



}









// ==========================
// OBJECT HELPERS
// ==========================


export function removeEmptyValues(

object

){



return Object.fromEntries(


Object.entries(object)

.filter(

([,value])=>

value !== null &&

value !== undefined &&

value !== ""

)


);



}









export function isEmpty(

value

){



return (

value === null ||

value === undefined ||

value === ""

);



}