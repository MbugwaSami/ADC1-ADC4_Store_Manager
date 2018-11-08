// add an EventListener that waits for a click on submit button
document.getElementById('login').addEventListener('submit', login)

// this function is called when the litsener responds to submit eve
function login(event){

  //prevent defaul behaviour
  event.preventDefault();

  // url for endpoint
  let url = "https://adc3-store-manager-api.herokuapp.com/api/v2/users/login"

  // get login data from ui
  let data = {
    email : document.getElementById('email').value,
    password : document.getElementById('password').value
  };

  // define data to be used in options section
  let fetchData = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body:JSON.stringify(data)

  };

  // use the fetch api
  fetch(url,fetchData)
  .then(function(response){return response.json()})
  .then(function(response){

    // store data fore use after login
    localStorage.setItem('token',response.token);
    localStorage.setItem('role',response.role);
    localStorage.setItem('names',response.names);

    // login the user
    if(response.message === "wellcome "+response.names +", "+"you are loged in as "+response.role){

       // login admin
      if(response.role == "admin"){
        window.location.href = 'UI/Admin/admin.html';
      }

      // login store attendant
      else{
        window.location.href = 'UI/Attendant.html';
      }
    }

    // respond to wrong cridentials
    else {
      document.getElementById("erroMessage").innerHTML = response.message;
    }

  })
}
