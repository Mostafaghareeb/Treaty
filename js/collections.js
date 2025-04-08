document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("collectionModal");
  const modalCollectionImage = document.getElementById("modalCollectionImage");
  const modalCollectionName = document.getElementById("modalCollectionName");
  const modalCollectionPrice = document.getElementById("modalCollectionPrice");
  const modalCollectionDescription = document.getElementById(
    "modalCollectionDescription"
  );
  const collectionAddToCartBtn = document.getElementById(
    "collectionAddToCartBtn"
  );
  const collectionBuyNowBtn = document.getElementById("collectionBuyNowBtn");
  const cartCount = document.getElementById("cartCount");

  let currentCollection = null;

  // Add click event listeners to all collection cards
  document.querySelectorAll(".collection-card").forEach((card) => {
    card.addEventListener("click", (e) => {
      // Get the collection data from the image element
      const collectionData = JSON.parse(
        card.querySelector("img").dataset.collection
      );
      currentCollection = collectionData;

      // Update modal content
      modalCollectionImage.src = collectionData.image;
      modalCollectionImage.alt = collectionData.name;
      modalCollectionName.textContent = collectionData.name;
      modalCollectionPrice.textContent = `LE ${collectionData.price} EGP`;
      modalCollectionDescription.textContent = collectionData.description;

      // Show modal
      modal.classList.remove("hidden");
    });
  });

  // Add to Cart button functionality
  collectionAddToCartBtn.addEventListener("click", () => {
    if (!currentCollection) return;

    // Get existing cart or initialize empty array
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if collection already exists in cart
    const existingItem = cart.find(
      (item) => item.name === currentCollection.name
    );
    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      cart.push({
        name: currentCollection.name,
        price: currentCollection.price,
        image: currentCollection.image,
        quantity: 1,
      });
    }

    // Save updated cart
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update cart count
    updateCartCount();

    // Show success message
    showSuccessMessage("Collection added to cart!");

    // Close modal
    modal.classList.add("hidden");
  });

  // Buy Now button functionality
  collectionBuyNowBtn.addEventListener("click", () => {
    if (!currentCollection) return;

    // Clear existing cart and add only this collection
    const cart = [
      {
        name: currentCollection.name,
        price: currentCollection.price,
        image: currentCollection.image,
        quantity: 1,
      },
    ];

    // Save cart
    localStorage.setItem("cart", JSON.stringify(cart));

    // Redirect to checkout
    window.location.href = "checkout.html";
  });

  // Close modal when clicking outside
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });

  // Close modal when pressing Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
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
