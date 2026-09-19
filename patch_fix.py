import re
from pathlib import Path

root = Path(r'C:\Users\Vansh Raj\OneDrive\Desktop\react\mango\CRISTAL')

# Patch AuthContext
path = root / 'src' / 'context' / 'AuthContext.jsx'
text = path.read_text(encoding='utf-8')
old = re.compile(r"async function login\(\nemail,\npassword\n\)\{\n\n\nconst response = await loginUser\(\{ email, password \}\);\n\nconst token =\n  response\?\.token \|\|\n  response\?\.accessToken \|\|\n  response\?\.data\?\.token \|\|\n  response\?\.data\?\.accessToken;\n\nconst userData =\n  response\?\.user \|\|\n  response\?\.data\?\.user \|\|\n  response\?\.data \|\|\n  response;\n\nif\(token\)\{\n  localStorage\.setItem\("token", token\);\n\}\n\nif\(userData\)\{\n  setUser\(userData\);\n  localStorage\.setItem\("cristal-user", JSON\.stringify\(userData\)\);\n\}\n\nreturn response;\n\n\nusername:\nemail\.split\("@"\)\[0\],\n\n\nemail,\n\n\navatar:\n"https://i\.pravatar\.cc/300\?img=12"\n\n\n\};\n\n\n\nsetUser\(fakeUser\);\n\n\nlocalStorage\.setItem\(\n\n"cristal-user",\n\nJSON\.stringify\(fakeUser\)\n\n\);\n\n\nreturn fakeUser;\n",
    re.DOTALL)
new = """async function login(
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
"""
text2 = old.sub(new, text)
if text2 == text:
    raise SystemExit('AuthContext replacement failed')
path.write_text(text2, encoding='utf-8')

# Patch register
path2 = root / 'src' / 'pages' / 'RegisterPage.jsx'
text3 = path2.read_text(encoding='utf-8')
old2 = re.compile(r"async function handleSubmit\(e\)\{\n\n\ne\.preventDefault\(\);\n\n\nif\(\nform\.password !==\nform\.confirmPassword\n\)\{\n\nalert\(\n\"Passwords do not match\"\n\);\n\nreturn;\n\n\}\n\n\n\ntry\{\n\n\nsetLoading\(true\);\n\n\n// API / Firebase registration here\n\n\nconsole\.log\(form\);\n\n\nsetTimeout\(\(\)\=\>\{\n\n\nnavigate\(\"/login\"\);\n\n\n\},1000\);\n\n\n\}\n\nfinally\{\n\n\nsetLoading\(false\);\n\n\n\}\n", re.DOTALL)
new2 = """async function handleSubmit(e){


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
"""
text4 = old2.sub(new2, text3)
if text4 == text3:
    raise SystemExit('RegisterPage replacement failed')
path2.write_text(text4, encoding='utf-8')

print('patched')
"