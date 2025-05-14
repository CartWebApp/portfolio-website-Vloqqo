document.addEventListener("DOMContentLoaded", () => {
    const currentPage = window.location.pathname;
// Basically, thgis will check if the current page is search
// Then it will make InteractionObserver to make scrolling work
    if (currentPage.includes('search.html')) {

        const listItems = document.querySelectorAll("ul li");
        const overflowDiv = document.querySelector(".overflow");
        let dynamicParagraph = document.createElement("p");
        dynamicParagraph.classList.add("dynamic-text");
        overflowDiv.appendChild(dynamicParagraph);

        const isMobile = window.matchMedia("(max-width: 768px)").matches;

        const observer = new IntersectionObserver((entries) => {
            let activeEntry = null;

            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    activeEntry = entry.target;

                    entry.target.classList.add("scrolled-in");

                    const text = entry.target.getAttribute("data-text") || "No additional information available.";
                    dynamicParagraph.textContent = text;
                    const rect = entry.target.getBoundingClientRect();

                    if (!isMobile) {
                        dynamicParagraph.style.animation = "none";
                        void dynamicParagraph.offsetWidth;
                        dynamicParagraph.style.animation = "1s slide-right 1 normal"; 
                        dynamicParagraph.style.left = `40vw`;
                        dynamicParagraph.style.top = `${rect.top + window.scrollY - 60}px`; 

                    } else {
                        // mobile needs animations disabled to function
                        dynamicParagraph.style.animation = "none";
                        dynamicParagraph.style.left = `45vw`; 
                        dynamicParagraph.style.top = `${rect.top + window.scrollY - 20}px`; 

                    }
                    dynamicParagraph.style.position = "absolute";
                    dynamicParagraph.classList.add("visible");
                } else {
                    entry.target.classList.remove("scrolled-in");
                    if (entry.target === activeEntry) {
                        dynamicParagraph.classList.remove("visible");
                        activeEntry = null;
                    }
                }
            });
        }, {
            threshold: 0.5,
        });
        listItems.forEach((item) => observer.observe(item));
    }
    // Checks if the page is the index page
    if (currentPage.includes('index.html')) {
    // Function to create carousel
    // Grabs all the elements that are needed for the carousel (ex .carousel)
    // Them it will create the carousel
        function initializeCarousel(container) {
            console.log('Initializing carousel for:', container);
            const carousel = container.querySelector('.carousel');
            const slides = container.querySelectorAll('.carousel-slide');
            const prevButton = container.querySelector('.carousel-button.prev');
            const nextButton = container.querySelector('.carousel-button.next');
            const dotsContainer = container.querySelector('.carousel-dots');
            let currentSlide = 0;
            const totalSlides = slides.length;

            slides.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(index));
                dotsContainer.appendChild(dot);
            });

            const dots = container.querySelectorAll('.dot');

            function updateDots() {
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentSlide);
                });
            }

            function goToSlide(slideIndex) {
                currentSlide = slideIndex;
                carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
                updateDots();
            }

            function nextSlide() {
                currentSlide = (currentSlide + 1) % totalSlides;
                goToSlide(currentSlide);
            }

            function prevSlide() {
                currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
                goToSlide(currentSlide);
            }
            nextButton.addEventListener('click', nextSlide);
            prevButton.addEventListener('click', prevSlide);
            const intervalId = setInterval(nextSlide, 5000);
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    clearInterval(intervalId);
                }
            });
        }
        const carouselContainers = document.querySelectorAll('.carousel-container');
        carouselContainers.forEach(container => initializeCarousel(container));

