
// ==========================
// BASIC STORAGE METHODS
// ==========================



export function setItem(

key,

value

){



try{


localStorage.setItem(

key,

JSON.stringify(value)

);



}

catch(error){


console.error(

"Storage Error:",

error

);


}



}









export function getItem(

key

){



try{


const item =

localStorage.getItem(key);



return item

?

JSON.parse(item)

:

null;



}

catch(error){


console.error(

"Storage Error:",

error

);



return null;



}



}









export function removeItem(

key

){



try{


localStorage.removeItem(key);



}

catch(error){


console.error(

"Storage Error:",

error

);


}



}









export function clearStorage(){



try{


localStorage.clear();



}

catch(error){


console.error(

"Storage Error:",

error

);


}



}









// ==========================
// TOKEN MANAGEMENT
// ==========================



const TOKEN_KEY =

"cristal_token";








export function setToken(

token

){



setItem(

TOKEN_KEY,

token

);



}









export function getToken(){



return getItem(

TOKEN_KEY

);



}









export function removeToken(){



removeItem(

TOKEN_KEY

);



}









export function isAuthenticated(){



return Boolean(

getToken()

);



}









// ==========================
// USER MANAGEMENT
// ==========================



const USER_KEY =

"cristal_user";








export function saveUser(

user

){



setItem(

USER_KEY,

user

);



}









export function getUser(){



return getItem(

USER_KEY

);



}









export function removeUser(){



removeItem(

USER_KEY

);



}









// ==========================
// THEME MANAGEMENT
// ==========================



const THEME_KEY =

"cristal_theme";








export function saveTheme(

theme

){



setItem(

THEME_KEY,

theme

);



}









export function getTheme(){



return getItem(

THEME_KEY

)

||

"dark";



}









// ==========================
// SEARCH HISTORY
// ==========================



const SEARCH_KEY =

"cristal_recent_searches";








export function saveSearch(

query

){



const searches =

getItem(

SEARCH_KEY

)

||

[];








const updated = [


query,


...searches.filter(

item => item !== query

)


].slice(

0,

10

);








setItem(

SEARCH_KEY,

updated

);



return updated;



}









export function getSearchHistory(){



return (

getItem(

SEARCH_KEY

)

||

[]

);



}









export function clearSearchHistory(){



removeItem(

SEARCH_KEY

);



}









// ==========================
// CACHE MANAGEMENT
// ==========================



export function saveCache(

key,

data

){



setItem(

`cache_${key}`,

{


data,


timestamp:

Date.now()


}

);



}









export function getCache(

key,

expiry=3600000

){



const cache =

getItem(

`cache_${key}`

);





if(!cache)

return null;








const expired =

Date.now()

-

cache.timestamp

>

expiry;







if(expired){



removeItem(

`cache_${key}`

);



return null;



}







return cache.data;



}