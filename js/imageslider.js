var bt1 = document.getElementById('radio1');
var bt2 = document.getElementById('radio2');
var bt3 = document.getElementById('radio3');
var bt4 = document.getElementById('radio4');
var image = document.querySelector(".imageholder");

function func1(){
    image.style.right = '0%';
}
function func2(){
    image.style.right = '100%';
}
function func3(){
    image.style.right = '200%';
}
function func4(){
    image.style.right = '300%';
}

var funcs = [func1, func2, func3, func4];
var buttons = [bt1, bt2, bt3, bt4];
var index = 0;
var delay = 5000;

function updateButtonStyles(activeIndex) {
    buttons.forEach((btn, i) => {
        if (i === activeIndex) {
            btn.style.backgroundColor = "#dedede"; 
            btn.style.opacity = "1";
            btn.style.width = "7px";
            btn.style.height = "7px";
            btn.style.bottom = "1px";
        } else {
            btn.style.backgroundColor = "rgba(255, 99, 71, 0)"; 
            btn.style.opacity = "0.5";
            btn.style.width = "5px";
            btn.style.height = "5px";
            btn.style.bottom = "0px";
        }
    });
}

function startLoop() {
    funcs[index]();                
    updateButtonStyles(index);  

    setInterval(() => {
        funcs[index](); 
        updateButtonStyles(index);
        index = (index + 1) % funcs.length; 
    }, delay);
}

function handleClick(newIndex) {
    index = newIndex;      
    updateButtonStyles(index);
    funcs[index]();          
    index = (index + 1) % funcs.length; 
}

bt1.addEventListener("click", () => handleClick(0));
bt2.addEventListener("click", () => handleClick(1));
bt3.addEventListener("click", () => handleClick(2));
bt4.addEventListener("click", () => handleClick(3));

startLoop();



// Function to handle "Add to Cart" button clicks
document.addEventListener("DOMContentLoaded", () => {
    const addToCartButtons = document.querySelectorAll(".addtocart");

    addToCartButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            const item = button.closest(".items");
            const productName = item.querySelector("#productname").textContent;
            const productPrice = item.querySelector("#productprice").textContent;

            // Create an object for the item
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

    // Function to handle "Favorite" button clicks
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