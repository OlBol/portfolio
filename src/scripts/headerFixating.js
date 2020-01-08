export default class {
    /**
     * Фиксация хедера на странице при прокрутке.
     */
    constructor() {
        this.activeClass = 'is-active';
    }

    /**
     * Навешивание события скролла на страницу.
     * @param options {object} – бъект с данными, указывающими на элемент с хедером.
     */
    init(options) {
        const that = this;
        this.header = options.header;
        this.startPoint =  this.header.getBoundingClientRect().bottom;

        window.addEventListener('scroll', this._toggleActiveClass.bind(that));
    }

    /**
     * Класс добавляется к хедеру, если веррхняя точка страницы ниже низа хедера, и удаляется, если выше.
     * @private
     */
    _toggleActiveClass() {
        console.log(this.startPoint, window.pageYOffset)
        this.startPoint <= window.pageYOffset
            ? this.header.classList.add(this.activeClass)
            : this.header.classList.remove(this.activeClass);
    }
}
