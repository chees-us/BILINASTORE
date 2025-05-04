document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.querySelector(".right");
    const totalPriceElement = document.getElementById("total-price");
    const checkoutButton = document.getElementById("checkout-button");

    // Get cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    if (cartItems.length === 0) {
        cartContainer.innerHTML += `
            <div class="empty-cart-message">
                <p>No items in your cart.</p>
            </div>
        `;
    } else {
        cartItems.forEach((item, index) => {
            if (!item.quantity) {
                item.quantity = 1;
            }

            const pricePerItem = parseFloat(item.price.replace(/[₱,]/g, ''));

            const itemElement = document.createElement("div");
            itemElement.classList.add("cart-item");
            itemElement.innerHTML = `
                <div class="item-header">
                    <input type="checkbox" class="item-checkbox" data-index="${index}">
                    <p class="item-name">${item.name}</p>
                </div>
                <p class="item-price">₱${(pricePerItem * item.quantity).toFixed(2)}</p>
                <div class="quantity-controls">
                    <button class="decrease" data-index="${index}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="increase" data-index="${index}">+</button>
                </div>
                <button class="remove-item" data-index="${index}">Remove</button>
            `;
            cartContainer.appendChild(itemElement);
        });

        // Add event listeners for "Increase" and "Decrease" buttons
        const increaseButtons = document.querySelectorAll(".increase");
        const decreaseButtons = document.querySelectorAll(".decrease");

        increaseButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                const index = e.target.getAttribute("data-index");
                cartItems[index].quantity++;
                updateQuantityAndPrice(cartItems, index);
                updateTotalPrice();
            });
        });

        decreaseButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                const index = e.target.getAttribute("data-index");
                if (cartItems[index].quantity > 1) {
                    cartItems[index].quantity--;
                    updateQuantityAndPrice(cartItems, index);
                    updateTotalPrice();
                }
            });
        });

        // Add event listeners to "Remove" buttons
        const removeButtons = document.querySelectorAll(".remove-item");
        removeButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                const index = e.target.getAttribute("data-index");
                cartItems.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cartItems));
                location.reload();
            });
        });

        // Add event listeners to checkboxes
        const checkboxes = document.querySelectorAll(".item-checkbox");
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener("change", updateTotalPrice);
        });

        // Update total price
        function updateTotalPrice() {
            let total = 0;
            checkboxes.forEach((checkbox, index) => {
                if (checkbox.checked) {
                    const pricePerItem = parseFloat(cartItems[index].price.replace(/[₱,]/g, ''));
                    total += pricePerItem * cartItems[index].quantity;
                }
            });
            totalPriceElement.textContent = `Total Price: ₱${total.toFixed(2)}`;
        }

        // Function to update quantity and price in the DOM and save changes to localStorage
        function updateQuantityAndPrice(cartItems, index) {
            const itemElement = document.querySelectorAll(".cart-item")[index];
            const pricePerItem = parseFloat(cartItems[index].price.replace(/[₱,]/g, ''));
            const totalPrice = pricePerItem * cartItems[index].quantity;

            itemElement.querySelector(".quantity").textContent = cartItems[index].quantity;
            itemElement.querySelector(".item-price").textContent = `₱${totalPrice.toFixed(2)}`;
            localStorage.setItem("cart", JSON.stringify(cartItems));
        }
    }

    // Handle "Check Out" button click
    checkoutButton.addEventListener("click", () => {
        alert("This shop is not functional and is only for educational purposes.");
    });
});