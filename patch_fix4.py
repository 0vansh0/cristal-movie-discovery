from pathlib import Path

root = Path(r'C:\Users\Vansh Raj\OneDrive\Desktop\react\mango\CRISTAL')

def replace_between(path, start_marker, end_marker, replacement):
    text = path.read_text(encoding='utf-8')
    start = text.find(start_marker)
    if start == -1:
        raise SystemExit(f'start marker not found in {path}: {start_marker}')
    end = text.find(end_marker, start)
    if end == -1:
        raise SystemExit(f'end marker not found in {path}: {end_marker}')
    # include end marker only if replacement should keep it outside
    new_text = text[:start] + replacement + text[end:]
    path.write_text(new_text, encoding='utf-8')

# Patch AuthContext login function
path = root / 'src' / 'context' / 'AuthContext.jsx'
start = 'async function login('\n'email,\npassword\n){\n\n\n'
# We'll use a simpler pattern based on marker strings from file
start_marker = 'async function login(\nemail,\npassword\n){\n\n\n'
# Actually use literal substring to avoid python escaping issues
start_marker = 'async function login(\nemail,\npassword\n){\n\n\n'

# Let's just manually build via exact content observed
old_start = 'async function login(\nemail,\npassword\n){\n\n\n'

# Use direct string of function header and replacement until next comment
text = path.read_text(encoding='utf-8')
start_idx = text.find('async function login(\nemail,\npassword\n){\n\n\n')
if start_idx == -1:
    raise SystemExit('Could not find login function header')
end_idx = text.find('// =========================\n// REGISTER', start_idx)
if end_idx == -1:
    raise SystemExit('Could not find login end marker')
end_idx = end_idx
replacement = '''async function login(
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
new_text = text[:start_idx] + replacement + text[end_idx:]
path.write_text(new_text, encoding='utf-8')

# Patch AuthContext register function
text = path.read_text(encoding='utf-8')
start_idx = text.find('async function register(\ndata\n){\n\n\n')
if start_idx == -1:
    raise SystemExit('Could not find register function header')
end_idx = text.find('// =========================\n// LOGOUT', start_idx)
if end_idx == -1:
    raise SystemExit('Could not find register end marker')
replacement = '''async function register(
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


// =========================
// LOGOUT'''
new_text = text[:start_idx] + replacement + text[end_idx:]
path.write_text(new_text, encoding='utf-8')

# Patch RegisterPage handleSubmit
path2 = root / 'src' / 'pages' / 'RegisterPage.jsx'
text = path2.read_text(encoding='utf-8')
start_idx = text.find('async function handleSubmit(e){\n\n\ne.preventDefault();')
if start_idx == -1:
    raise SystemExit('Could not find handleSubmit function header')
end_idx = text.find('}\n\n\n\n\nreturn (', start_idx)
if end_idx == -1:
    raise SystemExit('Could not find handleSubmit end marker')
replacement = '''async function handleSubmit(e){


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


return ('''
new_text = text[:start_idx] + replacement + text[end_idx:]
path2.write_text(new_text, encoding='utf-8')
print('patched')
