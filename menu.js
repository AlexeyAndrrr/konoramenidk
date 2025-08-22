// Menu Page JavaScript

// DOM Elements
const filterTabs = document.querySelectorAll('.filter-tab');
const spiceFilter = document.getElementById('spice-level');
const priceFilter = document.getElementById('price-range');
const menuItems = document.querySelectorAll('.menu-item');
const orderButtons = document.querySelectorAll('.order-btn');

// Current filters state
let currentFilters = {
    category: 'all',
    spice: 'all',
    price: 'all'
};

// Initialize menu page
document.addEventListener('DOMContentLoaded', () => {
    initializeFilters();
    initializeOrderButtons();
    showAllItems();
});

// Initialize filter functionality
function initializeFilters() {
    // Category filter tabs
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Update current filter
            currentFilters.category = tab.dataset.category;
            
            // Apply filters
            applyFilters();
        });
    });
    
    // Spice level filter
    spiceFilter.addEventListener('change', () => {
        currentFilters.spice = spiceFilter.value;
        applyFilters();
    });
    
    // Price range filter
    priceFilter.addEventListener('change', () => {
        currentFilters.price = priceFilter.value;
        applyFilters();
    });
}

// Apply all current filters
function applyFilters() {
    menuItems.forEach(item => {
        const shouldShow = checkItemFilters(item);
        
        if (shouldShow) {
            showItem(item);
        } else {
            hideItem(item);
        }
    });
    
    // Update filter display
    updateFilterDisplay();
}

// Check if item matches current filters
function checkItemFilters(item) {
    const category = item.dataset.category;
    const spice = item.dataset.spice;
    const price = item.dataset.price;
    const isNew = item.dataset.new === 'true';
    
    // Category filter
    if (currentFilters.category !== 'all' && currentFilters.category !== category) {
        if (currentFilters.category === 'new' && !isNew) {
            return false;
        }
        if (currentFilters.category !== 'new') {
            return false;
        }
    }
    
    // Spice filter
    if (currentFilters.spice !== 'all' && currentFilters.spice !== spice) {
        return false;
    }
    
    // Price filter
    if (currentFilters.price !== 'all') {
        const itemPrice = getItemPrice(item);
        if (currentFilters.price === 'low' && itemPrice > 300) return false;
        if (currentFilters.price === 'medium' && (itemPrice < 300 || itemPrice > 600)) return false;
        if (currentFilters.price === 'high' && itemPrice < 600) return false;
    }
    
    return true;
}

// Get item price as number
function getItemPrice(item) {
    const priceText = item.querySelector('.item-price').textContent;
    return parseInt(priceText.replace('₽', ''));
}

// Show item with animation
function showItem(item) {
    item.classList.remove('hide');
    item.classList.add('show');
    
    // Add entrance animation
    item.style.animation = 'fadeInUp 0.6s ease-out forwards';
}

// Hide item with animation
function hideItem(item) {
    item.classList.add('hide');
    item.classList.remove('show');
}

// Show all items (reset filters)
function showAllItems() {
    menuItems.forEach(item => {
        showItem(item);
    });
}

// Update filter display
function updateFilterDisplay() {
    const visibleItems = document.querySelectorAll('.menu-item:not(.hide)');
    
    // Update filter tab counts if needed
    filterTabs.forEach(tab => {
        const category = tab.dataset.category;
        if (category !== 'all') {
            const count = getCategoryCount(category);
            updateTabCount(tab, count);
        }
    });
    
    // Show "no results" message if needed
    if (visibleItems.length === 0) {
        showNoResultsMessage();
    } else {
        hideNoResultsMessage();
    }
}

// Get count of items in category
function getCategoryCount(category) {
    let count = 0;
    menuItems.forEach(item => {
        if (category === 'new') {
            if (item.dataset.new === 'true') count++;
        } else if (item.dataset.category === category) {
            count++;
        }
    });
    return count;
}

// Update tab count display
function updateTabCount(tab, count) {
    let countElement = tab.querySelector('.count');
    if (!countElement) {
        countElement = document.createElement('span');
        countElement.className = 'count';
        countElement.style.cssText = `
            background: var(--kono-white);
            color: var(--kono-orange);
            border-radius: 50%;
            width: 20px;
            height: 20px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: 700;
            margin-left: 8px;
        `;
        tab.appendChild(countElement);
    }
    countElement.textContent = count;
}

