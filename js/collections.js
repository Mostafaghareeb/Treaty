document.addEventListener("DOMContentLoaded", () => {
  const cartCount = document.getElementById("cartCount");

  // Add click event listeners to all collection cards
  document.querySelectorAll(".collection-card").forEach((card) => {
    card.addEventListener("click", (e) => {
      // Prevent the click if it's on the Add to Cart button
      if (e.target.closest(".add-to-cart")) {
        return;
      }

      // Get the collection data from the image element
      const imgElement = card.querySelector("img");
      if (!imgElement) {
        console.error("No image element found in collection card");
        return;
      }

      try {
        const collectionData = JSON.parse(imgElement.dataset.collection);

        // Validate the collection data
        if (
          !collectionData ||
          !collectionData.name ||
          !collectionData.price ||
          !collectionData.image
        ) {
          console.error("Invalid collection data:", collectionData);
          return;
        }

        // Create a URL-safe string of the collection data
        const encodedData = encodeURIComponent(JSON.stringify(collectionData));

        // Redirect to details page with the collection data
        window.location.href = `details.html?data=${encodedData}`;
      } catch (error) {
        console.error("Error parsing collection data:", error);
      }
    });
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

  // Initialize cart count
  updateCartCount();
});
