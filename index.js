document.addEventListener('DOMContentLoaded', function () {
    const sliderContent = document.getElementById('slider-contentA');
    const nextBtn = document.getElementById('nextA');
    const prevBtn = document.getElementById('prevA');
    let currentIndex = 0;

    nextBtn.addEventListener('click', () => {
        currentIndex++;
        updateSlider();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex--;
        updateSlider();
    });

    function updateSlider() {
        const totalSlides = sliderContent.children.length;
        const slideWidth = sliderContent.children[0].offsetWidth;

        // Update the transform to show the current slide
        sliderContent.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

        // Disable buttons if at the start or end
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= totalSlides - 1;
    }

    // Initialize the slider
    updateSlider();
});


