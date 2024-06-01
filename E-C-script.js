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




