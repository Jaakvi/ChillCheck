document.addEventListener("DOMContentLoaded", function () {
    
    const savedOption = localStorage.getItem("selectedOption");
  if (savedOption) {
    // If a selected value exists, update the value of the first input field
    document.querySelector(".dialog--input").value = savedOption;
  }

  const createUser = document.querySelector(".button__login");

  createUser.addEventListener("click", async (evt) => {
    evt.preventDefault();
    console.log("Nyt luodaan käyttäjä");
    const url = "http://127.0.0.1:3000/api/users";

    // # Create user
    // POST 
    // content-type: application/json

    const form = document.querySelector(".login__form");

    if (!form.checkValidity()) {
      // If the form is not valid, show the validation messages
      form.reportValidity();
      return; // Exit function if form is not valid
    }



    const body = {
      
      username: form.querySelector("input[name=username]").value,
      Firstname:form.querySelector("input[name=firstname]").value,
      Lastname:form.querySelector("input[name=lastname]").value,
      password: form.querySelector("input[name=password]").value,
      email: form.querySelector("input[name=email]").value,
    };

    const options = {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body), // body data type must match "Content-Type" header
    };

    fetchData(url, options).then((data) => {
      // käsitellään fetchData funktiosta tullut JSON
      console.log(data);
      alert("Rekistöröinti onnistui");
    });
  });
});
