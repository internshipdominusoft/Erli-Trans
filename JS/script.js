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

        // Validate phone: optional, but if provided must contain only digits
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




