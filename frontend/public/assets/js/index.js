// document.addEventListener("submit", (e) => {
//     e.preventDefault();
//     console.log("Submit button clicked");
//     submitLoginInfo();
// });

async function submitLoginInfo(){
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const url = "http://localhost:3001/login?email=" + email + "&password=" + password;

    const headers = {
        "Content-Type": "text/html",
        "Access-Control-Allow-Origin": "*",
    };

    const response = await axios.post(url, headers);
    if(response.data.result == "success"){
        console.log("Success " + response.data.name)
    }else{
        console.log("Invalid")
    }
    console.log(response);
}

async function submitRegisterInfo(){
    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const passwordAgain = document.getElementById("passwordAgain").value;
    const url = "http://localhost:3001/register?name=" + name +"&surname="+ surname + "&email="+ email + "&password=" + password;

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    
    const validatePasswordStrength = (password) => {
        return String(password)
        .match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/        
        );       
    };

    const validateName = (name) => {
        return String(name)
        .match(
        /^[a-zA-Z]+$/
        );
    };

    if(validateEmail(email) &&
     passwordAgain === password && 
     name!== "" && validateName(name) &&
     surname!== "" && validateName(surname) &&
     password!== "" && validatePasswordStrength(password)){
        const headers = {
            "Content-Type": "text/html",
            "Access-Control-Allow-Origin": "*",
        };
    
        const response = await axios.post(url, headers);
        if(response.data.result == "success"){
            console.log("Success " + response.data.name)
        }else{
            console.log("Invalid")
        }
        console.log(response);
    }else{
        console.log("Invalid fields");
    }
}

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}