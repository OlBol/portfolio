interface SliderOptions {
    slider: HTMLElement;
    scrollBtnToPrev: HTMLButtonElement;
    scrollBtnToNext: HTMLButtonElement;
}

/**
 * @description Reviews slider.
 */
export default function reviewSlider(options: SliderOptions) {
    const slider = options.slider;
    const scrollBtnToPrev = options.scrollBtnToPrev;
    const scrollBtnToNext = options.scrollBtnToNext;
    const numberOfSlides = slider.children.length;
    const step = 15;
    let sliderPosition = 0;
    let currentSlide = 1;
    let start: number = null;
    let targetBtn: string = null;

    changeBtnState();
    trackSliderResizing();

    scrollBtnToPrev.addEventListener('click', () => {
        start = null;
        targetBtn = 'prev';

        if (currentSlide > 1) {
            currentSlide--;
            changeBtnState();
            requestAnimationFrame(countStep);
        }
    });

    scrollBtnToNext.addEventListener('click', () => {
        start = null;
        targetBtn = 'next';

        if (currentSlide < numberOfSlides) {
            currentSlide++;
            changeBtnState();
            requestAnimationFrame(countStep);
        }
    });

    /**
     * @description The buttons are disabled if the slider has nowhere to scroll.
     */
    function changeBtnState() {
        if (currentSlide === 1) scrollBtnToPrev.disabled = true;
        if (currentSlide === 2) scrollBtnToPrev.disabled = false;
        if (currentSlide === slider.children.length - 1) scrollBtnToNext.disabled = false;
        if (currentSlide === slider.children.length) scrollBtnToNext.disabled = true;
    }

    /**
     * @description Step for requestAnimationFrame to scroll a review.
     * @param time {number} - animation start time.
     */
    function countStep(time: number) {
        const sliderWidth = window.innerWidth < 768 ? slider.offsetWidth : slider.offsetWidth / 2;

        if (targetBtn === 'next' && -sliderPosition < (currentSlide - 1) * sliderWidth - step) {
            sliderPosition = sliderPosition - step;
            slider.style.transform = `translateX(${sliderPosition}px)`;

            requestAnimationFrame(countStep);
        } else if (targetBtn === 'prev' && -sliderPosition > (currentSlide - 1) * sliderWidth + step) {
            sliderPosition = sliderPosition + step;
            slider.style.transform = `translateX(${sliderPosition}px)`;

            requestAnimationFrame(countStep);
        } else {
            sliderPosition = -(currentSlide - 1) * sliderWidth;
            slider.style.transform = `translateX(${sliderPosition}px)`;
        }
    }

    /**
     * The position of the slider is recalculated when the width of the slider is changed.
     */
    function trackSliderResizing() {
        window.addEventListener('resize', () => {
            if (window.innerWidth < 768) {
                sliderPosition = -(currentSlide - 1) * slider.offsetWidth;
                slider.style.transform = `translateX(${sliderPosition}px)`;
            } else {
                sliderPosition = -(currentSlide - 1) * slider.offsetWidth / 2;
                slider.style.transform = `translateX(${sliderPosition}px)`;
            }
        });
    }
}
