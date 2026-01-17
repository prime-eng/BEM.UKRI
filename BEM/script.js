// 1. Fungsi Toggle Accordion Menteri & Bidang
function toggleMinister(header) {
    // Mengambil elemen utama menteri (.minister-item)
    const item = header.parentElement;
    
    // Menutup kementerian lain yang sedang terbuka (opsional, agar tetap rapi)
    const allItems = document.querySelectorAll('.minister-item');
    allItems.forEach(i => {
        if (i !== item) {
            i.classList.remove('active');
        }
    });

    // Toggle class active pada elemen yang diklik
    item.classList.toggle('active');
}

// 2. Toggle Mobile Menu
const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    if(navLinks.classList.contains('active')) {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '70px';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'white';
        navLinks.style.padding = '20px';
        navLinks.style.borderBottom = '4px solid #043927';
        navLinks.style.zIndex = '999';
    } else {
        navLinks.style.display = 'none';
    }
});

// 3. Smooth Scroll untuk Navigasi
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Menutup menu mobile otomatis setelah klik link
        if(navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            navLinks.style.display = 'none';
        }

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// 4. Efek Muncul (Reveal) Saat Scroll
const observerOptions = {
    threshold: 0.1
};

const revealOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

// Menerapkan efek pada profile card dan item menteri
document.querySelectorAll('.profile-card, .minister-item, .proker-card').forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "all 0.6s ease-out";
    revealOnScroll.observe(el);
});