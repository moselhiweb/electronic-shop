/* --- SHARED SHOPPING CART LOGIC --- */

// Cart State
let cart = JSON.parse(localStorage.getItem('electro-cart')) || [];

// DOM Elements (will be selected if they exist on the current page)
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartCountEl = document.getElementById('cart-count');
const cartTotalPriceEl = document.getElementById('cart-total-price');

// Toggle Cart Sidebar
function toggleCart() {
    if (cartSidebar && cartOverlay) {
        cartSidebar.classList.toggle('open');
        cartOverlay.classList.toggle('open');
    }
}

// Add to Cart Function
function addToCart(product) {
    // Check if item already exists
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        // Optional: Increment quantity if we track it (for now, simple alert or ignore)
        // For a better UX, maybe we should just notify "Item added again" or actually handle quantity.
        // Let's assume we just want 1 of each for this simple version, OR we can add a 'quantity' property.
        // Let's add a quantity property to make it professional.
        if (!existingItem.quantity) existingItem.quantity = 1;
        existingItem.quantity++;
    } else {
        product.quantity = 1;
        cart.push(product);
    }

    saveCart();
    updateCartUI();

    // If we are on the cart page, we might want to re-render the whole page
    if (window.renderCartPage) window.renderCartPage();

    // Show the sidebar if it exists
    if (cartSidebar) {
        if (!cartSidebar.classList.contains('open')) {
            toggleCart();
        }
    } else {
        // On pages without sidebar (maybe checkout), maybe redirect or show toast
        // For now, assume sidebar is everywhere or we just saved it.
    }
}

// Helper to add by ID (exposed globally)
function addToCartById(id) {
    // 'products' array must be available globally (from data.js)
    if (typeof products !== 'undefined') {
        const product = products.find(p => p.id === id);
        if (product) {
            addToCart(product);
        }
    } else {
        console.error("Products data not loaded");
    }
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
    if (window.renderCartPage) window.renderCartPage();
}

// Update Quantity (for Cart Page)
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = (item.quantity || 1) + change;
        if (item.quantity < 1) item.quantity = 1; // Prevent 0
        saveCart();
        updateCartUI();
        if (window.renderCartPage) window.renderCartPage();
    }
}

// Save to LocalStorage
function saveCart() {
    localStorage.setItem('electro-cart', JSON.stringify(cart));
}

