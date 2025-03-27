document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('slider');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const dotsContainer = document.getElementById('dots-container');

    const heading = document.getElementById("heading");

    heading.addEventListener("mouseover", changeColor)
    heading.addEventListener("mouseout", changeColorBack)

                           
    function changeColor() {
        // heading.style.color = colorGenerator();
        heading.style.color = "red";
        console.log("COLOR");
        
    }
    function changeColorBack() {
        // heading.style.color = colorGenerator();
        heading.style.color = "white";
        console.log("COLOR");
        
    }

    
    let currentIndex = 0;
    let interval;
    const slideInterval = 5000; // 5 seconds
    
    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    
    function updateSliderPosition() {
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function goToSlide(index) {
        currentIndex = index;
        updateSliderPosition();
        resetInterval();
        colorGenerator();
    }
    
    function goToNextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSliderPosition();
        resetInterval();
        colorGenerator();
    }
    
    function goToPrevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSliderPosition();
        resetInterval();
        colorGenerator();
    }
    
    function resetInterval() {
        clearInterval(interval);
        interval = setInterval(goToNextSlide, slideInterval);
    }
    
    // Event listeners
    nextButton.addEventListener('click', goToNextSlide);
    prevButton.addEventListener('click', goToPrevSlide);
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            goToPrevSlide();
        } else if (e.key === 'ArrowRight') {
            goToNextSlide();
        }
    });
       
    // Start automatic sliding
    interval = setInterval(goToNextSlide, slideInterval);
    
    // Pause automatic sliding when hovering over the slider
    slider.addEventListener('mouseenter', () => clearInterval(interval));
    slider.addEventListener('mouseleave', resetInterval);
});

function colorGenerator() {
    let str = "#"

    randomCol = '1234567890abcdef'
    
    for(let i = 0; i < 6; i++) {
        let randomIndex = Math.floor(Math.random() * randomCol.length);
        str += randomCol.charAt(randomIndex);
    }
    
    console.log(str);

    let body = document.body;
    body.style.backgroundColor = str;

}