// ============================================================
// NOVA LUXE - Dynamic Cart, Wishlist & Toast Engine
// ============================================================

let cart = JSON.parse(localStorage.getItem('NOVA_CART')) || [];

// Update Cart Badge Counters across UI
function updateCartUI() {
    const badgeElements = document.querySelectorAll('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    badgeElements.forEach(el => {
        el.innerText = totalItems;
    });
}

// Add Item to Shopping Cart
function addToCart(id, name, price, image) {
    const existingIndex = cart.findIndex(item => item.id === id);
    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({
            id: id,
            name: name,
            price: parseFloat(price),
            image: image,
            quantity: 1
        });
    }
    localStorage.setItem('NOVA_CART', JSON.stringify(cart));
    updateCartUI();
    showToast(`${name} added to your shopping bag!`);
}

// Custom Animated Toast Notification
function showToast(message) {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-notification';
        toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: #0b1329;
            color: #ffffff;
            padding: 14px 22px;
            border-radius: 10px;
            font-weight: 600;
            font-size: 14px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.25);
            z-index: 9999;
            transition: all 0.3s ease;
            transform: translateY(100px);
            opacity: 0;
            display: flex;
            align-items: center;
            gap: 10px;
            border-left: 4px solid #10b981;
        `;
        document.body.appendChild(toast);
    }
    
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #10b981;"></i> ${message}`;
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';

    setTimeout(() => {
        toast.style.transform = 'translateY(100px)';
        toast.style.opacity = '0';
    }, 3000);
}

// Initialize on Page Load
document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
});