document.addEventListener("DOMContentLoaded", () => {
    const favoritesList = document.querySelector(".favorites-list");

    // Get favorite items from localStorage
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (favorites.length === 0) {
        favoritesList.innerHTML = "<p>No favorite items yet.</p>";
    } else {
        favorites.forEach((item) => {
            const itemElement = document.createElement("div");
            itemElement.classList.add("items");
            itemElement.innerHTML = `
                <div class="productImage"></div>
                <div class="productmid">
                    <label id="productname">${item.name}</label>
                    <label id="productprice">${item.price}</label>
                </div>
                <div class="productbottom">
                    <button class="addtocart">Add to Cart</button>
                    <button class="remove-favorite">Remove</button>
                </div>
            `;
            favoritesList.appendChild(itemElement);
        });

        // Add event listeners to "Add to Cart" buttons
        const addToCartButtons = document.querySelectorAll(".addtocart");
        addToCartButtons.forEach((button, index) => {
            button.addEventListener("click", () => {
                const favoriteItem = favorites[index];
        
                // Get existing cart items from localStorage
                let cart = JSON.parse(localStorage.getItem("cart")) || [];
        
                // Check if the item is already in the cart
                const isAlreadyInCart = cart.some(
                    (cartItem) => cartItem.name === favoriteItem.name && cartItem.price === favoriteItem.price
                );
        
                if (!isAlreadyInCart) {
                    // Add the item to the cart
                    cart.push(favoriteItem);
        
                    // Save the updated cart back to localStorage
                    localStorage.setItem("cart", JSON.stringify(cart));
        
                    // Remove the item from the favorites array
                    favorites.splice(index, 1);
        
                    // Save the updated favorites back to localStorage
                    localStorage.setItem("favorites", JSON.stringify(favorites));
        
                    // Reload the page to reflect changes
                    alert(`${favoriteItem.name} has been added to your cart and removed from favorites!`);
                    location.reload();
                } else {
                    alert(`${favoriteItem.name} is already in your cart!`);
                }
            });
        });
        // Add event listeners to "Remove" buttons
        const removeButtons = document.querySelectorAll(".remove-favorite");
        removeButtons.forEach((button, index) => {
            button.addEventListener("click", () => {
                // Remove the item from the favorites array
                favorites.splice(index, 1);

                // Save the updated favorites back to localStorage
                localStorage.setItem("favorites", JSON.stringify(favorites));

                // Reload the page to reflect changes
                location.reload();
            });
        });
    }
});