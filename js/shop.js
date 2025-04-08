document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("productModal");
  const modalProductImage = document.getElementById("modalProductImage");
  const modalProductName = document.getElementById("modalProductName");
  const modalProductPrice = document.getElementById("modalProductPrice");
  const modalProductIngredients = document.getElementById(
    "modalProductIngredients"
  );
  const addToCartBtn = document.getElementById("addToCartBtn");
  const buyNowBtn = document.getElementById("buyNowBtn");

  let currentProduct = null;

  // Add click event listeners to all product cards
  document.querySelectorAll(".product-card").forEach((card) => {
    card.addEventListener("click", function (e) {
      // Don't trigger if clicking on the Add to Cart button
      if (e.target.closest(".add-to-cart")) {
        return;
      }

      currentProduct = JSON.parse(this.dataset.product);

      // Update modal content
      modalProductImage.src = currentProduct.image;
      modalProductImage.alt = currentProduct.name;
      modalProductName.textContent = currentProduct.name;
      modalProductPrice.textContent = `$${currentProduct.price.toFixed(2)}`;

      // Clear and update ingredients list
      modalProductIngredients.innerHTML = "";
      currentProduct.ingredients.forEach((ingredient) => {
        const li = document.createElement("li");
        li.textContent = ingredient;
        modalProductIngredients.appendChild(li);
      });

      // Show modal
      modal.classList.remove("hidden");
    });
  });

  // Add to Cart button click handler
  addToCartBtn.addEventListener("click", function () {
    if (currentProduct) {
      // Get existing cart or initialize empty array
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      // Check if product already exists in cart
      const existingProductIndex = cart.findIndex(
        (item) => item.name === currentProduct.name
      );

      if (existingProductIndex !== -1) {
        // If product exists, increment quantity
        cart[existingProductIndex].quantity += 1;
      } else {
        // If product doesn't exist, add it to cart
        cart.push({
          name: currentProduct.name,
          price: currentProduct.price,
          image: currentProduct.image,
          quantity: 1,
        });
      }

      // Save updated cart to localStorage
      localStorage.setItem("cart", JSON.stringify(cart));

      // Update cart count
      updateCartCount();

      // Show success message
      showSuccessMessage("Product added to cart!");

      // Close the modal
      modal.classList.add("hidden");
    }
  });

  // Buy Now button click handler
  buyNowBtn.addEventListener("click", function () {
    if (currentProduct) {
      // Clear existing cart and add only the current product
      const cart = [
        {
          name: currentProduct.name,
          price: currentProduct.price,
          image: currentProduct.image,
          quantity: 1,
        },
      ];

      localStorage.setItem("cart", JSON.stringify(cart));

      // Update cart count
      updateCartCount();

      // Redirect to checkout
      window.location.href = "checkout.html";
    }
  });

  // Close modal when clicking outside
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      modal.classList.add("hidden");
    }
  });

  // Function to update cart count
  function updateCartCount() {
    const cartCount = document.getElementById("cartCount");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    cartCount.textContent = totalItems;
    cartCount.style.opacity = totalItems > 0 ? "1" : "0";
  }

  // Function to show success message
  function showSuccessMessage(message) {
    const successMessage = document.createElement("div");
    successMessage.className =
      "fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50";
    successMessage.textContent = message;
    document.body.appendChild(successMessage);

    // Remove message after 3 seconds
    setTimeout(() => {
      successMessage.remove();
    }, 3000);
  }

  // Initialize cart count
  updateCartCount();
});
