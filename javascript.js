document.addEventListener('DOMContentLoaded', function() {
    const productList = document.getElementById('product-list');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');

    let cart = [];

    const products = [
        { id: 1, name: 'Product 1', price: 10 },
        { id: 2, name: 'Product 2', price: 20 },
        { id: 3, name: 'Product 3', price: 30 }
    ];

    // Display products
    products.forEach(product => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${product.name} - $${product.price}</span>
            <input type="number" min="1" value="1" class="quantity-input">
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        `;
        productList.appendChild(li);
    });

    // Add to cart
    function addToCart(product) {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ id: product.id, name: product.name, price: product.price, quantity: 1 });
        }
        updateCart();
    }

    // Update cart
    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${item.name} - $${item.price} x ${item.quantity}</span>
                <button class="remove-from-cart" data-id="${item.id}">Remove</button>
            `;
            cartItems.appendChild(li);
            total += item.price * item.quantity;
        });
        cartTotal.textContent = total.toFixed(2);
    }

    productList.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const product = products.find(p => p.id === productId);
            if (product) {
                addToCart(product);
            }
        }
    });

    cartItems.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-from-cart')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const index = cart.findIndex(item => item.id === productId);
            if (index !== -1) {
                cart.splice(index, 1);
                updateCart();
            }
        }
    });

    // Checkout
    checkoutBtn.addEventListener('click', function() {
        if (cart.length > 0) {
            alert('Checkout functionality will be implemented later!');
        } else {
            alert('Your cart is empty!');
        }
    });
});
