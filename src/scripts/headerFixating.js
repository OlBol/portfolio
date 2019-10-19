export default class {
    constructor() {
        this.activeClass = 'is-active';
    }

    init(options) {
        const that = this;
        this.header = options.header;
        this.startPoint =  this.header.getBoundingClientRect().bottom;

        window.addEventListener('scroll', this._toggleActiveClass.bind(that));
    }

    _toggleActiveClass() {
        if (this.startPoint <= window.pageYOffset) {
            this.header.classList.add(this.activeClass);
        } else {
            this.header.classList.remove(this.activeClass);
        }
    }
}