// Show no results message
function showNoResultsMessage() {
    let noResults = document.getElementById('no-results');
    if (!noResults) {
        noResults = document.createElement('div');
        noResults.id = 'no-results';
        noResults.className = 'no-results';
        noResults.innerHTML = `
            <div style="text-align: center; padding: 60px 20px;">
                <div style="font-size: 4rem; margin-bottom: 20px;">🍜</div>
                <h3 style="color: var(--kono-gray); margin-bottom: 10px;">Ничего не найдено</h3>
                <p style="color: var(--kono-gray);">Попробуйте изменить фильтры</p>
            </div>
        `;
        
        const menuGrid = document.querySelector('.menu-items');
        menuGrid.appendChild(noResults);
    }
    noResults.style.display = 'block';
}

// Hide no results message
function hideNoResultsMessage() {
    const noResults = document.getElementById('no-results');
    if (noResults) {
        noResults.style.display = 'none';
    }
}

// Initialize order buttons
function initializeOrderButtons() {
    orderButtons.forEach(button => {
        button.addEventListener('click', handleOrder);
    });
}

// Handle order button click
function handleOrder(event) {
    const button = event.target;
    const menuItem = button.closest('.menu-item');
    const itemTitle = menuItem.querySelector('.item-title').textContent;
    const itemPrice = menuItem.querySelector('.item-price').textContent;
    
    // Add loading state
    button.classList.add('loading');
    button.textContent = 'Оформляем заказ';
    
    // Simulate order processing
    setTimeout(() => {
        // Remove loading state
        button.classList.remove('loading');
        button.textContent = 'Заказать';
        
        // Show success message
        showOrderSuccess(itemTitle, itemPrice);
        
        // Reset button
        button.textContent = 'Заказать';
    }, 2000);
}

// Show order success message
function showOrderSuccess(itemTitle, itemPrice) {
    // Create success notification
    const notification = document.createElement('div');
    notification.className = 'order-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">✅</div>
            <div class="notification-text">
                <h4>Заказ оформлен!</h4>
                <p>${itemTitle} - ${itemPrice}</p>
                <p>Спасибо за заказ! Мы свяжемся с вами в ближайшее время.</p>
            </div>
            <button class="notification-close">×</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--kono-white);
        border: 2px solid var(--kono-orange);
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        max-width: 350px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Add close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification-content {
        padding: 20px;
        display: flex;
        align-items: flex-start;
        gap: 15px;
    }
    
    .notification-icon {
        font-size: 2rem;
        flex-shrink: 0;
    }
    
    .notification-text h4 {
        margin: 0 0 5px 0;
        color: var(--kono-orange);
        font-size: 1.1rem;
    }
    
    .notification-text p {
        margin: 0 0 5px 0;
        color: var(--kono-gray);
        font-size: 0.9rem;
        line-height: 1.4;
    }
    
    .notification-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        color: var(--kono-gray);
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.3s ease;
        flex-shrink: 0;
    }
    
    .notification-close:hover {
        background: var(--kono-light-gray);
        color: var(--kono-black);
    }
`;
document.head.appendChild(style);

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any open notifications
        const notifications = document.querySelectorAll('.order-notification');
        notifications.forEach(notification => notification.remove());
    }
});

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Performance optimization: lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    // Observe all images
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add analytics tracking for menu interactions
function trackMenuInteraction(action, itemName) {
    // Here you would typically send data to analytics service
    console.log('Menu Interaction:', { action, itemName, timestamp: new Date().toISOString() });
}

// Track filter usage
function trackFilterUsage(filterType, filterValue) {
    trackMenuInteraction('filter', `${filterType}: ${filterValue}`);
}

// Update tracking for filters
filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        trackFilterUsage('category', tab.dataset.category);
    });
});

spiceFilter.addEventListener('change', () => {
    trackFilterUsage('spice', spiceFilter.value);
});

priceFilter.addEventListener('change', () => {
    trackFilterUsage('price', priceFilter.value);
});

// Track order attempts
orderButtons.forEach(button => {
    button.addEventListener('click', () => {
        const itemName = button.closest('.menu-item').querySelector('.item-title').textContent;
        trackMenuInteraction('order', itemName);
    });
});
