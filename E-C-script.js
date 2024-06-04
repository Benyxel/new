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








document.addEventListener("DOMContentLoaded", function() {
  // Select all elements with the class 'cart'
  const cartButtons = document.querySelectorAll('.cart');
  // Get the modal element
  const modal = document.getElementById("customModal");
  // Get the <span> element that closes the modal
  const span = document.getElementsByClassName("close")[0];
  // Get the cart count element
  const cartCountElement = document.getElementById("cart-count");

  // Function to update cart count
  function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartCountElement.textContent = cart.length;
  }

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

          // Update cart count
          updateCartCount();

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

  // Update cart count on page load
  updateCartCount();
});



document.addEventListener("DOMContentLoaded", function() {
  // Function to retrieve cart items from localStorage
  function getCartItems() {
    return JSON.parse(localStorage.getItem('cart')) || [];
  }

  // Function to update cart items display
  function updateCartDisplay() {
    const cartItems = getCartItems();
    const cartTableBody = document.querySelector("#cart tbody");
    const subtotalElement = document.getElementById("subtotal");
    const totalElement = document.getElementById("total");

    cartTableBody.innerHTML = ""; // Clear existing rows
    let subtotal = 0;

    cartItems.forEach((item, index) => {
      const itemPrice = parseFloat(item.price.replace('$', ''));
      const itemSubtotal = itemPrice * (item.quantity || 1);
      subtotal += itemSubtotal;

      const row = document.createElement('tr');
      row.innerHTML = `
        <td><button class="remove" data-index="${index}">&times;</button></td>
        <td><img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px;"></td>
        <td>${item.name}</td>
        <td>$${itemPrice.toFixed(2)}</td>
        <td><input type="number" value="${item.quantity || 1}" min="1" data-index="${index}" class="quantity"></td>
        <td>$${itemSubtotal.toFixed(2)}</td>
      `;
      cartTableBody.appendChild(row);
    });

    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    totalElement.textContent = `$${subtotal.toFixed(2)}`; // Assuming no additional shipping cost for simplicity

    // Add event listeners to remove buttons
    document.querySelectorAll(".remove").forEach(button => {
      button.addEventListener("click", function() {
        const index = this.getAttribute("data-index");
        removeCartItem(index);
      });
    });

    // Add event listeners to quantity inputs
    document.querySelectorAll(".quantity").forEach(input => {
      input.addEventListener("change", function() {
        const index = this.getAttribute("data-index");
        const quantity = parseInt(this.value);
        updateCartItemQuantity(index, quantity);
      });
    });
  }

  // Function to remove a cart item by index
  function removeCartItem(index) {
    let cartItems = getCartItems();
    cartItems.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateCartDisplay();
  }

  // Function to update cart item quantity
  function updateCartItemQuantity(index, quantity) {
    let cartItems = getCartItems();
    cartItems[index].quantity = quantity;
    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateCartDisplay();
  }

  // Initialize cart display
  updateCartDisplay();
});






