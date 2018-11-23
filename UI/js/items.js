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
          let button = document.createElement('button')
          return products.map(function(product){
            productsTable.innerHTML +=`
            <tr>

            <td>${products.indexOf(product)+1}</td>
            <td>${product.product_name}</td>
            <td>${product.product_id}</td>
            <td>${product.description}</td>
            <td>${product.price}</td>
            <td>${product.stock}</td>
            <td>${product.min_stock}</td*kj4 k>
            <td>${product.category}</td>
            </tr>`;


          });

        });
  }

  search_product(){

      let productsTable = document.getElementById('product_details')

      let product_name = document.getElementById('product_name').value
      // url for endpoint
      let url = "http://127.0.0.1:5000/api/v2/products/"+product_name

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



            if(data.message === "product found"){

              let products = data.product;
              productsTable.innerHTML = ""
              return products.map(function(product){
                productsTable.innerHTML +=`
                <tr>

                <td>${products.indexOf(product)+1}</td>
                <td>${product.product_name}</td>
                <td>${product.product_id}</td>
                <td>${product.description}</td>
                <td>${product.price}</td>
                <td>${product.stock}</td>
                <td>${product.min_stock}</td*kj4 k>
                <td>${product.category}</td>
                </tr>`;


              });

            }
            else {
              document.getElementById("erroMessage").innerHTML = data.message;
            }
          });

  }

}

product = new Products()
window.onload = product.get_all_products();

let search_product = document.getElementById('search_product')

search_product.addEventListener('click', function getTarget(e){
  e.preventDefault();
  product1 = new Products()
  product.search_product()
});
