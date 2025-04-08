// Create this new file for handling the popup and other functionality
document.addEventListener("DOMContentLoaded", function () {

  // Mobile menu functionality
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const burgerTop = document.getElementById("burger-top");
  const burgerMiddle = document.getElementById("burger-middle");
  const burgerBottom = document.getElementById("burger-bottom");
  let isMenuOpen = false;
  
  mobileMenuButton.addEventListener("click", function () {
    isMenuOpen = !isMenuOpen;

    // Toggle menu visibility
    mobileMenu.classList.toggle("hidden");

    // Animate burger icon
    if (isMenuOpen) {
      // Transform to X
      burgerTop.style.transform = "rotate(45deg) translate(5px, 5px)";
      burgerMiddle.style.opacity = "0";
      burgerBottom.style.transform = "rotate(-45deg) translate(5px, -5px)";
    } else {
      // Revert to burger
      burgerTop.style.transform = "none";
      burgerMiddle.style.opacity = "1";
      burgerBottom.style.transform = "none";
    }
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (event) {
    if (
      isMenuOpen &&
      !mobileMenu.contains(event.target) &&
      !mobileMenuButton.contains(event.target)
    ) {
      mobileMenuButton.click();
    }
  });
});

// Search functionality
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const mobileSearchInput = document.getElementById('mobileSearchInput');
  const searchResults = document.getElementById('searchResults');
  const mobileSearchResults = document.getElementById('mobileSearchResults');

  // Sample product data - in a real application, this would come from your backend
  const products = [
      { name: 'Classic Glazed', price: 3.99, image: 'https://images.unsplash.com/photo-1556913396-7a3c459ef68e', type: 'product' },
      { name: 'Chocolate Dream', price: 4.49, image: 'https://images.unsplash.com/photo-1527904324834-3bda86da6771', type: 'product' },
      { name: 'Berry Blast', price: 4.99, image: 'https://images.unsplash.com/photo-1495147466023-ac5c588e2e94', type: 'product' },
      { name: 'Caramel Crunch', price: 4.99, image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd', type: 'product' },
      { name: 'Classic Collection', price: 29.99, image: 'https://images.unsplash.com/photo-1533910534207-90f31029a78e', type: 'collection' },
      { name: 'Premium Collection', price: 39.99, image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac', type: 'collection' },
      { name: 'Seasonal Collection', price: 34.99, image: 'https://images.unsplash.com/photo-1558326567-98ae2405596b', type: 'collection' },
      { name: 'Luxury Velvet Collection', price: 44.99, image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b', type: 'collection' }
  ];

  // Function to perform search
  function performSearch(query, resultsContainer) {
      if (!query) {
          resultsContainer.classList.add('hidden');
          return;
      }

      const filteredProducts = products.filter(product => 
          product.name.toLowerCase().includes(query.toLowerCase())
      );

      if (filteredProducts.length === 0) {
          resultsContainer.innerHTML = '<div class="p-4 text-gray-500">No results found</div>';
      } else {
          resultsContainer.innerHTML = filteredProducts.map(product => `
              <a href="details.html?data=${encodeURIComponent(JSON.stringify(product))}" 
                 class="flex items-center p-2 hover:bg-pink-50 cursor-pointer">
                  <img src="${product.image}" alt="${product.name}" 
                       class="w-12 h-12 object-cover rounded-lg">
                  <div class="ml-3">
                      <div class="text-gray-900 font-medium">${product.name}</div>
                      <div class="text-pink-600">LE ${product.price} EGP</div>
                  </div>
              </a>
          `).join('');
      }

      resultsContainer.classList.remove('hidden');
  }

  // Event listeners for desktop search
  if (searchInput) {
      searchInput.addEventListener('input', (e) => {
          performSearch(e.target.value, searchResults);
      });

      // Close search results when clicking outside
      document.addEventListener('click', (e) => {
          if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
              searchResults.classList.add('hidden');
          }
      });
  }

  // Event listeners for mobile search
  if (mobileSearchInput) {
      mobileSearchInput.addEventListener('input', (e) => {
          performSearch(e.target.value, mobileSearchResults);
      });

      // Close search results when clicking outside
      document.addEventListener('click', (e) => {
          if (!mobileSearchInput.contains(e.target) && !mobileSearchResults.contains(e.target)) {
              mobileSearchResults.classList.add('hidden');
          }
      });
  }
});