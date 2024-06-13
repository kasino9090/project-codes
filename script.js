
    // Wait until the DOM content is fully loaded before running the script
    document.addEventListener('DOMContentLoaded', function () {
      // Array containing product details
      const products = [
          { id: 1, name: 'Avant-garde Lamp', price: '$179.99', image: 'images/943150.jpeg' },
          { id: 2, name: 'Chic Chair', price: '$339.99', image: 'images/pexels-photo-5705090.jpeg' },
          { id: 3, name: 'Coffee Table', price: '$179.99', image: 'images/pexels-photo-3679601.jpeg' },
          { id: 4, name: 'Comfy Bed', price: '$129.99', image: 'images/pexels-photo-1034584.jpeg' },
          { id: 5, name: 'Cutting-edge Bed', price: '$84.99', image: 'images/pexels-photo-2029694.jpeg' },
          { id: 6, name: 'Glass Table', price: '$159.99', image: 'images/pexels-photo-1571452.jpeg' },
          { id: 7, name: 'Lounge Chair', price: '$259.99', image: 'images/pexels-photo-2082090.webp' },
          { id: 8, name: 'King Bed', price: '$189.99', image: 'images/pexels-photo-6489083.webp' },
          { id: 9, name: 'Futuristic Shelves', price: '$94.99', image: 'images/pexels-photo-2177482.jpeg' },
          { id: 10, name: 'Contemporary Sofa', price: '$159.99', image: 'images/pexels-photo-1571459.jpeg' }
      ];

      // Number of items to display per page
      const itemsPerPage = 6;
      // Current page number, starting at 1
      let currentPage = 1;

      // Function to display products based on the current page
      function displayProducts(page) {
          // Calculate the starting and ending index for the products to be displayed
          const startIndex = (page - 1) * itemsPerPage;
          const endIndex = startIndex + itemsPerPage;
          // Slice the products array to get the products for the current page
          const slicedProducts = products.slice(startIndex, endIndex);

          // Get the product grid element
          const productGrid = document.getElementById('product-grid');
          // Clear the product grid content
          productGrid.innerHTML = '';

          // Loop through the sliced products and create HTML for each product
          slicedProducts.forEach(product => {
              const card = `
                  <div class="card shadow-xl hover:shadow-2xl transition duration-300" data-id="${product.id}">
                      <figure>
                          <img src="${product.image}" alt="${product.name}">
                      </figure>
                      <div class="card-body">
                          <h2 class="card-title">${product.name}</h2>
                          <span class="text-secondary">${product.price}</span>
                      </div>
                  </div>
              `;
              // Add the product card to the product grid
              productGrid.innerHTML += card;
          });

          // Attach event listeners to the new product cards
          attachCardEventListeners();
      }

      // Function to update the state of pagination buttons
      function updatePaginationButtons() {
          // Get the previous and next buttons
          const prevBtn = document.getElementById('prevBtn');
          const nextBtn = document.getElementById('nextBtn');

          // Disable the previous button if on the first page
          prevBtn.disabled = currentPage === 1;
          // Disable the next button if on the last page
          nextBtn.disabled = currentPage === Math.ceil(products.length / itemsPerPage);

          // Add event listener for the previous button
          prevBtn.addEventListener('click', () => {
              if (currentPage > 1) {
                  currentPage--; // Decrement for the current page number
                  displayProducts(currentPage); // Display products for the new page
                  updatePaginationButtons(); // Update the buttons
              }
          });

          // Add event listener for the next button
          nextBtn.addEventListener('click', () => {
              if (currentPage < Math.ceil(products.length / itemsPerPage)) {
                  currentPage++; // Increment the current page number
                  displayProducts(currentPage); // Display products for the new page
                  updatePaginationButtons(); // Update the  buttons
              }
          });
      }

      // Function to attach event listeners to product cards
      function attachCardEventListeners() {
          // Get all product cards
          const cards = document.querySelectorAll('.card');
          // Get the element displaying the cart count
          const cartCount = document.querySelector('.zero');
          // Get the element displaying the cart message
          const cartMessage = document.querySelector('.you');

          // Initialize cart count from sessionStorage or set to 0 if not available
          let cartItems = sessionStorage.getItem('cartItems') ? parseInt(sessionStorage.getItem('cartItems')) : 0;
          // Update the displayed cart count
          cartCount.textContent = cartItems;

          // Loop through each card and add an event listener
          cards.forEach(card => {
              card.addEventListener('click', function (event) {
                  event.preventDefault(); // Prevent default action of the click

                  cartItems++; // Increment the cart items count
                  cartCount.textContent = cartItems; // Update the displayed cart count
                  sessionStorage.setItem('cartItems', cartItems); // Store the updated count in sessionStorage
                  updateCartMessage(cartItems); // Update the cart message
              });
          });

          // Function to update the cart message based on the number of items
          function updateCartMessage(items) {
              if (items > 0) {
                  cartMessage.textContent = 'Your Cart Is Not Empty'; // Display message if cart is not empty
              } else {
                  cartMessage.textContent = 'Your Cart Is Empty'; // Display message if cart is empty
              }
          }
      }

      // Set the total number of products in the UI
      document.getElementById('cardCount').textContent = products.length;
      // Display the products for the initial page
      displayProducts(currentPage);
      // Update the state d buttons
      updatePaginationButtons();
      // Attach event listeners to the product cards
      attachCardEventListeners();
  });









  
