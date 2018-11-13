class  ViewSales {
  constructor(user_id) {
       this.user_id = user_id
  }

  get_user_sales(){

    let salesTable = document.getElementById('sales_details')

    let user_id = localStorage.getItem('user_id')
    // url for endpoint
    let url = "http://127.0.0.1:5000/api/v2/sales/"+this.user_id

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

          let sales = data.sales;

          return sales.map(function(sale){
            salesTable.innerHTML +=`
            <tr>

            <td>${sales.indexOf(sale)+1}</td>
            <td>${sale.product_name}</td>
            <td>${sale.quantity}</td>
            <td>${sale.subtotal}</td>

            </tr>`;
          });

        });
  }

  get_all_user_sales(){

    let salesTable = document.getElementById('sales_details')

    // url for endpoint
    let url = "http://127.0.0.1:5000/api/v2/sales"

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

          let sales = data;
          return sales.map(function(sale){
            salesTable.innerHTML +=`
            <tr>

            <td>${sales.indexOf(sale)+1}</td>
            <td>${sale.product_name}</td>
            <td>${sale.quantity}</td>
            <td>${sale.subtotal}</td>
            <td>${sale.user_id}</td>

            </tr>`;
          });

        });
  }


}

if (localStorage.getItem('role') === "admin"){
  sales = new ViewSales()
  window.onload = sales.get_all_user_sales();
}

else {
  let user_id = localStorage.getItem('user_id')
  sales = new ViewSales(user_id)
  window.onload = sales.get_user_sales();
}

let search_sales = document.getElementById('search_sales');
search_sales.addEventListener('click', function getTarget(e){
  e.preventDefault();
  document.getElementById('sales_details').innerHTML = ""
  let user_id = document.getElementById('search_box').value
  sales = new ViewSales(user_id);
  sales.get_user_sales();
});
