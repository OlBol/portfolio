/**
 * @description Smooth page scrolling for anchor links.
 */
export default function anchorScroll() {
    const links = document.querySelectorAll('a[href^="#"');
    const speed = 0.5;
    let coordAnchor: number;
    let windowY: number;
    let start: number;

    for(const link of links) {
        link.addEventListener('click', e => {
            e.preventDefault();

            const anchor = document.querySelector(link.getAttribute('href'));
            coordAnchor  = anchor.getBoundingClientRect().top;
            windowY = window.pageYOffset;
            start = null;

            requestAnimationFrame(countStep);
        });
    }

    /**
     * @description Step for requestAnimationFrame to scroll a page.
     * @param time {number} - animation start time.
     */
    function countStep(time: number) {
        if (start === null) start = time;

        const progress = time - start;

        const coordY =
            coordAnchor < 0
                ? Math.max(windowY - progress / speed, windowY + coordAnchor)
                : Math.min(windowY + progress / speed, windowY + coordAnchor);

        window.scrollTo(0, coordY);

        if (coordY !== windowY + coordAnchor) {
            requestAnimationFrame(countStep);

        }
    }
}
