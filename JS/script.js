// navigimi ne mobile per bubble
document.addEventListener('DOMContentLoaded', function() {
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-bubble');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.querySelector('.header');

if (hamburger) {
hamburger.addEventListener('click', (e) => {
e.stopPropagation(); 
hamburger.classList.toggle('active');
navMenu.classList.toggle('active');

 // animcacioni i hamburger
const bars = document.querySelectorAll('.bar');
if (hamburger.classList.contains('active')) {
 bars[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
bars[1].style.opacity = '0';
bars[2].style.transform = 'rotate(-45deg) translate(4px, -4px)';
} else {
bars[0].style.transform = 'none';
bars[1].style.opacity = '1';
bars[2].style.transform = 'none';
}
});


//mbyllja e menuse mobile kur klikojme link
navLinks.forEach(link => {
link.addEventListener('click', (e) => {
if (window.innerWidth <= 768) {
hamburger.classList.remove('active');
navMenu.classList.remove('active');
// Reset hamburger animation
        const bars = document.querySelectorAll('.bar');
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    }
});
});

// mbyllja e menuse ne mobile kur klikojme jashte saj
document.addEventListener('click', (e) => {
if (window.innerWidth <= 768) {
const isClickInsideNav = navMenu.contains(e.target) || hamburger.contains(e.target);
if (!isClickInsideNav && navMenu.classList.contains('active')) {
hamburger.classList.remove('active');
navMenu.classList.remove('active');

 // Reset hamburger animation
        const bars = document.querySelectorAll('.bar');
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    }
}
});

// sfondi i header teksa behet scroll
window.addEventListener('scroll', () => {
if (window.scrollY > 50) {
header.classList.add('scrolled');
} else {
header.classList.remove('scrolled');
}
});
}
});

// Contact form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    // alert modal
    const alertModal = document.createElement('div');
    alertModal.className = 'alert-modal';
    alertModal.innerHTML = `
        <div class="alert-content">
            <div class="alert-icon">
                <i class="fas fa-check"></i>
            </div>
            <h3 class="alert-title">Sukses!</h3>
            <p class="alert-message">Faleminderit! Mesazhi juaj u dërgua me sukses.</p>
            <button class="alert-button">
                <i class="fas fa-thumbs-up"></i>
                Në rregull
            </button>
        </div>
    `;
    document.body.appendChild(alertModal);

    // mbyllja e alert
    const alertButton = alertModal.querySelector('.alert-button');
    alertButton.addEventListener('click', () => {
        alertModal.classList.remove('active');
    });

    // mbyllet kur klikojme jashte
    alertModal.addEventListener('click', (e) => {
        if (e.target === alertModal) {
            alertModal.classList.remove('active');
        }
    });

    // form validation 
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        clearErrors();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone') ? document.getElementById('phone').value.trim() : '';
        const message = document.getElementById('message').value.trim();
        
        let isValid = true;
        
        // name validation
        if (!name) {
            showError('name', 'Ju lutem shkruani emrin tuaj të plotë');
            isValid = false;
        }
        
        // email validation
        if (!email) {
            showError('email', 'Ju lutem shkruani adresën tuaj të emailit');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('email', 'Ju lutem shkruani një email valid');
            isValid = false;
        }
        
        // phone validation
        if (phone && !isValidPhone(phone)) {
            showError('phone', 'Ju lutem shkruani vetëm numra në fushën e telefonit');
            isValid = false;
        }
        
        // message validation
        if (!message) {
            showError('message', 'Ju lutem shkruani mesazhin tuaj');
            isValid = false;
        } else if (message.length < 10) {
            showError('message', 'Mesazhi duhet të jetë të paktën 10 karaktere');
            isValid = false;
        }
        
        if (!isValid) return;
        
        // loading
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Duke dërguar...';
        submitBtn.disabled = true;
        
        // stimulim per submission
        setTimeout(() => {
            // Reset form
            contactForm.reset();
            
            // alert me sukses
            showAlert();
            
            // reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });

    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const formGroup = field.closest('.form-group');
        formGroup.classList.add('error');
        
        let errorElement = formGroup.querySelector('.form-error');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'form-error';
            formGroup.appendChild(errorElement);
        }
        errorElement.textContent = message;
        
        // Scroll te errori i pare
        if (!document.querySelector('.form-group.error:first-child')) {
            field.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
    
    function clearErrors() {
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error');
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function isValidPhone(phone) {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        return phoneRegex.test(phone);
    }
    
    function showAlert() {
        alertModal.classList.add('active');
        
        // mbyllje pas 5 sek
        setTimeout(() => {
            if (alertModal.classList.contains('active')) {
                alertModal.classList.remove('active');
            }
        }, 5000);
    }
    
    // validim
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            const formGroup = this.closest('.form-group');
            formGroup.classList.remove('error');
        });
        
        input.addEventListener('blur', function() {
            // Optional: Add real-time validation on blur
        });
    });
}

