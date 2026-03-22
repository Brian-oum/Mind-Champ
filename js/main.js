window.addEventListener('load', function() {
    const preloaderOrbit = document.getElementById('preloader-orbit');
    
    // Slight delay before reveal
    setTimeout(() => {
        preloaderOrbit.classList.add('fade-out');
    }, 10000); 
});

const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

// 6 seconds gives the user time to read the text 
// (1.5s for fade + 4.5s of reading time)
setInterval(nextSlide, 6000);

let lastScrollTop = 0;
const navbar = document.getElementById('mainNav');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // If scrolling down and past the navbar height, hide it
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar.classList.add('nav-up');
    } else {
        // If scrolling up, show it
        navbar.classList.remove('nav-up');
    }
    
    lastScrollTop = scrollTop;
});
    // Counter Animation Logic
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower

    const runCounter = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    // Intersection Observer to run counter when section is in view
    const statsSection = document.querySelector('.meet-waridi-section');
    const options = {
        root: null,
        threshold: 0.4 // Run when 40% of the section is visible
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                runCounter();
                observer.unobserve(entry.target); // Run only once
            }
        });
    }, options);

    observer.observe(statsSection);