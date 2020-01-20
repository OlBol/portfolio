interface HeaderOptions {
    header: HTMLElement;
}

/**
 * @description Fixating header on page while scrolling.
 * @param options {object} – an object with data points to a header element.
 */
export default function headerFixating(options: HeaderOptions) {
    const activeClass = 'is-active';
    const header = options.header;
    const startPoint =  header.getBoundingClientRect().bottom;

    window.addEventListener('scroll', toggleActiveClass);

    /**
     * The class add to the header if the top of the page is below the bottom of the header, and remove if above.
     */
    function toggleActiveClass() {
        startPoint <= window.pageYOffset
            ? header.classList.add(activeClass)
            : header.classList.remove(activeClass);
    }

    function selectActiveItem() {
        startPoint <= window.pageYOffset
            ? header.classList.add(activeClass)
            : header.classList.remove(activeClass);
    }
}
