let detailsButton = (document.createElement("button").value = "More Details!");
let itemQuantity = {};
let products = [];
let txtEmail = document.getElementById("email");
let txtPassword = document.getElementById("password");
let btnSignUp = document.getElementById("btnSignUp");
btnSignUp.onclick = signUp;

class User {
  constructor(email, password, cartId) {
    this.email = email;
    this.password = password;
    this.cartId = cartId;
  }
}

//onload fetch products and then run Products function
//if there is anything in localStorage then don't display login div
window.onload = function() {
  fetch("https://acastore.herokuapp.com/products")
    .then(response => response.json())

    .then(myJson => (products = myJson))

    .then(products => {
      Products(products);

      let storage = localStorage.getItem("user");
      let signUpDiv = document.getElementById("signup");
      if (storage) {
        signUpDiv.style.display = "none";
      }
    });
};

//assigns input value from email and password to new user saved on heroku server
function signUp() {
  console.log(new User(txtEmail.value, txtPassword.value, null));
  let newUser = new User(txtEmail.value, txtPassword.value, null);
  localStorage.setItem("user", JSON.stringify(newUser));

  fetch("https://acastore.herokuapp.com/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newUser)
  }).then(response => {
    // response.then(data => {
    //   console.log(data);
    // });
    console.log("response: ", response.json());
  });
}

function createCart(userID) {
  let newCart = {
    userID: userID,
    products: []
  };

  fetch("https://acastore.herokuapp.com/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newCart)
  }).then(response => response.json());
}

//put products in html
//map through products
function Products(products) {
  document.getElementById("products").innerHTML = products
    .map((product, index) => {
      let amount = sessionStorage.getItem(product.id);
      if (amount) {
        addToCart(product.id, amount);
      }
      itemQuantity[product.id] = 0;

      return `<div class="productList">
     
     <p>${product.name}</p>
     <img src="${product.imgUrl}" alt="image of ${product.name}">
     <p>${product.description}</p>

     <button id="moreDetailsButton" onclick = "moreDetails(${
       product.id
     })">${detailsButton}</button>
     <br>
     <select id=select-${index} onchange="getValue(${index})">
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
     <button onclick="addToCartAndStore(${product.id})">Add to Cart</button>
     
                </div>
                <hr>`;
    })
    .join(" ");
}

//*************Search Function ********/
function Search() {
  //takes in user input
  let input = document.getElementById("searchBox");
  let filter = input.value;
  let foundProdArr = [];
  products.map((item, index) => {
    //splits up each word in item name and put into an array

    let nameArray = item.name.toLowerCase().split(" ");
    nameArray.filter(name => {
      //if the name matches user input then push into array
      if (name == filter) {
        foundProdArr.push(item);
      }
    });
  });
  //origianl function run displays new array of found products
  return Products(foundProdArr);
}

//**********Show more Details of Specific Product********/
function moreDetails(prodId) {
  let foundProduct = products.find(p => p.id === prodId);

  document.getElementById(
    "productDetail"
  ).innerHTML = `<div id="moreDetailsCard">
    <p>${foundProduct.name}</p>
     <p> Ratings: ${foundProduct.rating}/5</p>
     <img src="${foundProduct.imgUrl}" alt="image of ${foundProduct.name}">
     <p> Product ID: ${foundProduct.id}</p>
     <p>${foundProduct.description}</p>
     <hr></hr>
     </div>`;
}

/************Call both AddToCart and Store Functions ****************/
function addToCartAndStore(id) {
  //if item in storage already dont add again
  let amount = sessionStorage.getItem(id);
  if (amount) {
    changeQuantity(id);
  } else {
    addToCart(id);
  }
  Storage(id);
}

//***************Session Storage*************/
function Storage(id) {
  sessionStorage.setItem(id, itemQuantity[id]);
}

//*********************Add to Cart *************/
function addToCart(id, quantity = itemQuantity[id]) {
  let cartItemsL = document.getElementById("cartitems");
  let productId = products.find(function(product) {
    return product.id == id;
  });
  let cartItems =
    cartItemsL.innerHTML +
    `<li id="cart-item-${productId.id}">${productId.name}: ${
      productId.price
    } (<span class="quantity">${quantity}</span>)
    </li>`;

  document.getElementById("cartitems").innerHTML = cartItems;
}
function changeQuantity(productId, quantity) {
  let quantityElement = document.querySelector(
    `#cart-item-${productId} .quantity`
  );
  console.log(quantityElement);
  quantityElement.innerHTML = itemQuantity[productId];
}

//quantity function in progress
const getValue = index => {
  console.log(index);
  const selectIndex = document.getElementById(`select-${index}`);
  itemQuantity[index + 1] = Number(selectIndex.value);
  console.log(selectIndex.value);
  return itemQuantity[index + 1];
};

//Fitler products by category
//function called when category is changed via dropdown menu on homepage

function filterCategory(cat) {
  //if all is selected, displays all products
  if (cat.toLowerCase() === "all") {
    Products(products);
  }
  //filters products depending on category selected
  else {
    let filteredProducts = products.filter(
      prod => prod.category === cat.toLowerCase()
    );
    Products(filteredProducts);
  }
}
/**View Cart *******/

function viewCart() {
  var cartItems = document.getElementById("cartitems");
  if (cartItems.style.display === "none") {
    cartItems.style.display = "block";
  } else {
    cartItems.style.display = "none";
  }
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
