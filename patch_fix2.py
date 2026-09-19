from pathlib import Path

root = Path(r'C:\Users\Vansh Raj\OneDrive\Desktop\react\mango\CRISTAL')

def patch_file(path, old, new):
    text = path.read_text(encoding='utf-8')
    if old not in text:
        raise SystemExit(f'Old text not found in {path}')
    path.write_text(text.replace(old, new), encoding='utf-8')

# Patch AuthContext
path = root / 'src' / 'context' / 'AuthContext.jsx'
old_auth = '''
// =========================
// LOGIN
// =========================


async function login(
email,
password
){


const response = await loginUser({ email, password });

const token =
  response?.token ||
  response?.accessToken ||
  response?.data?.token ||
  response?.data?.accessToken;

const userData =
  response?.user ||
  response?.data?.user ||
  response?.data ||
  response;

if(token){
  localStorage.setItem("token", token);
}

if(userData){
  setUser(userData);
  localStorage.setItem("cristal-user", JSON.stringify(userData));
}

return response;


username:
email.split("@")[0],


email,


avatar:
"https://i.pravatar.cc/300?img=12"


};


setUser(fakeUser);


localStorage.setItem(

"cristal-user",

JSON.stringify(fakeUser)

);


return fakeUser;
'''
new_auth = '''
// =========================
// LOGIN
// =========================


async function login(
email,
password
){


const response = await loginUser({ email, password });

const token =
  response?.token ||
  response?.accessToken ||
  response?.data?.token ||
  response?.data?.accessToken;

const userData =
  response?.user ||
  response?.data?.user ||
  response?.data ||
  response;

if(token){
  localStorage.setItem("token", token);
}

if(userData){
  setUser(userData);
  localStorage.setItem("cristal-user", JSON.stringify(userData));
}

return response;
}


// =========================
// REGISTER'''
patch_file(path, old_auth, new_auth)

old_register = '''
async function register(
data
){


const newUser = {


id:Date.now(),


username:
data.username,


email:
data.email,


college:
data.college,


avatar:
data.avatar ||

"https://i.pravatar.cc/300"


};



setUser(newUser);


localStorage.setItem(

"cristal-user",

JSON.stringify(newUser)

);


return newUser;
'''
new_register = '''
async function register(
data
){


const response = await registerUser(data);

const token =
  response?.token ||
  response?.accessToken ||
  response?.data?.token ||
  response?.data?.accessToken;

const userData =
  response?.user ||
  response?.data?.user ||
  response?.data ||
  response;

if(token){
  localStorage.setItem("token", token);
}

if(userData){
  setUser(userData);
  localStorage.setItem("cristal-user", JSON.stringify(userData));
}

return response;
'''
patch_file(path, old_register, new_register)

# Patch RegisterPage
path2 = root / 'src' / 'pages' / 'RegisterPage.jsx'
old_submit = '''
async function handleSubmit(e){


e.preventDefault();


if(
form.password !==
form.confirmPassword
){

alert(
"Passwords do not match"
);

return;

}



try{


setLoading(true);


// API / Firebase registration here


console.log(form);


setTimeout(()=>{


navigate("/login");


},1000);


}

finally{


setLoading(false);


}
'''
new_submit = '''
async function handleSubmit(e){


e.preventDefault();


if(
form.password !==
form.confirmPassword
){

alert(
"Passwords do not match"
);

return;

}



try{


setLoading(true);


await registerUser({
  username: form.username,
  email: form.email,
  password: form.password,
  college: form.college,
});


navigate("/login");


}

catch(err){


alert(
  err.response?.data?.message ||
  err.message ||
  "Registration failed"
);


}

finally{


setLoading(false);


}
'''
patch_file(path2, old_submit, new_submit)

print('patched')
