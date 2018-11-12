class Login {

  constructor(email,  password) {
    this.email = email,
    this.password = password


  }


  // this function is called when the litsener responds to login submit event
  login(){


    // url for endpoint
    let url = "http://127.0.0.1:5000/api/v2/users/login"

    // get login data from ui
    let data = {
      email : this.email,
      password : this.password
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

    });
  }
}



let login = document.getElementById('login');
login.addEventListener('submit', function getTarget(e){
  e.preventDefault();
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  auth = new Login(email, password);
  auth.login();
});