// scroll animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries, observer) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add('animated');
}
});
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    // stats
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(item);
    });

    // headers
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        observer.observe(header);
    });

    // cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    //pse ne
    const whyUsGrid = document.querySelector('.why-us-grid');
    if (whyUsGrid) observer.observe(whyUsGrid);

    //features
    const featureItems = document.querySelectorAll('.feature');
    featureItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(item);
    });

    //kontakt
    const ctaSection = document.querySelector('.cta');
    if (ctaSection) observer.observe(ctaSection); 
});

//nav bubble ne scroll
const header = document.querySelector('.header');

if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Function i calculator
function initializeDeliveryCalculator() {
    const countrySelect = document.getElementById('country-select');
    const deliveryResult = document.getElementById('delivery-result');
    const resultCountry = document.getElementById('result-country');
    const resultDays = document.getElementById('result-days');
    
    if (!countrySelect) return;
    
    // Delivery time
    const deliveryTimes = {
        'albania': { days: '1-2', text: 'Dorëzim brenda 1-2 ditësh' },
        'kosovo': { days: '2-3', text: 'Dorëzim brenda 2-3 ditësh' },
        'north-macedonia': { days: '2-3', text: 'Dorëzim brenda 2-3 ditësh' },
        'montenegro': { days: '2-4', text: 'Dorëzim brenda 2-4 ditësh' },
        'greece': { days: '3-5', text: 'Dorëzim brenda 3-5 ditësh' },
        'italy': { days: '4-6', text: 'Dorëzim brenda 4-6 ditësh' },
        'germany': { days: '5-7', text: 'Dorëzim brenda 5-7 ditësh' },
        'liechtenstein': { days: '5-7', text: 'Dorëzim brenda 5-7 ditësh' },
        'austria': { days: '5-7', text: 'Dorëzim brenda 5-7 ditësh' },
        'france': { days: '6-8', text: 'Dorëzim brenda 6-8 ditësh' },
        'uk': { days: '6-8', text: 'Dorëzim brenda 6-8 ditësh' },
        'bosnia': { days: '3-4', text: 'Dorëzim brenda 3-4 ditësh' },
        'switzerland': { days: '5-7', text: 'Dorëzim brenda 5-7 ditësh' },
        'croatia': { days: '3-5', text: 'Dorëzim brenda 3-5 ditësh' },
        'bulgaria': { days: '4-6', text: 'Dorëzim brenda 4-6 ditësh' },
        'serbia': { days: '3-4', text: 'Dorëzim brenda 3-4 ditësh' },
        'turkey': { days: '7-10', text: 'Dorëzim brenda 7-10 ditësh' },
        'slovenia': { days: '4-6', text: 'Dorëzim brenda 4-6 ditësh' },
        'poland': { days: '6-8', text: 'Dorëzim brenda 6-8 ditësh' }
    };
    
    // Display i emrave ne shqip
    const countryNames = {
        'albania': 'Shqipëri',
        'kosovo': 'Kosovë',
        'north-macedonia': 'Maqedoni e Veriut',
        'montenegro': 'Mali i Zi',
        'greece': 'Greqi',
        'italy': 'Itali',
        'germany': 'Gjermani',
        'liechtenstein': 'Lihtenshtajn',
        'austria': 'Austri',
        'france': 'Francë',
        'uk': 'Mbretëri e Bashkuar',
        'bosnia': 'Bosnje dhe Hercegovinë',
        'switzerland': 'Zvicër',
        'croatia': 'Kroaci',
        'bulgaria': 'Bullgari',
        'serbia': 'Serbi',
        'turkey': 'Turqi',
        'slovenia': 'Slloveni',
        'poland': 'Poloni'
    };
    
    countrySelect.addEventListener('change', function() {
        const selectedValue = this.value;
        
        if (selectedValue && deliveryTimes[selectedValue]) {
            const deliveryInfo = deliveryTimes[selectedValue];
            const countryName = countryNames[selectedValue];
            
            resultCountry.textContent = countryName;
            resultDays.textContent = deliveryInfo.text;
            
            // rezultat ,me animacion
            deliveryResult.style.display = 'flex';
            deliveryResult.style.animation = 'fadeInUp 0.5s ease';
            
            if (typeof observer !== 'undefined') {
                observer.observe(deliveryResult);
            }
        } else {
            // fshehim rezultatin nqs skemi zgjedhur shtet
            deliveryResult.style.display = 'none';
        }
    });
    
    // inicializim ne refresh
    if (countrySelect.value && deliveryTimes[countrySelect.value]) {
        countrySelect.dispatchEvent(new Event('change'));
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initializeDeliveryCalculator();
});

  // Llogarites cmimesh
        document.getElementById('priceCalculatorForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const serviceType = document.getElementById('service-type').value;
            const distance = parseFloat(document.getElementById('distance').value);
            const weight = parseFloat(document.getElementById('weight').value);
            
            if (!serviceType || !distance || !weight) {
                alert('Ju lutem plotësoni të gjitha fushat!');
                return;
            }
            
            let basePrice = 0;
            let serviceName = '';
            
            switch(serviceType) {
                case 'freight':
                    basePrice = 0.5; // per km
                    serviceName = 'Transport Mallrash';
                    break;
                case 'express':
                    basePrice = 0.8;
                    serviceName = 'Transport Ekspres';
                    break;
            }
            
            const distancePrice = distance * basePrice;
            const weightPrice = weight * 0.1; // 0.1€ per kg
            const totalPrice = Math.round(distancePrice + weightPrice);
            
            document.getElementById('result-service').textContent = serviceName;
            document.getElementById('result-distance').textContent = distance + ' km';
            document.getElementById('result-weight').textContent = weight + ' kg';
            document.getElementById('result-price').textContent = totalPrice + '€';
            
            const resultCard = document.getElementById('price-result');
            resultCard.classList.add('active');
            resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });

        ['service-type', 'distance', 'weight'].forEach(id => {
            document.getElementById(id).addEventListener('input', function() {
                document.getElementById('price-result').classList.remove('active');
            });
        });

