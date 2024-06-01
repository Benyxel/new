document.addEventListener('DOMContentLoaded', (event) => {
  const mobileMenuIcon = document.getElementById('bar');
  const closeIcon = document.getElementById('close');
  const navbar = document.getElementById('navbar');
  const cartIcon = document.getElementById('lg-bag');

  mobileMenuIcon.addEventListener('click', () => {
    navbar.classList.toggle('active');
    cartIcon.style.display = navbar.classList.contains('active') ? 'none' : 'block';
    if (navbar.classList.contains('active')) {
      mobileMenuIcon.style.display = 'none';
      closeIcon.style.display = 'block';
    } else {
      mobileMenuIcon.style.display = 'block';
      closeIcon.style.display = 'none';
    }
  });

  closeIcon.addEventListener('click', () => {
    navbar.classList.remove('active');
    mobileMenuIcon.style.display = 'block';
    closeIcon.style.display = 'none';
    cartIcon.style.display = 'block'; // Show cart icon when closing navbar
  });
});



// cart pop up code


document.addEventListener("DOMContentLoaded", function() {
  // Select all elements with the class 'cart'
  const cartButtons = document.querySelectorAll('.cart');
  // Get the modal element
  const modal = document.getElementById("customModal");
  // Get the <span> element that closes the modal
  const span = document.getElementsByClassName("close")[0];

  // Loop through each button and add an event listener
  cartButtons.forEach(button => {
      button.addEventListener('click', function(event) {
          // Prevent the default action (navigation)
          event.preventDefault();

          // Get the product element (parent of the button)
          const product = button.closest('.pro');
          
          // Extract product details
          const productImage = product.querySelector('img').src;
          const productBrand = product.querySelector('span').innerText;
          const productName = product.querySelector('h5').innerText;
          const productPrice = product.querySelector('h4').innerText;

          // Create a product object
          const productDetails = {
              image: productImage,
              brand: productBrand,
              name: productName,
              price: productPrice
          };

          // Get the existing cart from local storage
          let cart = JSON.parse(localStorage.getItem('cart')) || [];

          // Add the new product to the cart
          cart.push(productDetails);

          // Save the updated cart back to local storage
          localStorage.setItem('cart', JSON.stringify(cart));

          // Display the modal
          modal.style.display = "block";
      });
  });

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
      modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }
});

// cart page Operation

document.addEventListener('DOMContentLoaded', () => {
  // Select all the necessary DOM elements
  const cartTable = document.querySelector('#cart table tbody');
  const cartTotal = document.querySelector('#cart-total table');

  // Function to update subtotal for a product row
  const updateSubtotal = (row) => {
    const price = parseFloat(row.querySelector('td:nth-child(4)').innerText.replace('$', ''));
    const quantity = parseInt(row.querySelector('input[type="number"]').value);
    const subtotal = row.querySelector('td:nth-child(6)');
    subtotal.innerText = `$${(price * quantity).toFixed(2)}`;
  };

  // Function to update the total values in the cart
  const updateCartTotals = () => {
    let subtotal = 0;
    cartTable.querySelectorAll('tr').forEach(row => {
      const rowSubtotal = parseFloat(row.querySelector('td:nth-child(6)').innerText.replace('$', ''));
      subtotal += rowSubtotal;
    });
    
    const shipping = 10.00;  // Fixed shipping cost
    const total = subtotal + shipping;

    cartTotal.querySelector('tr:nth-child(1) td:nth-child(2)').innerText = `$${subtotal.toFixed(2)}`;
    cartTotal.querySelector('tr:nth-child(2) td:nth-child(2)').innerText = `$${shipping.toFixed(2)}`;
    cartTotal.querySelector('tr:nth-child(3) td:nth-child(2)').innerText = `$${total.toFixed(2)}`;
  };

  // Event listener for changing quantity
  cartTable.addEventListener('input', (event) => {
    if (event.target.type === 'number') {
      const row = event.target.closest('tr');
      updateSubtotal(row);
      updateCartTotals();
    }
  });

  // Event listener for removing items
  cartTable.addEventListener('click', (event) => {
    if (event.target.closest('.bxs-trash')) {
      const row = event.target.closest('tr');
      row.remove();
      updateCartTotals();
    }
  });

  // Initial calculation of cart totals
  cartTable.querySelectorAll('tr').forEach(row => updateSubtotal(row));
  updateCartTotals();
});