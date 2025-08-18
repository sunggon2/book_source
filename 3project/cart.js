class Product {
  constructor(name, price, quantity = 1) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }
}

class Cart {
  constructor() {
    this.items = [];
  }

  addItem(product) {
    const existing = this.items.find(item => item.name === product.name);
    if (existing) {
      existing.quantity += product.quantity;
    } else {
      this.items.push(product);
    }
    this.displayCart();
  }

  updateQuantity(index, quantity) {
    if (quantity <= 0) {
      this.items.splice(index, 1);
    } else {
      this.items[index].quantity = quantity;
    }
    this.displayCart();
  }

  removeItem(index) {
    this.items.splice(index, 1);
    this.displayCart();
  }

  calculateTotal() {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  displayCart() {
    const cartItemsDiv = document.getElementById("cart-items");
    cartItemsDiv.innerHTML = "";

    this.items.forEach((item, index) => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "cart-item";
      itemDiv.innerHTML = `
        <div class="item-name">${item.name}</div>
        <div class="item-price">₩${item.price.toLocaleString()}</div>
        <div class="item-qty">
          <input type="number" value="${item.quantity}" min="1" data-index="${index}" />
        </div>
        <div class="item-subtotal">₩${(item.price * item.quantity).toLocaleString()}</div>
        <div class="item-remove">
          <button class="remove-btn" data-index="${index}">삭제</button>
        </div>
      `;
      cartItemsDiv.appendChild(itemDiv);
    });

    document.getElementById("cart-total").textContent = this.calculateTotal().toLocaleString();

    document.querySelectorAll(".cart-item input").forEach(input => {
      input.addEventListener("change", e => {
        const index = e.target.dataset.index;
        const quantity = parseInt(e.target.value);
        this.updateQuantity(index, quantity);
      });
    });

    document.querySelectorAll(".remove-btn").forEach(btn => {
      btn.addEventListener("click", e => {
        const index = e.target.dataset.index;
        this.removeItem(index);
      });
    });
  }
}

const cart = new Cart();

document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", () => {
    const name = button.dataset.name;
    const price = parseInt(button.dataset.price);
    cart.addItem(new Product(name, price));
  });
});
