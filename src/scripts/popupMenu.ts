interface PopupOptions {
    button: HTMLElement;
    template: HTMLElement;
}

/**
 * @description Mobile menu popup.
 * @param options – menu button and popup template data.
 */
export default function popupMenu(options: PopupOptions) {
        const activeClass = 'is-open';
        const hiddenClass = 'is-hidden';
        const button = options.button;
        const template = options.template;
        const header = document.querySelector('.js-header');
        const links = document.querySelectorAll('.js-mobile-menu a');

        button.addEventListener('click', toogleMenu);
        links.forEach(link => {
            link.addEventListener('click', toogleMenu);
        });

    function toogleMenu() {
        button.classList.toggle(activeClass);
        template.classList.toggle(activeClass);
        document.body.classList.toggle(hiddenClass);
        header.classList.toggle(hiddenClass);
    }
}
