export default class {
    constructor() {
        this.div = 2;
    }

    init(options) {
        const that = this;

        this.area = options.area;
        this.layers = options.layers;

        window.addEventListener('scroll', this._moveLayers.bind(that));
    }

    _moveLayers() {
        const coord = this.area.getBoundingClientRect();

        if(coord.top < this.area.clientHeight && coord.bottom > 0) {
            const scrollY = window.pageYOffset;

            this.layers.forEach(item => {
                const speed = item.dataset.speed;
                const value = speed * scrollY / this.div;

                item.style.transform = `translateY(-${value}px)`;
            });
        }
    }
}
