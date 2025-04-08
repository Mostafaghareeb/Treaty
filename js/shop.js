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
  const cartCount = document.getElementById("cartCount");

  let currentProduct = null;

  // Add click event listeners to all product cards
  document.querySelectorAll(".product-card").forEach((card) => {
    card.addEventListener("click", function (e) {
      // Prevent the click if it's on the Add to Cart button
      if (e.target.closest(".add-to-cart")) {
        return;
      }

      // Get the product data from the card
      const productData = JSON.parse(this.dataset.product);

      // Validate the product data
      if (
        !productData ||
        !productData.name ||
        !productData.price ||
        !productData.image
      ) {
        console.error("Invalid product data:", productData);
        return;
      }

      // Create a URL-safe string of the product data
      const encodedData = encodeURIComponent(JSON.stringify(productData));

      // Redirect to details page with the product data
      window.location.href = `details.html?data=${encodedData}`;
    });
  });

  // Add to Cart button functionality
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", function (e) {
      e.stopPropagation(); // Prevent card click event

      const productData = {
        name: button.dataset.product,
        price: parseFloat(button.dataset.price),
        image: button.dataset.image,
      };

      // Get existing cart or initialize empty array
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      // Check if product already exists in cart
      const existingItem = cart.find((item) => item.name === productData.name);
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
      } else {
        cart.push({
          name: productData.name,
          price: productData.price,
          image: productData.image,
          quantity: 1,
        });
      }

      // Save updated cart
      localStorage.setItem("cart", JSON.stringify(cart));

      // Update cart count
      updateCartCount();

      // Show success message
      showSuccessMessage("Product added to cart!");
    });
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
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce(
      (sum, item) => sum + (item.quantity || 1),
      0
    );
    cartCount.textContent = totalItems;
    cartCount.classList.remove("opacity-0");
  }

  // Function to show success message
  function showSuccessMessage(message) {
    const successMessage = document.createElement("div");
    successMessage.className =
      "fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50";
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
