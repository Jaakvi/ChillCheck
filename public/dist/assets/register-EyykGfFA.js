import{f as s}from"./fetch-qug4428q.js";const l=document.querySelector(".createuser");l.addEventListener("click",async r=>{r.preventDefault(),console.log("Nyt luodaan käyttäjä"),console.log(r);const t="https://hyte-server-aura.northeurope.cloudapp.azure.com/api/users",e=document.querySelector(".create_user_form"),a={username:e.querySelector("input[name=username]").value,password:e.querySelector("input[name=password]").value,email:e.querySelector("input[name=email]").value},n={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)};s(t,n).then(o=>{console.log(o),(o=void 0)?alert("Username or email is already in use"):alert("User created"),location.href="index.html"})});
