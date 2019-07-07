let detailsButton = (document.createElement("button").value = "More Details!");

function Products(products) {
  document.getElementById("products").innerHTML = products.map(
    (product, index) => {
     let amount= sessionStorage.getItem(product.id);
     if(amount){
       addToCart(product.id);
     }

     return `<div class="productList">
     
     <p>${product.name}</p>
     <img src="${product.imgUrl}" alt="image of ${product.name}">
     <p> Product ID: ${product.id}</p>
     <p>${product.description}</p>


     <p><button id="moredetails" onclick = "moreDetails(${product.id})">${detailsButton}</button></p>
     <p><button onclick="addToCartAndStore(${product.id})">Add to Cart</button></p>
     <select id=${product.id -1}>
                    <option value="0">--Quantity--</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
                </div>
                <hr>`;
     
     }
   ).join(' ');
 }

window.onload = Products(products);

function Search() {

  let input = document.getElementById("searchBox");
  let filter = input.value;
  let foundProd = [];
  products.map((item, index) => {
    let nameArray = item.name.split(" ");
    nameArray.filter(name => {
      if (name == filter) {
        foundProd.push(item);
      }
    });
  });
  return Products(foundProd);
}

// function search() {
//   let searchWord = document.getElementById("searchBox").value;
//   let filteredProducts = products.filter(p => p.name === searchWord)

//   Products(filteredProducts);
// }


function moreDetails(prodId) {
  let foundProd = products.find(p => p.id === prodId);

  document.getElementById("productDetail").innerHTML = 
    `<div>${foundProd.name}</div>
     <div> Ratings: ${foundProd.rating}/5</div>`;
}



/******************* Call both AddToCart and Store Functions *********************/
function addToCartAndStore(id){
  //if item in storage already dont add again
  if(sessionStorage.getItem(id)) return;
  addToCart(id);
  Storage(id);
  
}


//***************Session Storage*************/
function Storage(id){
  sessionStorage.setItem(id, 1)
} 



//*********************Add to Cart *************/
function addToCart(id) {
  
  let cartItemsL= document.getElementById('cartitems');
  let productId = products.find(function(product) {
    return product.id == id;
  });
  let cartItems = cartItemsL.innerHTML+ `<li>${productId.name}: ${productId.price}</li>`;

  document.getElementById("cartitems").innerHTML = cartItems;

}

//*************** search function not working**********/

// let newSearchedProducts=[];
// // let moreDetailsButton=document.getElementById('moredetails')

// for (i = 0; i < productText.length; i++) {
//   txtValue = productText[i].textContent
//   if (txtValue.toUpperCase().indexOf(filter) > -1) {
//     newSearchedProducts.push(product)

//   } else {
//     productText[i].style.display = "none";
//     // moreDetailsButton[i].style.display="none";
//   }
// }




