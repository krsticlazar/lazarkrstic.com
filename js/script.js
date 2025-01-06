document.addEventListener("DOMContentLoaded", function() {
    
    //#region Navbar
    var navbar = document.querySelector('.navbar');
    var body = document.body;

    var currentPath = window.location.pathname.split("/").pop();
    var homeLink = document.getElementById('home-link');
    var projectsLink = document.getElementById('projects-link');
    var orderLink = document.getElementById('order-link');

    if (homeLink && (currentPath === 'index.html' || currentPath === '')) {
        homeLink.classList.add('active');
    } else if (projectsLink && currentPath === 'projects.html') {
        projectsLink.classList.add('active');
    } else if (orderLink && currentPath === 'order.html') {
        orderLink.classList.add('active');
    }
    //#endregion Navbar

    // #region Swiper initialization
    const customSwiper = new Swiper('.customSwiper', {
        loop: true, // Infinite scrolling
        speed: 1000,
        autoplay: {
            delay: 4000,
        },
        grabCursor: true,
        slidesPerView: 1,
        spaceBetween: 30,
        breakpoints: {
            767: {
                slidesPerView: 3, 
                spaceBetween: 10,
            }
        }
    });
    // #endregion Swiper initialization

    // #region Swiper initialization
    var mySwiper = new Swiper('.swiper-container', {
        loop: true,
        speed: 1000,
        autoplay: {
            delay: 3000,
        },
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: '2',
        spaceBetween: 0, // Razmak između slajdova
        coverflowEffect: {
            rotate: 0,
            stretch: 80,
            depth: 200,
            modifier: 1,
            slideShadows: false,
        },
        breakpoints: {
            767: {
                slidesPerView: 3, 
                spaceBetween: 10,
            }
        },
    
        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
    // #endregion Swiper initialization

    // #region Custom Cursor
    const customCursor = document.querySelector('.custom-cursor');
    const customCursorInner = document.querySelector('.custom-cursor-inner');
    let cursorX = 0, cursorY = 0;
    let delayX = 0, delayY = 0;
    let innerDelayX = 0, innerDelayY = 0;

    // Funkcija za pomeranje kursora
    document.addEventListener('mousemove', function(event) {
        cursorX = event.clientX;
        cursorY = event.clientY;
        customCursor.classList.remove('hidden'); // Prikaži krug
        customCursorInner.classList.remove('hidden'); // Prikaži manji krug
    });

    // Funkcija za kašnjenje pri praćenju miša
    function followCursor() {
        delayX += (cursorX - delayX) * 0.1; // Podešavanje kašnjenja
        delayY += (cursorY - delayY) * 0.1;
        innerDelayX += (cursorX - innerDelayX) * 0.2; // Brže kašnjenje za manji krug
        innerDelayY += (cursorY - innerDelayY) * 0.2;

        customCursor.style.transform = `translate(${delayX}px, ${delayY}px)`;
        customCursorInner.style.transform = `translate(${innerDelayX}px, ${innerDelayY}px)`;
        requestAnimationFrame(followCursor); // Ponavljanje animacije
    }
    followCursor();

    // Sakrij krug kada je miš van stranice
    document.addEventListener('mouseleave', function() {
        customCursor.classList.add('hidden');
        customCursorInner.classList.add('hidden');
    });

    // Onemogući kursor na mobilnim uređajima
    function disableCustomCursorOnMobile() {
        if (window.innerWidth <= 767.98) {
            customCursor.style.display = 'none';
            customCursorInner.style.display = 'none';
        } else {
            customCursor.style.display = 'block';
            customCursorInner.style.display = 'block';
        }
    }

    // Pozovi funkciju pri učitavanju stranice i promeni veličine prozora
    disableCustomCursorOnMobile();
    window.addEventListener('resize', disableCustomCursorOnMobile);
    // #endregion Custom Cursor

    // #region Fade-in efekat za p elemente
    const paragraphs = document.querySelectorAll("p");

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("fade-in");
                    observer.unobserve(entry.target); // Zaustavlja dalji nadzor za performanse
                }
            });
        },
        {
            threshold: 1.0, // Element se mora 100% prikazati u viewportu
        }
    );

    paragraphs.forEach(p => {
        observer.observe(p);
    });
    // #endregion Fade-in efekat za p elemente
    
    // #region FAQ toggle
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function () {
            const answer = this.nextElementSibling;
            const isExpanded = answer.classList.contains('open');
    
            // Zatvori sve odgovore
            faqQuestions.forEach(q => {
                const ans = q.nextElementSibling;
                ans.classList.remove('open');
                q.querySelector('.faq-toggle').textContent = '+';
            });
    
            // Otvori trenutni odgovor ako nije već otvoren
            if (!isExpanded) {
                answer.classList.add('open');
                this.querySelector('.faq-toggle').textContent = '-';
            }
        });
    });
    // #endregion FAQ toggle

    // #region Contact form
    const orderButtons = document.querySelectorAll('.order-btn');
    const subjectSelect = document.getElementById('subject');
    const contactFormSection = document.getElementById('contact-form');

    orderButtons.forEach(button => {
    button.addEventListener('click', function() {
        const subjectValue = this.getAttribute('data-subject');
        subjectSelect.value = subjectValue;

        // Scroll to contact form
        contactFormSection.scrollIntoView({ behavior: 'smooth' });
    });
    });
    //#endregion Contact form
});
