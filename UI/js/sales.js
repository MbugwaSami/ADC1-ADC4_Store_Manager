class Sales {
  constructor(buyer_cart) {
    buyer_cart = this.buyer_cart
  }

  add_to_cart(){

    let cartTable = document.getElementById('cart_details')

    let product_id = document.getElementById('product_id').value

    let quantity = document.getElementById('quantity').value
    // url for endpoint
    let url = "http://127.0.0.1:5000/api/v2/sales/"+product_id+"/"+quantity

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
         if(data.message === "This are the items on your Cart"){
           document.getElementById("erroMessage").innerHTML ="";
           let sales = data.buyers_cart;
           return sales.map(function(sale){
             cartTable.innerHTML +=`
             <tr>

             <td>${sales.indexOf(sale)+1}</td>
             <td>${sale.product_name}</td>
             <td>${sale.description}</td>
             <td>${sale.quantity}</td>
             <td>${sale.price}</td>
             <td>${sale.subtotal}</td>

             </tr>`;
           });
         }

         else{
           document.getElementById("erroMessage").innerHTML = data.message;
         }


        });
  }



}

let search_product = document.getElementById('search_product');
search_product.addEventListener('click', function getTarget(e){
  e.preventDefault();
  sale = new Sales();
  sale.add_to_cart();
});

let make_sale = document.getElementById('make_sale');
make_sale.addEventListener('click', function getTarget(e){
  e.preventDefault();
  sale = new Sales();
  sale.make_sale();
});
