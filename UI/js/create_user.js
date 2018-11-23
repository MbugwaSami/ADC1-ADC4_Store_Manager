class Users {

  constructor(email, names, role, password) {
    this.email = email,
    this.names = names,
    this.role = role,
    this.password = password


  }

  add_user(){

    const token = localStorage.getItem('token');
    const access_token = "Bearer " + token
    if (token === null){
      window.location.href = '../index.html';
    }
        // url for endpoint
        let url = "http://127.0.0.1:5000/api/v2/users"

        // get sign up data from ui
        let data = {
          email : this.email,
          names : this.names,
          role : this.role,
          password : this.password
        };


        // define data to be used in options section
        let fetchData = {
          method: 'POST',
          headers: {
            "Content-Type" : "application/json",
            "Authorization" : access_token
          },
          body:JSON.stringify(data)

        };


        fetch(url, fetchData)
        .then(function(response) {return response.json()})
        .then(function(response){

          if (response.message === "User account succesfuly created"){
            document.getElementById("erroMessage").innerHTML = response.message;
            window.alert("User account created, redirecting to all users page")
            window.location.href = 'users.html';
          }

          else {
            document.getElementById("erroMessage").innerHTML = response.message;

          }

        });

  }
}

let create_user = document.getElementById('create_user');
create_user.addEventListener('click', function getTarget(e){
  e.preventDefault();
  email = document.getElementById('signup_email').value
  names = document.getElementById('names').value
  role = document.getElementById('role').value
  password = document.getElementById('signup_password').value
  user = new Users(email, names, role, password);
  user.add_user()

});
