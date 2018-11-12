class Products {
  constructor() {

  }

  get_all_products(){

    let productsTable = document.getElementById('product_details')

    // url for endpoint
    let url = "http://127.0.0.1:5000/api/v2/products"

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

          let products = data.products;
          return products.map(function(product){
            productsTable.innerHTML +=`
            <tr>

            <td>${products.indexOf(product)+1}</td>
            <td>${product.product_name}</td>
            <td>${product.product_id}</td>
            <td>${product.description}</td>
            <td>${product.price}</td>
            <td>${product.stock}</td>
            <td>${product.min_stock}</td>
            <td>${product.category}</td>
            </tr>`;
          });

        });
  }

}

product = new Products()
window.onload = product.get_all_products();
