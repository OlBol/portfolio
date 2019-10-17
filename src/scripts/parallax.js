export default class {
    constructor() {}

    init(options) {
        const that = this;

        this.area = options.area;
        this.layers = options.layers;

        window.addEventListener('scroll', this.moveLayers.bind(that));
    }

    moveLayers() {
        const coord = this.area.getBoundingClientRect();

        if(coord.top < this.area.clientHeight && coord.bottom > 0) {
            const scrollY = window.pageYOffset;

            this.layers.forEach(item => {
                const speed = item.dataset.speed;
                const value = speed * scrollY / 2;

                item.style.transform = `translateY(-${value}px)`;
            });
        }
    }
}
