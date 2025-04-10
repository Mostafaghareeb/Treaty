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

  // Search functionality
  const searchIcon = document.getElementById("searchIcon");
  const searchContainer = document.getElementById("searchContainer");
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");
  const mobileSearchContainer = document.getElementById(
    "mobileSearchContainer"
  );
  const mobileSearchInput = document.getElementById("mobileSearchInput");
  const mobileSearchResults = document.getElementById("mobileSearchResults");

  // Function to toggle search container visibility
  function toggleSearch(container, input, results) {
    if (!container || !input || !results) return;

    if (container.classList.contains("-translate-y-full")) {
      container.classList.remove("-translate-y-full");
      input.focus();
    } else {
      container.classList.add("-translate-y-full");
      results.classList.add("hidden");
    }
  }

  // Function to fetch all products and collections
  async function fetchAllItems() {
    const items = [];

    try {
      // Fetch shop page
      const shopResponse = await fetch("shop.html");
      const shopText = await shopResponse.text();
      const shopDoc = new DOMParser().parseFromString(shopText, "text/html");

      // Get products from shop page
      const productCards = shopDoc.querySelectorAll(".product-card");
      productCards.forEach((card) => {
        try {
          const data = JSON.parse(card.dataset.product);
          items.push({
            name: data.name,
            price: data.price,
            image: data.image,
            type: "product",
            url: `shop.html?product=${encodeURIComponent(data.name)}`,
          });
        } catch (e) {
          console.error("Error parsing product data:", e);
        }
      });

      // Fetch collections page
      const collectionsResponse = await fetch("collections.html");
      const collectionsText = await collectionsResponse.text();
      const collectionsDoc = new DOMParser().parseFromString(
        collectionsText,
        "text/html"
      );

      // Get collections from collections page
      const collectionCards =
        collectionsDoc.querySelectorAll(".collection-card");
      collectionCards.forEach((card) => {
        try {
          const data = JSON.parse(card.querySelector("img").dataset.collection);
          items.push({
            name: data.name,
            price: data.price,
            image: data.image,
            type: "collection",
            url: `collections.html?collection=${encodeURIComponent(data.name)}`,
          });
        } catch (e) {
          console.error("Error parsing collection data:", e);
        }
      });

      // Also check current page for any products or collections
      const currentProductCards = document.querySelectorAll(".product-card");
      currentProductCards.forEach((card) => {
        try {
          const data = JSON.parse(card.dataset.product);
          // Only add if not already in items array
          if (!items.some((item) => item.name === data.name)) {
            items.push({
              name: data.name,
              price: data.price,
              image: data.image,
              type: "product",
              url: `shop.html?product=${encodeURIComponent(data.name)}`,
            });
          }
        } catch (e) {
          console.error("Error parsing current product data:", e);
        }
      });

      const currentCollectionCards =
        document.querySelectorAll(".collection-card");
      currentCollectionCards.forEach((card) => {
        try {
          const data = JSON.parse(card.querySelector("img").dataset.collection);
          // Only add if not already in items array
          if (!items.some((item) => item.name === data.name)) {
            items.push({
              name: data.name,
              price: data.price,
              image: data.image,
              type: "collection",
              url: `collections.html?collection=${encodeURIComponent(
                data.name
              )}`,
            });
          }
        } catch (e) {
          console.error("Error parsing current collection data:", e);
        }
      });
    } catch (error) {
      console.error("Error fetching items:", error);
    }

    return items;
  }

  // Function to perform search
  async function performSearch(query, resultsContainer) {
    if (!query || !resultsContainer) {
      if (resultsContainer) {
        resultsContainer.classList.add("hidden");
      }
      return;
    }

    const allItems = await fetchAllItems();
    const filteredItems = allItems.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );

    if (filteredItems.length === 0) {
      resultsContainer.innerHTML =
        '<div class="p-4 text-gray-500">No results found</div>';
    } else {
      // Add max height and overflow to enable scrolling
      resultsContainer.style.maxHeight = "400px";
      resultsContainer.style.overflowY = "auto";

      resultsContainer.innerHTML = filteredItems
        .map(
          (item) => `
        <a href="#" class="flex items-center p-4 hover:bg-pink-50 cursor-pointer border-b border-gray-100 last:border-0 transition-colors duration-200" onclick="event.preventDefault(); window.location.href='details.html?data=${encodeURIComponent(
          JSON.stringify(item)
        )}'">
          <img src="${item.image}" alt="${
            item.name
          }" class="w-16 h-16 object-cover rounded-lg">
          <div class="ml-4">
            <div class="text-gray-900 font-medium">${item.name}</div>
            <div class="text-pink-600">LE ${item.price} EGP</div>
            <div class="text-sm text-gray-500">${
              item.type === "collection" ? "Collection" : "Product"
            }</div>
          </div>
        </a>
      `
        )
        .join("");
    }

    resultsContainer.classList.remove("hidden");
  }

  // Event listeners for desktop search
  if (searchIcon && searchContainer && searchInput && searchResults) {
    searchIcon.addEventListener("click", () => {
      toggleSearch(searchContainer, searchInput, searchResults);
    });

    searchInput.addEventListener("input", (e) => {
      performSearch(e.target.value, searchResults);
    });

    // Close search results when clicking outside
    document.addEventListener("click", (e) => {
      if (
        !searchContainer.contains(e.target) &&
        !searchIcon.contains(e.target)
      ) {
        searchContainer.classList.add("-translate-y-full");
        searchResults.classList.add("hidden");
      }
    });
  }

  // Event listeners for mobile search
  if (mobileSearchContainer && mobileSearchInput && mobileSearchResults) {
    mobileSearchInput.addEventListener("input", (e) => {
      performSearch(e.target.value, mobileSearchResults);
    });

    // Close search results when clicking outside
    document.addEventListener("click", (e) => {
      if (!mobileSearchContainer.contains(e.target)) {
        mobileSearchContainer.classList.add("-translate-y-full");
        mobileSearchResults.classList.add("hidden");
      }
    });
  }
});
