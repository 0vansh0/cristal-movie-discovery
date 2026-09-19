import api from "./api";





// ==========================
// AUTHENTICATION
// ==========================





export async function registerUser(data){
	const requestData = new FormData();

	Object.entries(data).forEach(([key, value]) => {
		if (value !== undefined && value !== null && value !== "") {
			requestData.append(key, value);
		}
	});

	const response = await api.post("/auth/register", requestData);



return response.data;

}









export async function loginUser(data){



const response =

await api.post(

"/auth/login",

data

);



return response.data;

}









export async function logoutUser(){



const response =

await api.post(

"/auth/logout"

);



return response.data;

}









// ==========================
// PROFILE
// ==========================





export async function getProfile(){



const response =

await api.get(

"/users/profile"

);



return response.data;

}









export async function updateProfile(data){



const response =

await api.put(

"/users/profile",

data

);



return response.data;

}









export async function uploadAvatar(file){



const formData =

new FormData();



formData.append(

"avatar",

file

);









const response =

await api.post(

"/users/avatar",

formData,

{


headers:{


"Content-Type":

"multipart/form-data"


}


}

);



return response.data;

}









// ==========================
// PASSWORD
// ==========================





export async function changePassword(data){



const response =

await api.put(

"/users/change-password",

data

);



return response.data;

}









export async function forgotPassword(email){



const response =

await api.post(

"/auth/forgot-password",

{


email

}

);



return response.data;

}









export async function resetPassword(

token,

password

){



const response =

await api.post(

`/auth/reset-password/${token}`,

{


password

}

);



return response.data;

}









// ==========================
// ACCOUNT SETTINGS
// ==========================





export async function deleteAccount(){



const response =

await api.delete(

"/users/account"

);



return response.data;

}









export async function updatePreferences(data){



const response =

await api.put(

"/users/preferences",

data

);



return response.data;

}









export async function getUserStats(){



const response =

await api.get(

"/users/stats"

);



return response.data;

}