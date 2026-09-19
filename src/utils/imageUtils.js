
// ==========================
// CONSTANTS
// ==========================


const TMDB_IMAGE_URL =

"https://image.tmdb.org/t/p";








const DEFAULT_IMAGES = {


poster:

"/images/poster-placeholder.svg",


backdrop:

"/images/backdrop-placeholder.svg",


profile:

"/images/avatar-placeholder.svg"


};









// ==========================
// TMDB IMAGE URL BUILDER
// ==========================


export function getImageUrl(

path,

size="w500"

){



if(!path)

return null;



return `${TMDB_IMAGE_URL}/${size}${path}`;



}









// ==========================
// MOVIE POSTER
// ==========================


export function getPosterUrl(

posterPath,

size="w500"

){



if(!posterPath)

return DEFAULT_IMAGES.poster;



return getImageUrl(

posterPath,

size

);



}









// ==========================
// BACKDROP IMAGE
// ==========================


export function getBackdropUrl(

backdropPath,

size="w1280"

){



if(!backdropPath)

return DEFAULT_IMAGES.backdrop;



return getImageUrl(

backdropPath,

size

);



}









// ==========================
// PROFILE IMAGE
// ==========================


export function getProfileUrl(

profilePath,

size="w500"

){



if(!profilePath)

return DEFAULT_IMAGES.profile;



return getImageUrl(

profilePath,

size

);



}









// ==========================
// IMAGE VALIDATION
// ==========================


export function hasImage(

path

){



return Boolean(

path &&

path.trim() !== ""

);



}









// ==========================
// IMAGE SIZE HELPERS
// ==========================


export function getSmallImage(

path

){



return getImageUrl(

path,

"w300"

);



}









export function getMediumImage(

path

){



return getImageUrl(

path,

"w500"

);



}









export function getLargeImage(

path

){



return getImageUrl(

path,

"w780"

);



}









export function getOriginalImage(

path

){



return getImageUrl(

path,

"original"

);



}









// ==========================
// AVATAR HELPER
// ==========================


export function getAvatar(

user

){



if(

user?.avatar

){


return user.avatar;


}



return DEFAULT_IMAGES.profile;



}









// ==========================
// IMAGE ERROR FALLBACK
// ==========================


export function handleImageError(

event,

fallback=DEFAULT_IMAGES.poster

){



event.target.src = fallback;



}









// ==========================
// LAZY LOAD CONFIG
// ==========================


export function lazyImage(){

return {


loading:

"lazy",


decoding:

"async"


};


}