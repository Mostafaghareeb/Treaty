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
});