// Update UI (Sidebar & Counts)
function updateCartUI() {
    // Update Count in Navbar and Sidebar
    const totalCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

    // There might be multiple count elements (mobile, desktop, sidebar)
    // Let's try to find them all
    const countElements = document.querySelectorAll('#cart-count, .cart-count-badge');
    countElements.forEach(el => el.innerText = `(${totalCount})`);

    // Update Sidebar Items if container exists
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = '';

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<div class="empty-cart-msg">Your cart is empty</div>';
        } else {
            let total = 0;
            cart.forEach(item => {
                const q = item.quantity || 1;
                total += item.price * q;
                const itemEl = document.createElement('div');
                itemEl.className = 'cart-item';
                itemEl.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <span class="price">$${item.price} ${q > 1 ? `x ${q}` : ''}</span>
                    </div>
                    <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                `;
                cartItemsContainer.appendChild(itemEl);
            });

            if (cartTotalPriceEl) {
                cartTotalPriceEl.innerText = `$${total.toLocaleString()}`;
            }
        }
    }
}

// Initialization on Page Load
document.addEventListener('DOMContentLoaded', () => {
    // 1. Hook up Cart Toggles (Event Delegation)
    document.addEventListener('click', (e) => {
        // Check if clicked element or any parent is a trigger
        const trigger = e.target.closest('.cart-trigger') || e.target.closest('.fa-shopping-cart');

        // If it's a close button
        if (e.target.closest('#close-cart') || e.target.closest('.close-cart')) {
            toggleCart();
            return;
        }

        // Don't trigger if we are inside the sidebar itself (unless it's a close button)
        if (e.target.closest('.cart-sidebar')) return;

        // If it's the overlay
        if (e.target.id === 'cart-overlay') {
            toggleCart();
            return;
        }

        // If it's a valid trigger (and not inside the cart page's main area which might use same icon?)
        // Actually, just checking if it is a nav icon:
        if (trigger) {
            // Prevent default if it's a link
            e.preventDefault();
            toggleCart();
        }
    });

    // 3. Checkout Button Listener (Sidebar)
    const checkoutBtns = document.querySelectorAll('.checkout-btn');
    checkoutBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            window.location.href = 'cart.html';
        });
    });

    // 4. Full Checkout Button (Cart Page)
    const fullCheckoutBtn = document.querySelector('.checkout-full-btn');
    if (fullCheckoutBtn) {
        fullCheckoutBtn.onclick = () => {
            if (cart.length === 0) {
                showToast('Cart is Empty', 'Add some products first!', 'error');
                return;
            }

            // Show Premium Success Modal
            showSuccessModal();

            // Clear Cart Logic happens when they close/continue from modal
        };
    }

    // Initial UI Update
    updateCartUI();
});

// Premium Success Modal System
function showSuccessModal() {
    let modal = document.querySelector('.success-modal-overlay');
    if (!modal) {
        modal = document.createElement('div');
        modal.className = 'success-modal-overlay';
        document.body.appendChild(modal);
    }

    const orderId = '#ORD-' + Math.floor(Math.random() * 100000);
    const total = document.getElementById('total-final-price') ? document.getElementById('total-final-price').innerText : '$0';

    modal.innerHTML = `
        <div class="success-modal">
            <div class="checkmark-wrapper">
                <svg class="checkmark-svg" viewBox="0 0 50 50">
                    <path d="M10 25 L20 35 L40 15" />
                </svg>
            </div>
            <h2>Payment Successful!</h2>
            <p>Thank you for your purchase.</p>
            
            <div class="order-receipt">
                <div class="receipt-row">
                    <span>Order ID</span>
                    <span>${orderId}</span>
                </div>
                <div class="receipt-row">
                    <span>Amount Paid</span>
                    <span>${total}</span>
                </div>
                <div class="receipt-row">
                    <span>Status</span>
                    <span style="color: #00ff88">Completed</span>
                </div>
            </div>

            <button class="btn btn-primary modal-btn" onclick="finishOrder()">Continue Shopping <i class="fas fa-arrow-right"></i></button>
        </div>
    `;

    // Activate
    setTimeout(() => modal.classList.add('active'), 10);

    // Confetti Effect (Optional simple CSS implementation or link to library, skipping for now to keep it native)
}

function finishOrder() {
    // Clear Cart
    cart = [];
    saveCart();
    updateCartUI();
    if (window.renderCartPage) window.renderCartPage();

    // Close Modal
    const modal = document.querySelector('.success-modal-overlay');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 500);
    }

    // Redirect to Home
    setTimeout(() => window.location.href = 'index.html', 500);
}

// Global exposure
window.finishOrder = finishOrder;
window.showSuccessModal = showSuccessModal;

// Toast Notificaton System
function showToast(title, message, type = 'success') {
    // Create element if it doesn't exist
    let toast = document.querySelector('.toast-notification');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast-notification';
        document.body.appendChild(toast);
    }

    // Icon based on type
    const iconClass = type === 'success' ? 'fa-check' : 'fa-exclamation';
    const iconColor = type === 'success' ? 'var(--primary)' : 'var(--accent)';
    const borderColor = type === 'success' ? 'var(--primary)' : 'var(--accent)';

    toast.style.borderColor = borderColor;

    toast.innerHTML = `
        <div class="toast-icon" style="background: ${iconColor}">
            <i class="fas ${iconClass}"></i>
        </div>
        <div class="toast-content">
            <h4>${title}</h4>
            <p>${message}</p>
        </div>
    `;

    // Show
    setTimeout(() => toast.classList.add('active'), 10);

    // Hide after 3s
    setTimeout(() => {
        toast.classList.remove('active');
    }, 3000);
}

// Expose globally
window.showToast = showToast;

// Expose functions globally
window.addToCart = addToCart;
window.addToCartById = addToCartById;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.toggleCart = toggleCart;
