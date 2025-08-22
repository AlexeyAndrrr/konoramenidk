// Reviews Page JavaScript

// DOM Elements
const branchCards = document.querySelectorAll('.branch-selection-reviews .branch-card');
const writeReviewSection = document.getElementById('write-review-section');
const reviewForm = document.getElementById('review-form');
const showReviewFormBtn = document.getElementById('show-review-form');
const reviewsList = document.getElementById('reviews-list');
const noReviews = document.getElementById('no-reviews');
const reviewBranchSelect = document.getElementById('review-branch');

// Current selected branch
let selectedBranch = null;

// Sample reviews data (in real app, this would come from a database)
const sampleReviews = {
    1: [ // KONO Центр
        {
            name: 'Анна',
            rating: 5,
            text: 'Отличный ресторан! Блюда очень вкусные, атмосфера уютная. Обязательно вернусь снова!',
            date: '2 дня назад',
            branch: 'KONO Центр'
        },
        {
            name: 'Дмитрий',
            rating: 4,
            text: 'Хорошая еда, быстрое обслуживание. Цены приемлемые для такого качества.',
            date: '1 неделю назад',
            branch: 'KONO Центр'
        }
    ],
    2: [ // KONO Север
        {
            name: 'Михаил',
            rating: 4,
            text: 'Хорошая еда, но долго готовили. Персонал вежливый, порции большие.',
            date: '1 неделю назад',
            branch: 'KONO Север'
        }
    ],
    3: [ // KONO Юг
        {
            name: 'Елена',
            rating: 5,
            text: 'Потрясающий рамен! Самый вкусный в городе. Атмосфера как в Японии.',
            date: '2 недели назад',
            branch: 'KONO Юг'
        },
        {
            name: 'Сергей',
            rating: 5,
            text: 'Отличное место для семейного ужина. Дети в восторге от персонажей!',
            date: '3 недели назад',
            branch: 'KONO Юг'
        }
    ],
    4: [], // KONO Запад - нет отзывов
    5: []  // KONO Восток - нет отзывов
};

// Initialize reviews page
document.addEventListener('DOMContentLoaded', () => {
    initializeBranchSelection();
    initializeReviewForm();
    initializeShowReviewForm();
    
    // Check if there's a saved branch selection
    const savedBranch = localStorage.getItem('kono-selected-branch');
    if (savedBranch) {
        const branchCard = document.querySelector(`[data-branch="${savedBranch}"]`);
        if (branchCard) {
            selectBranch(branchCard);
        }
    }
});

// Initialize branch selection functionality
function initializeBranchSelection() {
    branchCards.forEach(card => {
        card.addEventListener('click', () => {
            selectBranch(card);
        });
    });
}

// Select branch and show reviews
function selectBranch(card) {
    // Remove previous selection
    branchCards.forEach(c => c.classList.remove('selected'));
    
    // Select current card
    card.classList.add('selected');
    selectedBranch = card.dataset.branch;
    
    // Update review form branch selection
    reviewBranchSelect.value = selectedBranch;
    
    // Show reviews for selected branch
    showReviewsForBranch(selectedBranch);
    
    // Save selection to localStorage
    localStorage.setItem('kono-selected-branch', selectedBranch);
    
    // Show write review section
    showWriteReviewSection();
}

// Show reviews for specific branch
function showReviewsForBranch(branchId) {
    const reviews = sampleReviews[branchId] || [];
    
    if (reviews.length === 0) {
        showNoReviews();
    } else {
        showReviews(reviews);
    }
}

// Show reviews list
function showReviews(reviews) {
    reviewsList.style.display = 'block';
    noReviews.style.display = 'none';
    
    // Clear existing reviews
    reviewsList.innerHTML = '';
    
    // Add reviews with animation
    reviews.forEach((review, index) => {
        const reviewElement = createReviewElement(review);
        reviewElement.style.animationDelay = `${index * 0.1}s`;
        reviewsList.appendChild(reviewElement);
    });
}

// Show no reviews message
function showNoReviews() {
    reviewsList.style.display = 'none';
    noReviews.style.display = 'block';
}

// Create review element
function createReviewElement(review) {
    const reviewElement = document.createElement('div');
    reviewElement.className = 'review-item';
    
    const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
    
    reviewElement.innerHTML = `
        <div class="review-header">
            <div class="reviewer-info">
                <div class="reviewer-avatar">👤</div>
                <div class="reviewer-details">
                    <h4 class="reviewer-name">${review.name}</h4>
                    <div class="review-rating">${stars}</div>
                </div>
            </div>
            <div class="review-date">${review.date}</div>
        </div>
        <div class="review-content">
            <p>${review.text}</p>
        </div>
        <div class="review-branch">
            <span>Филиал: ${review.branch}</span>
        </div>
    `;
    
    return reviewElement;
}

// Show write review section
function showWriteReviewSection() {
    writeReviewSection.style.display = 'block';
    writeReviewSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
    });
}

// Initialize review form
function initializeReviewForm() {
    reviewForm.addEventListener('submit', handleReviewSubmit);
    
    // Auto-fill branch if one is selected
    reviewBranchSelect.addEventListener('change', () => {
        if (reviewBranchSelect.value) {
            selectedBranch = reviewBranchSelect.value;
            // Update branch selection display
            branchCards.forEach(c => c.classList.remove('selected'));
            const selectedCard = document.querySelector(`[data-branch="${selectedBranch}"]`);
            if (selectedCard) {
                selectedCard.classList.add('selected');
            }
        }
    });
}

// Initialize show review form button
function initializeShowReviewForm() {
    showReviewFormBtn.addEventListener('click', () => {
        if (selectedBranch) {
            showWriteReviewSection();
        } else {
            showBranchSelectionMessage();
        }
    });
}

