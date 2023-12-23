'use strict';

const addButtons = document.querySelectorAll('.add-to-order');
const cardTotalDiv = document.querySelector("cart-total");

for (const button of addButtons) {
  button.addEventListener('click', () => 
  {
    const item = button.id;
    let cart = {};
    let orderTotal = 0;
    fetch(`/update-cart.json?item=${item}`)
      .then((response) => response.json())
      .then((result) => {
        cart = result.cart;
        orderTotal = result.total;
        displayCart(cart);
        cartTotalDiv.innerHTML = `${orderTotal.toFixed(2)}`;
    })
  })
}

// Display the shopping cart items in the right-hand column of the page.
function displayCart(cart) {
  let tableContents = " ";
  for (const item in cart) {
      tableContents += `<tr><td>${item}</td><td>${cart[item]}</td></tr>`;
    }
  

  // Object.entries is like Python's dict.items --- it's a nice way to
  // loop over keys and values. Here's how this would look in Python:
  //
  //   for item, price in cart_contents.items():
  //       # etc.
  // for (const [item, price] of Object.entries(cartContents)) {
  //   tableContents += `<tr><td>${item}</td><td>${price}</td></tr>`;
  // }

  document.querySelector('#cart-items').innerHTML = tableContents;
}

// Display the order total using a dollar sign and two decimal places.
// function displayOrderTotal(total) {
//   document.querySelector('#cart-total').innerHTML = `${total.toFixed(2)}`;
// }
