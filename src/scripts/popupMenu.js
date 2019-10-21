export default class {
    constructor() {
        this.activeClass = 'is-open';
        this.hiddenClass = 'is-hidden';
    }

    init(options) {
        const that = this;

        this.button = options.button;
        this.template = options.template;
        this.header = document.querySelector('.js-header');
        this.links = document.querySelectorAll('.js-mobile-menu a');

        this.button.addEventListener('click', this._toogleMenu.bind(that));
        this.links.forEach(link => {
            link.addEventListener('click', this._toogleMenu.bind(that));
        });
    }

    _toogleMenu() {
        this.button.classList.toggle(this.activeClass);
        this.template.classList.toggle(this.activeClass);
        document.body.classList.toggle(this.hiddenClass);
        this.header.classList.toggle(this.hiddenClass);
    }
}
