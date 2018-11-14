class Users {
  constructor() {

  }

  get_all_users(){

    let usersTable = document.getElementById('users_details')

    // url for endpoint
    let url = "https://adc3-store-manager-api.herokuapp.com/api/v2/users"

    const token = localStorage.getItem('token');
    const access_token = "Bearer " + token

    // define data to be used in options section
    let fetchData = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : access_token
      }
    };

        fetch(url, fetchData)
        .then(function(response){return response.json()})
        .then(function(data){

          let users = data.users;
          return users.map(function(user){

            if (user.role == "admin"){
              var status = "Revoke Admin";
            }
            else{
              var status = "Make Admin";
            }
            usersTable.innerHTML +=`
            <tr>

            <td>${users.indexOf(user)+1}</td>
            <td>${user.names}</td>
            <td>${user.user_id}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td><a href = "#">${status}</a></td>

            </tr>`;
          });

        });
  }

}

user = new Users()
window.onload = user.get_all_users();
