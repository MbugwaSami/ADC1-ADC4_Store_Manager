class  ViewSales {
  constructor() {

  }

  get_user_sales(){

    let salesTable = document.getElementById('sales_details')

    let user_id = localStorage.getItem('user_id')
    // url for endpoint
    let url = "http://127.0.0.1:5000/api/v2/sales/"+user_id

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

}

sales = new ViewSales()
window.onload = sales.get_user_sales();