// Check if jQuery is loaded; if not, load it and execute jQueryReady()
if (typeof jQuery == 'undefined') {
  var script = document.createElement('script');
  script.src = 'https://code.jquery.com/jquery-3.6.0.min.js'; // jQuery CDN URL
  script.integrity = 'sha384-KyZXEAg3QhqLMpG8r+8fhAXLRyybYIc5V1nDdN9/WIN6eZx5p5UL5RvbfLf5HTC1'; // Script integrity
  script.crossOrigin = 'anonymous'; // Cross-origin attribute
  document.head.appendChild(script); // Append script to document head

  script.onload = function() {
      jQueryReady(); // Execute jQueryReady function when script is loaded
  };
} else {
  jQueryReady(); // Execute jQueryReady function if jQuery is already loaded
}

// Function executed when jQuery is ready
function jQueryReady() {
  $(document).ready(function() {
      // Handle form submission for login and register forms using AJAX
      $('form').submit(function(event) {
          event.preventDefault(); // Prevent form submission

          var $form = $(this); // Select current form
          var url = $form.data('url'); // Get form data-url attribute
          var formData = $form.serialize(); // Serialize form data

          $.ajax({
              type: 'POST', // HTTP method
              url: url, // URL endpoint
              data: formData, // Form data to send
              dataType: 'json', // Expected data type of response
              encode: true, // URL encode form data
              success: function(response) {
                  console.log(response); // Log successful response
              },
              error: function(error) {
                  console.log(error); // error response
              }
          });
      });

      // Function to load jQuery if not already loaded
      function loadjQuery(callback) {
          if (typeof jQuery === 'undefined') {
              let script = document.createElement('script');
              script.src = 'https://code.jquery.com/jquery-3.6.0.min.js'; // jQuery CDN URL
              script.type = 'text/javascript'; // Script type
              script.onload = callback; // Callback function on script load
              document.head.appendChild(script); // Append script to document head
          } else {
              callback(); // Execute callback function if jQuery is already loaded
          }
      }

      // Event listener for guest user button click
      $('#guestUserBtn').click(function() {
          window.location.href = '/'; // Redirect to root path

          // Modify register link text and remove href after redirection
          $('#registerLink').text('Logout').removeAttr('href');

          // Modify login link text and remove href after redirection
          $('#loginLink').text('Hello, demo user').removeAttr('href');

          showNotification('Welcome, guest user!'); // Display notification after redirection
      });

      // Function to show notification message
      function showNotification(message) {
          var notificationHTML = `
              <div class="Toastify__toast-container Toastify__toast-container--top-center">
                  <div class="Toastify__toast Toastify__toast-theme--light Toastify__toast--success Toastify__toast--close-on-click">
                      <div role="alert" class="Toastify__toast-body">
                          <div class="Toastify__toast-icon Toastify--animate-icon Toastify__zoom-enter">
                              <svg viewBox="0 0 24 24" width="100%" height="100%" fill="var(--toastify-icon-color-success)">
                                  <path d="M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"></path>
                              </svg>
                          </div>
                          <div>${message}</div>
                      </div>
                      <button class="Toastify__close-button Toastify__close-button--light" type="button" aria-label="close">
                          <svg aria-hidden="true" viewBox="0 0 14 16">
                              <path fill-rule="evenodd" d="M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"></path>
                          </svg>
                      </button>
                      <div role="progressbar" aria-hidden="false" aria-label="notification timer" class="Toastify__progress-bar Toastify__progress-bar--animated Toastify__progress-bar-theme--light Toastify__progress-bar--success" style="animation-duration: 5000ms;"></div>
                  </div>
              </div>
          `;

          $('.Toastify').html(notificationHTML); //  notification HTML to element

          // Remove notification after 5 seconds
          setTimeout(function() {
              $('.Toastify').empty(); // Empty notification element
          }, 5000);
      }
  });
}





    document.addEventListener('DOMContentLoaded', function () {
      // Force reflow on images to ensure they are rendered
      const images = document.querySelectorAll('.card img');
      images.forEach(image => {
          image.style.display = 'none';
          image.offsetHeight; // trigger reflow
          image.style.display = 'block';
      });
  });






















