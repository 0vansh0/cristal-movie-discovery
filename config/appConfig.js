
// ==========================
// APPLICATION INFORMATION
// ==========================


export const APP_CONFIG = {


name:

"CRISTAL",


fullName:

"CRISTAL - Ultimate Movie Experience",


version:

"1.0.0",


description:

"Discover, track and manage your favorite movies and TV shows.",


author:

"Vansh Raj",


year:

2026



};









// ==========================
// ENVIRONMENT
// ==========================


export const ENV_CONFIG = {


mode:

import.meta.env.MODE || "development",


isDevelopment:

import.meta.env.MODE === "development",


isProduction:

import.meta.env.MODE === "production"



};









// ==========================
// FEATURE FLAGS
// ==========================


export const FEATURES = {


enableReviews:

true,


enableRatings:

true,


enableWatchHistory:

true,


enableFavorites:

true,


enableWatchlist:

true,


enableSocialSharing:

true,


enableNotifications:

true,


enableAIRecommendations:

true



};









// ==========================
// DEFAULT SETTINGS
// ==========================


export const DEFAULT_SETTINGS = {


theme:

"dark",


language:

"en",


region:

"US",


autoplayTrailer:

true,


showAdultContent:

false,


notifications:

true



};









// ==========================
// PAGINATION SETTINGS
// ==========================


export const PAGINATION_CONFIG = {


moviesPerPage:

20,


reviewsPerPage:

10,


searchResultsPerPage:

20



};









// ==========================
// SOCIAL LINKS
// ==========================


export const SOCIAL_LINKS = {


github:

"https://github.com/",


twitter:

"https://twitter.com/",


instagram:

"https://instagram.com/",


linkedin:

"https://linkedin.com/"



};









// ==========================
// CONTACT INFORMATION
// ==========================


export const CONTACT = {


email:

"support@cristal.com",


website:

"https://cristal.app"



};









// ==========================
// LOCALIZATION
// ==========================


export const LANGUAGE_CONFIG = {


default:

"en",


supported:[

"en",

"hi"

]



};









// ==========================
// APP LIMITS
// ==========================


export const LIMITS = {


maxFavorites:

500,


maxWatchlist:

500,


maxLists:

50,


maxReviews:

1000



};









// ==========================
// SECURITY SETTINGS
// ==========================


export const SECURITY = {


sessionTimeout:

7 * 24 * 60 * 60 * 1000,


maxLoginAttempts:

5



};









// ==========================
// COMPLETE CONFIG
// ==========================


export default {


APP_CONFIG,


ENV_CONFIG,


FEATURES,


DEFAULT_SETTINGS,


PAGINATION_CONFIG,


SOCIAL_LINKS,


CONTACT,


LANGUAGE_CONFIG,


LIMITS,


SECURITY


};