// carousel

document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    let currentSlide = 0;
    const totalSlides = slides.length;
    const slideInterval = 4000;
    let autoplayTimer = null;

    const navButtons = `
        <button class="carousel-nav prev">&#10094;</button>
        <button class="carousel-nav next">&#10095;</button>`;
    carousel.insertAdjacentHTML('beforeend', navButtons);

    const prevButton = carousel.querySelector('.prev');
    const nextButton = carousel.querySelector('.next');

    function showSlide(index) {
        if (index >= totalSlides) index = 0;
        if (index < 0) index = totalSlides - 1;

        slides.forEach(slide => {
            slide.style.opacity = '0';
            slide.style.display = 'none';
        });

        slides[index].style.display = 'block';
        setTimeout(() => {
            slides[index].style.opacity = '1';
        }, 10);

        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');

        currentSlide = index;
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startAutoplay() {
        if (autoplayTimer) clearInterval(autoplayTimer);
        autoplayTimer = setInterval(nextSlide, slideInterval);
    }

    function stopAutoplay() {
        if (autoplayTimer) {
            clearInterval(autoplayTimer);
            autoplayTimer = null;
        }
    }

    prevButton.addEventListener('click', () => {
        stopAutoplay();
        prevSlide();
        startAutoplay();
    });

    nextButton.addEventListener('click', () => {
        stopAutoplay();
        nextSlide();
        startAutoplay();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoplay();
            showSlide(index);
            startAutoplay();
        });
    });

    // ndalon ne hover
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);

    // Initialize
    showSlide(0);
    startAutoplay();
});


