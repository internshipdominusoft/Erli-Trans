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

// forma e kontaktit
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
 //validimi
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone') ? document.getElementById('phone').value : '';
    const message = document.getElementById('message').value;
        
        if (!name || !email || !message) {
            alert('Ju lutem plotësoni të gjitha fushat e detyrueshme');
            return;
        }
        
        if (!email.includes('@')) {
            alert('Ju lutem shkruani një email valid');
            return;
        }

        if (phone && !/^\d+$/.test(phone)) {
            alert('Ju lutem shkruani vetëm numra në fushën e telefonit (pa shkronja ose simbole).');
            return;
        }
        
        const submitBtn = this.querySelector('button[type="submit"]');
        submitBtn.textContent = 'Duke dërguar...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Faleminderit! Mesazhi juaj u dërgua me sukses.');
            contactForm.reset();
            submitBtn.textContent = 'Dërgo Mesazhin';
            submitBtn.disabled = false;
        }, 1500);
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

