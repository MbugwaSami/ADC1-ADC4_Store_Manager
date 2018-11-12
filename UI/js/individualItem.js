class Products {
  constructor(product_name, description, category, price, stock, minStock) {
    this.product_name = product_name;
    this.description = description;
    this.category = category;
    this.price = price;
    this.stock = stock;
    this.minStock = minStock;
  }

  add_product(){

    // url for endpoint
    let url = "http://127.0.0.1:5000/api/v2/products"

    // get sign up data from ui
    let data = {
      product_name : this.product_name,
      description : this.description,
      category : this.category,
      price : this.price,
      stock : this.stock,
      minStock : this.minStock
    };


    // get the access_token
    const token = localStorage.getItem('token');
    const access_token = "Bearer " + token

    if (token === null){
      window.location.href = '../index.html';
    }

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

      if (response.message === "product succesfuly added"){
        document.getElementById("erroMessage").innerHTML = response.message;
        window.alert("Product succesfuly added, redirecting to all products page")
        window.location.href = 'items.html';
      }

      else {
        document.getElementById("erroMessage").innerHTML = response.message;

      }

    });

}

get_one_product(){

  let product_id = document.getElementById('Searchbox').value
  // url for endpoint
  let url = "http://127.0.0.1:5000/api/v2/products/"+product_id

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

        let product = data;
        document.getElementById("product_name").value = product.product_name;
        document.getElementById("description").value = product.description;
        document.getElementById("price").value = product.price;
        document.getElementById("stock").value = product.stock;
        document.getElementById("minStock").value = product.min_stock;
        document.getElementById("category").value = product.category;
        console.log(product.min_stock)
      });
}

get_one_product(){

  let product_id = document.getElementById('Searchbox').value
  // url for endpoint
  let url = "http://127.0.0.1:5000/api/v2/products/"+product_id

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

        let product = data;
        document.getElementById("product_name").value = product.product_name;
        document.getElementById("description").value = product.description;
        document.getElementById("price").value = product.price;
        document.getElementById("stock").value = product.stock;
        document.getElementById("minStock").value = product.min_stock;
        document.getElementById("category").value = product.category;
        console.log(product.min_stock)
      });
}

  }

  let add_product = document.getElementById('add_product');
  add_product.addEventListener('click', function getTarget(e){
    e.preventDefault();
    let product_name = document.getElementById('product_name').value;
    let description = document.getElementById('description').value;
    let category = document.getElementById('category').value;
    let price = document.getElementById('price').value;
    let stock = document.getElementById('stock').value;
    let minStock = document.getElementById('minStock').value;
    product = new Products(product_name, description, category, price, stock, minStock);
    product.add_product();
  });

  let search_product = document.getElementById('search_product');
  search_product.addEventListener('click', function getTarget(e){
    e.preventDefault();
    product = new Products();
    product.get_one_product();
  });