// Show message to select branch first
function showBranchSelectionMessage() {
    const message = document.createElement('div');
    message.className = 'branch-selection-message';
    message.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--kono-white);
            padding: 30px;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            text-align: center;
            max-width: 400px;
        ">
            <div style="font-size: 3rem; margin-bottom: 20px;">🏪</div>
            <h3 style="color: var(--kono-blue); margin-bottom: 15px;">Сначала выберите филиал</h3>
            <p style="color: var(--kono-gray); margin-bottom: 20px;">Чтобы оставить отзыв, выберите филиал выше</p>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: var(--kono-orange);
                color: var(--kono-white);
                border: none;
                padding: 12px 24px;
                border-radius: 15px;
                cursor: pointer;
                font-weight: 600;
            ">Понятно</button>
        </div>
    `;
    
    document.body.appendChild(message);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (message.parentNode) {
            message.remove();
        }
    }, 5000);
}

// Handle review form submission
function handleReviewSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(reviewForm);
    const reviewData = {
        name: formData.get('name'),
        rating: parseInt(formData.get('rating')),
        text: formData.get('text'),
        branch: formData.get('branch'),
        date: 'Только что'
    };
    
    // Add loading state
    const submitBtn = reviewForm.querySelector('.submit-review-btn');
    submitBtn.classList.add('loading');
    submitBtn.textContent = 'Отправляем...';
    
    // Simulate form submission
    setTimeout(() => {
        // Remove loading state
        submitBtn.classList.remove('loading');
        submitBtn.textContent = 'Отправить отзыв';
        
        // Add review to data
        const branchId = reviewData.branch;
        if (!sampleReviews[branchId]) {
            sampleReviews[branchId] = [];
        }
        sampleReviews[branchId].unshift(reviewData);
        
        // Show success message
        showSuccessMessage();
        
        // Reset form
        reviewForm.reset();
        
        // Update reviews display
        showReviewsForBranch(branchId);
        
        // Scroll to reviews
        setTimeout(() => {
            document.querySelector('.reviews-display').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 1000);
    }, 2000);
}

// Show success message
function showSuccessMessage() {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <div style="display: flex; align-items: center; gap: 15px;">
            <div style="font-size: 1.5rem;">✅</div>
            <div>
                <h4 style="margin: 0 0 5px 0;">Спасибо за отзыв!</h4>
                <p style="margin: 0;">Ваш отзыв успешно добавлен</p>
            </div>
        </div>
    `;
    
    // Insert before form
    reviewForm.parentNode.insertBefore(successMessage, reviewForm);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (successMessage.parentNode) {
            successMessage.remove();
        }
    }, 5000);
}

// Global function for onclick (accessible from HTML)
window.showReviewForm = function() {
    if (selectedBranch) {
        showWriteReviewSection();
    } else {
        showBranchSelectionMessage();
    }
};

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any open modals or messages
        const messages = document.querySelectorAll('.branch-selection-message');
        messages.forEach(message => message.remove());
    }
});

// Add form validation
function validateReviewForm() {
    const name = document.getElementById('reviewer-name').value.trim();
    const rating = document.querySelector('input[name="rating"]:checked');
    const text = document.getElementById('review-text').value.trim();
    const branch = document.getElementById('review-branch').value;
    
    let isValid = true;
    
    // Clear previous error states
    clearFormErrors();
    
    if (!name) {
        showFieldError('reviewer-name', 'Введите ваше имя');
        isValid = false;
    }
    
    if (!rating) {
        showFieldError('review-rating', 'Выберите оценку');
        isValid = false;
    }
    
    if (!text) {
        showFieldError('review-text', 'Введите текст отзыва');
        isValid = false;
    }
    
    if (!branch) {
        showFieldError('review-branch', 'Выберите филиал');
        isValid = false;
    }
    
    return isValid;
}

// Show field error
function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #f44336;
        font-size: 14px;
        margin-top: 5px;
        animation: fadeIn 0.3s ease-out;
    `;
    
    field.parentNode.appendChild(errorDiv);
    field.style.borderColor = '#f44336';
}

// Clear form errors
function clearFormErrors() {
    const errors = document.querySelectorAll('.field-error');
    errors.forEach(error => error.remove());
    
    const fields = reviewForm.querySelectorAll('input, textarea, select');
    fields.forEach(field => {
        field.style.borderColor = '';
    });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    .field-error {
        color: #f44336;
        font-size: 14px;
        margin-top: 5px;
    }
`;
document.head.appendChild(style);

// Add analytics tracking
function trackReviewAction(action, data) {
    // Here you would typically send data to analytics service
    console.log('Review Action:', { action, data, timestamp: new Date().toISOString() });
}

// Track review form interactions
reviewForm.addEventListener('submit', () => {
    trackReviewAction('submit_review', {
        branch: selectedBranch,
        timestamp: new Date().toISOString()
    });
});

// Track branch selection
branchCards.forEach(card => {
    card.addEventListener('click', () => {
        trackReviewAction('select_branch', {
            branch: card.dataset.branch,
            branchName: card.querySelector('h3').textContent
        });
    });
});

// Performance optimization: lazy load reviews
if ('IntersectionObserver' in window) {
    const reviewObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe review items for animation
    document.addEventListener('DOMContentLoaded', () => {
        const reviewItems = document.querySelectorAll('.review-item');
        reviewItems.forEach(item => {
            reviewObserver.observe(item);
        });
    });
}

// Add smooth scrolling for better UX
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

// Error handling
window.addEventListener('error', (e) => {
    console.error('KONO Reviews Error:', e.error);
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Reviews Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }, 0);
    });
}
