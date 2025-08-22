// DOM Elements
const header = document.getElementById('header');
const branchCards = document.querySelectorAll('.branch-card');
const supportSection = document.getElementById('support-section');
const supportBtn = document.getElementById('support-btn');

// Selected branch state
let selectedBranch = null;

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Branch selection functionality
branchCards.forEach(card => {
    card.addEventListener('click', () => {
        // Remove previous selection
        branchCards.forEach(c => c.classList.remove('selected'));
        
        // Select current card
        card.classList.add('selected');
        selectedBranch = card.dataset.branch;
        
        // Show support section
        showSupportSection();
        
        // Update support button
        updateSupportButton();
        
        // Smooth scroll to support section
        setTimeout(() => {
            supportSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'center'
            });
        }, 300);
    });
});

// Show support section when branch is selected
function showSupportSection() {
    supportSection.style.display = 'block';
    supportSection.style.animation = 'fadeInUp 0.8s ease-out';
}

// Update support button text and state
function updateSupportButton() {
    if (selectedBranch) {
        const branchName = document.querySelector(`[data-branch="${selectedBranch}"] h3`).textContent;
        supportBtn.textContent = `Поддержать ${branchName}`;
        supportBtn.disabled = false;
    } else {
        supportBtn.textContent = 'Выберите филиал для поддержки';
        supportBtn.disabled = true;
    }
}

// Support button click handler
supportBtn.addEventListener('click', () => {
    if (selectedBranch) {
        // Here you would typically redirect to the official support page
        // or open a payment modal
        alert(`Спасибо за желание поддержать филиал! Вы будете перенаправлены на официальный сайт для поддержки ${selectedBranch}.`);
        
        // Example: redirect to official site (replace with actual URL)
        // window.open('https://official-kono-site.com/support', '_blank');
    }
});

// Smooth scrolling for navigation links
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





// Add hover effects for interactive elements
document.querySelectorAll('.nav-link, .character-card, .menu-item').forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.transform = this.style.transform || 'scale(1.02)';
    });
    
    element.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// Функциональность звездочек рейтинга
document.addEventListener('DOMContentLoaded', () => {
    const stars = document.querySelectorAll('.star');
    let selectedRating = 0;

    stars.forEach(star => {
        star.addEventListener('click', () => {
            const rating = parseInt(star.dataset.rating);
            selectedRating = rating;
            
            // Обновляем активные звезды
            stars.forEach((s, index) => {
                if (index < rating) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });
    });

    // Обработка формы отзыва
    const reviewForm = document.getElementById('review-form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (selectedRating === 0) {
                alert('Пожалуйста, поставьте оценку!');
                return;
            }
            
            const formData = new FormData(reviewForm);
            const name = formData.get('name') || reviewForm.querySelector('input[type="text"]').value;
            const text = formData.get('text') || reviewForm.querySelector('textarea').value;
            
            // Здесь можно добавить отправку данных на сервер
            alert(`Спасибо за отзыв, ${name}! Ваша оценка: ${selectedRating} звезд`);
            
            // Очищаем форму
            reviewForm.reset();
            selectedRating = 0;
            stars.forEach(star => star.classList.remove('active'));
        });
    }
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Check if there's a saved branch selection
    const savedBranch = localStorage.getItem('kono-selected-branch');
    if (savedBranch) {
        const branchCard = document.querySelector(`[data-branch="${savedBranch}"]`);
        if (branchCard) {
            branchCard.click();
        }
    }
});

// Save branch selection to localStorage
function saveBranchSelection() {
    if (selectedBranch) {
        localStorage.setItem('kono-selected-branch', selectedBranch);
    }
}

// Update save function when branch is selected
branchCards.forEach(card => {
    card.addEventListener('click', saveBranchSelection);
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        // Add focus styles for keyboard navigation
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    // Remove keyboard navigation styles on mouse use
    document.body.classList.remove('keyboard-navigation');
});

// Add loading states for better UX
function showLoading(element) {
    element.style.opacity = '0.6';
    element.style.pointerEvents = 'none';
}

function hideLoading(element) {
    element.style.opacity = '1';
    element.style.pointerEvents = 'auto';
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('KONO Website Error:', e.error);
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }, 0);
    });
}




