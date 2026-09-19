import re
from pathlib import Path

root = Path(r'C:\Users\Vansh Raj\OneDrive\Desktop\react\mango\CRISTAL')

def patch_file(path, pattern, repl, flags=0):
    text = path.read_text(encoding='utf-8')
    new_text, count = re.subn(pattern, repl, text, flags=flags)
    if count == 0:
        raise SystemExit(f'Pattern not found in {path}: {pattern}')
    path.write_text(new_text, encoding='utf-8')
    return count

# AuthContext patch
path = root / 'src' / 'context' / 'AuthContext.jsx'
patch_file(
    path,
    r'async function login\(\nemail,\npassword\n\)\{.*?return response;\n\n\nusername:.*?return fakeUser;\n\n\n\n\}',
    '''async function login(
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
''',
    flags=re.S
)
patch_file(
    path,
    r'async function register\(\ndata\n\)\{.*?return newUser;\n',
    '''async function register(
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
''',
    flags=re.S
)

# RegisterPage patch
path2 = root / 'src' / 'pages' / 'RegisterPage.jsx'
patch_file(
    path2,
    r'async function handleSubmit\(e\)\{.*?setLoading\(false\);\n\n\}',
    '''async function handleSubmit(e){


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
''',
    flags=re.S
)

print('patched')
