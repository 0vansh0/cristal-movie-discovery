from pathlib import Path

path = Path('src/pages/RegisterPage.jsx')
text = path.read_text(encoding='utf-8')
start = text.find('// API / Firebase registration here')
if start == -1:
    raise SystemExit('start marker not found')
end = text.find('finally{', start)
if end == -1:
    raise SystemExit('end marker not found')
old = text[start:end]
new = '''// API / Firebase registration here


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

finally{'''
if old == new:
    raise SystemExit('already patched')
path.write_text(text[:start] + new + text[end:], encoding='utf-8')
print('patched')
