 // Get URL parameters
 function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const category = getQueryParam("category");

// Default value
var itemname = "Items";

// Map category to item name
const categoryMap = {
    women: "Home - Women's Item",
    men: "Home - Men's Item",
    electronic: "Home - Electronics",
    lifestyle: "Home - Home & Lifestyle",
    med: "Home - Medicine",
    sport: "Home - Sports & Outdoor",
    toys: "Home - Baby's & Toys",
    pets: "Home - Groceries & Pets",
    health: "Home - Health & Beauty"
};

// If category is valid, update itemname
if (category && categoryMap[category]) {
    itemname = categoryMap[category];
}

// Set the itemname in the page
window.onload = function () {
    var paggination = document.getElementById('page');
    paggination.innerHTML = itemname;

    const cleanTitle = itemname.replace("Home - ", "");
    document.title = "BILINASTORE - " + cleanTitle;

    // Update all product names dynamically
    const productNames = document.querySelectorAll("#productname");
    productNames.forEach(productName => {
        productName.textContent = cleanTitle; // Use the clean title for product names
    });
};

// Function to handle "Add to Cart" button clicks
document.addEventListener("DOMContentLoaded", () => {
    const addToCartButtons = document.querySelectorAll(".addtocart");

    addToCartButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            const item = button.closest(".items");
            const productName = item.querySelector("#productname").textContent;
            const productPrice = item.querySelector("#productprice").textContent;

            // Create an object for the cart item
            const cartItem = {
                name: productName,
                price: productPrice,
            };

            // Get existing cart items from localStorage
            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            // Add the new item to the cart
            cart.push(cartItem);

            // Save the updated cart back to localStorage
            localStorage.setItem("cart", JSON.stringify(cart));

            alert(`${productName} has been added to your cart!`);
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const favoriteButtons = document.querySelectorAll(".favorite");

    favoriteButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            const item = button.closest(".items");
            const productName = item.querySelector("#productname").textContent;
            const productPrice = item.querySelector("#productprice").textContent;

            // Create an object for the favorite item
            const favoriteItem = {
                name: productName,
                price: productPrice,
            };

            // Get existing favorite items from localStorage
            let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

            // Check if the item is already in favorites
            const isAlreadyFavorite = favorites.some(
                (fav) => fav.name === favoriteItem.name && fav.price === favoriteItem.price
            );

            if (!isAlreadyFavorite) {
                // Add the new item to the favorites
                favorites.push(favoriteItem);

                // Save the updated favorites back to localStorage
                localStorage.setItem("favorites", JSON.stringify(favorites));

                alert(`${productName} has been added to your favorites!`);
            } else {
                alert(`${productName} is already in your favorites!`);
            }
        });
    });
});