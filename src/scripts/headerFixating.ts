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
    const headerHeight = header.offsetHeight;
    const startPoint = 50;
    const links = header.querySelectorAll('.js-menu-link');

    window.addEventListener('scroll', toggleActiveClass);

    selectActiveItem();

    /**
     * The class add to the header if the top of the page is below the bottom of the header, and remove if above.
     */
    function toggleActiveClass() {
        window.pageYOffset >= startPoint
            ? header.classList.add(activeClass)
            : header.classList.remove(activeClass);
    }

    /**
     * The menu item is become active if the page is on the matching section.
     */
    function selectActiveItem() {
        for (const link of links) {
            const linkHref = link.getAttribute('href');
            const section: HTMLElement = document.querySelector(linkHref);
            const sectionTopPosition = section.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            const sectionBottomPosition = sectionTopPosition + section.clientHeight;

            window.addEventListener('scroll', () => {
                const position = window.pageYOffset;

                position >= headerHeight && position >= sectionTopPosition && position <= sectionBottomPosition
                    ? link.classList.add('is-active')
                    : link.classList.remove('is-active');
            });
        }
    }
}
