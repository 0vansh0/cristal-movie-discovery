
// ==========================
// ENV VARIABLES
// ==========================


const ENV = import.meta.env;








// ==========================
// API URLS
// ==========================


export const API_CONFIG = {


TMDB_URL:

ENV.VITE_TMDB_BASE_URL ||

"https://api.themoviedb.org/3",



BACKEND_URL:

ENV.VITE_BACKEND_URL ||

"http://localhost:5000",



TMDB_IMAGE_URL:

"https://image.tmdb.org/t/p"


};









// ==========================
// API KEYS
// ==========================


export const API_KEYS = {


TMDB:

ENV.VITE_TMDB_API_KEY || "",


};


export default API_CONFIG;









// ==========================
// AXIOS DEFAULT CONFIG
// ==========================


export const AXIOS_CONFIG = {


timeout:

10000,


headers:{


"Content-Type":

"application/json"


}


};









// ==========================
// API ENDPOINTS
// ==========================


export const ENDPOINTS = {


AUTH:{


LOGIN:

"/auth/login",


REGISTER:

"/auth/register",


LOGOUT:

"/auth/logout"



},





USER:{


PROFILE:

"/users/profile",


UPDATE:

"/users/profile"



},





MOVIES:{


FAVORITES:

"/movies/favorites",


WATCHLIST:

"/movies/watchlist"



},





REVIEWS:{


CREATE:

"/reviews",


LIST:

"/reviews"



}



};









// ==========================
// TMDB CONFIG
// ==========================


export const TMDB_CONFIG = {


LANGUAGE:

"en-US",



REGION:

"US",



DEFAULT_PAGE:

1



};









// ==========================
// REQUEST SETTINGS
// ==========================


export const REQUEST_CONFIG = {


MAX_RETRIES:

3,


TIMEOUT:

10000


};

// Convenience image base URLs
export const IMAGE_BASE_URL = API_CONFIG.TMDB_IMAGE_URL;
export const BACKDROP_BASE_URL = API_CONFIG.TMDB_IMAGE_URL;