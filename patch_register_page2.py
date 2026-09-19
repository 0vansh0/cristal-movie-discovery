from pathlib import Path

path = Path('src/pages/RegisterPage.jsx')
text = path.read_text(encoding='utf-8')
start = text.find('async function handleSubmit(e){')
if start == -1:
    raise SystemExit('start marker not found')
end = text.find('\n\nreturn (\n\n<main', start)
if end == -1:
    raise SystemExit('end marker not found')
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

}
'''
text = text[:start] + replacement + text[end:]
path.write_text(text, encoding='utf-8')
print('patched handleSubmit')
