document.addEventListener('DOMContentLoaded', () => {
    // Navigation scroll state
    const nav = document.querySelector('.nav');
    const mobileToggle = document.querySelector('.nav__toggle');
    const mobileMenu = document.querySelector('.nav__mobile');

    if (nav) {
        const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('is-open');
        });
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => mobileMenu.classList.remove('is-open'));
        });
    }

    // Scroll reveal
    const revealEls = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => revealObserver.observe(el));

    // Skill bars animate on scroll
    const skillFills = document.querySelectorAll('.skill-item__fill');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.3 });
    skillFills.forEach(el => skillObserver.observe(el));

    // Typewriter effect
    const typeEl = document.getElementById('typewriter');
    if (typeEl && window.typewriterPhrases) {
        const phrases = window.typewriterPhrases;
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const current = phrases[phraseIndex];
            let speed = 100;

            if (isDeleting) {
                typeEl.textContent = current.substring(0, charIndex - 1);
                charIndex--;
                speed = 45;
            } else {
                typeEl.textContent = current.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === current.length) {
                isDeleting = true;
                speed = 2200;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                speed = 500;
            }

            setTimeout(type, speed);
        }

        type();
    }
});
