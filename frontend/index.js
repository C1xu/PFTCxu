const axios = require('axios').default;

import { Axios } from "axios";

document.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Submit button clicked");
    submitLoginInfo();
});

function submitLoginInfo(){
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const url = "http://localhost:3001/login?email=" + email + "&password=" + password;

    const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    };

    const response = await axios.post(url, headers);
    console.log(response);
}

