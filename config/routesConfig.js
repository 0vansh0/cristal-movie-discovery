
// ==========================
// PUBLIC ROUTES
// ==========================


export const PUBLIC_ROUTES = [

{

path:"/",

name:"Home",

title:"CRISTAL Home",

public:true

},



{

path:"/movies",

name:"Movies",

title:"Movies Collection",

public:true

},



{

path:"/tv",

name:"TV Shows",

title:"TV Shows",

public:true

},



{

path:"/search",

name:"Search",

title:"Search Movies",

public:true

},



{

path:"/login",

name:"Login",

title:"Login",

public:true

},



{

path:"/register",

name:"Register",

title:"Create Account",

public:true

}

];









// ==========================
// PROTECTED ROUTES
// ==========================


export const PRIVATE_ROUTES = [

{

path:"/profile",

name:"Profile",

title:"My Profile",

protected:true

},



{

path:"/favorites",

name:"Favorites",

title:"Favorite Movies",

protected:true

},



{

path:"/watchlist",

name:"Watchlist",

title:"My Watchlist",

protected:true

},



{

path:"/ratings",

name:"Ratings",

title:"My Ratings",

protected:true

},



{

path:"/reviews",

name:"Reviews",

title:"My Reviews",

protected:true

},



{

path:"/history",

name:"History",

title:"Watch History",

protected:true

},



{

path:"/lists",

name:"Lists",

title:"My Movie Lists",

protected:true

}

];









// ==========================
// MOVIE ROUTES
// ==========================


export const MOVIE_ROUTES = [

{

path:"/movie/:id",

name:"Movie Details",

title:"Movie Details"

},



{

path:"/person/:id",

name:"Person Details",

title:"Actor Profile"

}

];









// ==========================
// ERROR ROUTES
// ==========================


export const ERROR_ROUTES = [

{

path:"*",

name:"Not Found",

title:"404 Page"

}

];









// ==========================
// NAVIGATION MENU
// ==========================


export const NAVIGATION_ROUTES = [

{

label:"Home",

path:"/"

},



{

label:"Movies",

path:"/movies"

},



{

label:"TV Shows",

path:"/tv"

},



{

label:"Search",

path:"/search"

}

];









// ==========================
// USER MENU
// ==========================


export const USER_ROUTES = [

{

label:"Profile",

path:"/profile"

},



{

label:"Favorites",

path:"/favorites"

},



{

label:"Watchlist",

path:"/watchlist"

},



{

label:"Ratings",

path:"/ratings"

},



{

label:"Reviews",

path:"/reviews"

},



{

label:"History",

path:"/history"

},



{

label:"Lists",

path:"/lists"

}

];









// ==========================
// ALL ROUTES
// ==========================


export const ALL_ROUTES = [

...PUBLIC_ROUTES,

...PRIVATE_ROUTES,

...MOVIE_ROUTES,

...ERROR_ROUTES

];