// Create this new file for handling the popup and other functionality
document.addEventListener("DOMContentLoaded", function () {
  // First Visit Popup
  if (!sessionStorage.getItem("popupShown")) {
    document.getElementById("firstVisitPopup").classList.remove("hidden");
    sessionStorage.setItem("popupShown", "true");
  }

  // Close popup handlers
  document.getElementById("closePopup").addEventListener("click", function () {
    document.getElementById("firstVisitPopup").classList.add("hidden");
  });

  document
    .getElementById("subscribeForm")
    .addEventListener("submit", function () {
      document.getElementById("firstVisitPopup").classList.add("hidden");
    });

  document.getElementById("noThanksBtn").addEventListener("click", function () {
    document.getElementById("firstVisitPopup").classList.add("hidden");
  });


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
