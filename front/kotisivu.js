import { fetchData } from "./fetch";
const getResults = document.getElementById("get_result");

  getResults.addEventListener("click", async (evt) => {
    evt.preventDefault();
    console.log("Haetaan tuloksia");

    // # Login
    // POST http://localhost:3000/api/auth/login
    // content-type: application/json

    // {
    //   "username": "user",
    //   "password": "secret"
    //  }

    const url = `http://127.0.0.1:3000/api/kubios/user-data`;
    const token = localStorage.getItem("token");

    const options = {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer: " + token,
      }, // body data type must match "Content-Type" header
    };

    fetchData(url, options).then((data) => {
      // käsitellään fetchData funktiosta tullut JSON
      console.log(data);
      // kannattaa fetch.js palauttaa BE puolen validointi virheen joka käsitellään
    //   if (data.token === undefined) {
    //     alert("Unauth user: Käyttäjänimi tai salasana ei oikein");
    //   } else {
    //     alert("Kirjautuminen onnistui.");
    //     window.location.href = "kotisivu.html";
    //   }
    //   logResponse(
    //     "loginResponse",
    //     `localStorage set with token value: ${data.token}`
    //   );
    });
  });