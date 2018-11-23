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
         if(data.message === "These are the items on your Cart"){
           document.getElementById("erroMessage").innerHTML ="";
           cartTable.innerHTML = "";
           document.getElementById("total").value =data.total;
           document.getElementById("product_count").value =data.product_count;
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

  // method to post a sale
      make_sale(){

            // url for endpoint
            let url = "http://127.0.0.1:5000/api/v2/sales"

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

            };


            fetch(url, fetchData)
            .then(function(response) {return response.json()})
            .then(function(response){
            if (response.message === "your sale was succesful"){
              document.getElementById("erroMessage").innerHTML = response.message;
              document.getElementById('cart_details').innerHTML = ""
              document.getElementById("total").value ="0.0";
              document.getElementById("product_count").value =0;
            }
            else {
              document.getElementById("erroMessage").innerHTML = response.message;
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
