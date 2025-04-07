class Checkout {
  constructor() {
    this.items = JSON.parse(localStorage.getItem("cart")) || [];
    this.init();
  }

  init() {
    // Redirect if cart has less than 2 items
    if (this.items.length < 1) {
      window.location.href = "cart.html";
      return;
    }

    this.renderOrderSummary();
    this.setupEventListeners();
  }

  renderOrderSummary() {
    const checkoutItems = document.getElementById("checkoutItems");

    // Render items
    checkoutItems.innerHTML = this.items
      .map(
        (item) => `
            <div class="flex justify-between items-center">
                <div>
                    <h3 class="font-semibold">${item.name}</h3>
                    <p class="text-gray-600">Quantity: ${item.quantity}</p>
                </div>
                <p class="font-semibold">$${(
                  item.price * item.quantity
                ).toFixed(2)}</p>
            </div>
        `
      )
      .join("");

    // Calculate and update totals
    const subtotal = this.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    document.getElementById(
      "checkout-subtotal"
    ).textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById("checkout-tax").textContent = `$${tax.toFixed(2)}`;
    document.getElementById("checkout-total").textContent = `$${total.toFixed(
      2
    )}`;
  }

  setupEventListeners() {
    const form = document.getElementById("checkoutForm");
    form.addEventListener("submit", (e) => this.handleSubmit(e));
  }

  handleSubmit(event) {
    event.preventDefault();

    // Show confirmation modal
    const modal = document.getElementById("confirmationModal");
    modal.classList.remove("hidden");

    // Clear cart
    localStorage.removeItem("cart");

    // Redirect to home after 5 seconds
    setTimeout(() => {
      window.location.href = "index.html";
    }, 5000);
  }
}

// Initialize checkout when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const checkout = new Checkout();
});
