document.addEventListener("DOMContentLoaded", () => {
  const detailImage = document.getElementById("detailImage");
  const detailName = document.getElementById("detailName");
  const detailPrice = document.getElementById("detailPrice");
  const detailDescription = document.getElementById("detailDescription");
  const ingredientsSection = document.getElementById("ingredientsSection");
  const detailIngredients = document.getElementById("detailIngredients");
  const addToCartBtn = document.getElementById("addToCartBtn");
  const buyNowBtn = document.getElementById("buyNowBtn");
  const cartCount = document.getElementById("cartCount");
  const backButton = document.getElementById("backButton");

  // Get the item data from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const dataParam = urlParams.get("data");

  if (!dataParam) {
    console.error("No data parameter found in URL");
    return;
  }

  try {
    const itemData = JSON.parse(decodeURIComponent(dataParam));

    // Validate required fields
    if (!itemData || !itemData.name || !itemData.price || !itemData.image) {
      console.error("Invalid item data:", itemData);
      return;
    }

    // Update page content
    detailImage.src = itemData.image;
    detailImage.alt = itemData.name;
    detailName.textContent = itemData.name;
    detailPrice.textContent = `LE ${itemData.price} EGP`;

    // Handle description (for collections) or ingredients (for products)
    if (itemData.description) {
      detailDescription.textContent = itemData.description;
      ingredientsSection.classList.add("hidden");
    } else if (itemData.ingredients) {
      detailDescription.textContent = "";
      ingredientsSection.classList.remove("hidden");
      detailIngredients.innerHTML = itemData.ingredients
        .map((ingredient) => `<li>${ingredient}</li>`)
        .join("");
    }

    // Add to Cart button functionality
    addToCartBtn.addEventListener("click", () => {
      // Get existing cart or initialize empty array
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      // Check if item already exists in cart
      const existingItem = cart.find((item) => item.name === itemData.name);
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
      } else {
        cart.push({
          name: itemData.name,
          price: itemData.price,
          image: itemData.image,
          quantity: 1,
        });
      }

      // Save updated cart
      localStorage.setItem("cart", JSON.stringify(cart));

      // Update cart count
      updateCartCount();

      // Show success message
      showSuccessMessage("Item added to cart!");
    });

    // Buy Now button functionality
    buyNowBtn.addEventListener("click", () => {
      // Clear existing cart and add only this item
      const cart = [
        {
          name: itemData.name,
          price: itemData.price,
          image: itemData.image,
          quantity: 1,
        },
      ];

      // Save cart
      localStorage.setItem("cart", JSON.stringify(cart));

      // Redirect to checkout
      window.location.href = "checkout.html";
    });

    // Back button functionality
    if (backButton) {
      backButton.addEventListener("click", () => {
        window.history.back();
      });
    }
  } catch (error) {
    console.error("Error parsing item data:", error);
  }

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
      "fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg";
    successMessage.textContent = message;
    document.body.appendChild(successMessage);

    setTimeout(() => {
      successMessage.remove();
    }, 3000);
  }

  // Initialize cart count
  updateCartCount();
});
