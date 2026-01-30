document.addEventListener('DOMContentLoaded', () => {
    // Render Categories
    const categoryGrid = document.querySelector('.category-grid');
    if (categoryGrid) {
        categories.forEach(cat => {
            const card = document.createElement('div');
            card.className = 'category-card';
            card.innerHTML = `
                <i class="fas ${cat.icon}"></i>
                <h4>${cat.name}</h4>
            `;
            categoryGrid.appendChild(card);
        });
    }

    // Render Featured Products
    const productGrid = document.getElementById('product-grid');
    if (productGrid) {
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.style.cursor = 'pointer';
            card.onclick = () => window.location.href = `product.html?id=${product.id}`;

            card.innerHTML = `
                <div class="card-img">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="card-info">
                    <span class="category-tag">${product.category}</span>
                    <h4>${product.name}</h4>
                    <div class="price-row">
                        <span class="price">$${product.price}</span>
                        <div class="rating">
                            <i class="fas fa-star"></i> 4.9
                        </div>
                    </div>
                </div>
            `;
            productGrid.appendChild(card);
        });
    }

    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuBtn.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });
    }
});

// Function to handle product click (navigation to detailed view)


// Function to handle product click (navigation to detailed view)
function openProduct(id) {
    // For now, let's just log. Later we will implement the page change.
    console.log(`Opening product ${id}`);
    window.location.href = `product.html?id=${id}`;
}

// --- Professional Scroll Animations ---
const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            entry.target.classList.remove('reveal-hidden');
            observer.unobserve(entry.target); // Run once
        }
    });
}, observerOptions);

// Apply animations to elements
document.querySelectorAll('section, .section-header, .hero-image').forEach(el => {
    el.classList.add('reveal-hidden');
    revealObserver.observe(el);
});

// Staggered Animation for Grids
function observeGrids() {
    const grids = document.querySelectorAll('.product-grid, .category-grid');
    grids.forEach(grid => {
        const children = grid.children;
        Array.from(children).forEach((child, index) => {
            child.classList.add('reveal-hidden');
            // Cycle through delays 1-5
            const delayClass = `stagger-delay-${(index % 5) + 1}`;
            child.classList.add(delayClass);
            revealObserver.observe(child);
        });
    });
}

// Ensure grid items are observed after they are rendered
setTimeout(observeGrids, 100);
// Also run when dynamic content might be loaded
const originalAppendChild = Element.prototype.appendChild;
// Simple observer re-run for dynamic content (optional, but good for stability)




// --- Search Functionality ---
document.addEventListener('DOMContentLoaded', () => {
    const searchOverlay = document.getElementById('search-overlay');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const closeSearchBtn = document.getElementById('close-search');
    const searchTriggers = document.querySelectorAll('.fa-search'); // Select all search icons

    // Open Search
    searchTriggers.forEach(trigger => {
        trigger.parentElement.style.cursor = 'pointer'; // Ensure it looks clickable
        trigger.addEventListener('click', () => {
            searchOverlay.classList.add('open');
            setTimeout(() => searchInput.focus(), 100);
        });
    });

    // Close Search
    const closeSearch = () => {
        searchOverlay.classList.remove('open');
        searchInput.value = '';
        searchResults.innerHTML = '';
    };

    if (closeSearchBtn) closeSearchBtn.addEventListener('click', closeSearch);

    // Close on click outside (optional, but good UX)
    searchOverlay.addEventListener('click', (e) => {
        if (e.target === searchOverlay) closeSearch();
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchOverlay.classList.contains('open')) closeSearch();
    });

    // Search Logic
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        searchResults.innerHTML = '';

        if (query.length === 0) return;

        // Filter products (using the global products array)
        const filtered = products.filter(p =>
            p.name.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query)
        );

        if (filtered.length === 0) {
            searchResults.innerHTML = '<div style="color:white; text-align:center;">No products found</div>';
            return;
        }

        filtered.forEach(product => {
            const div = document.createElement('div');
            div.className = 'search-card';
            div.onclick = () => window.location.href = `product.html?id=${product.id}`;
            div.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h4>${product.name}</h4>
                <div class="price">$${product.price}</div>
            `;
            searchResults.appendChild(div);
        });
    });
});
