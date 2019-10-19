export default class {
    constructor() {
        this.links = document.querySelectorAll('a[href^="#"');
        this.speed = 0.5;
    }

    init() {
        for(const link of this.links) {
            link.addEventListener('click', e => {
                e.preventDefault();

                const that = this;
                this.anchor  = document.querySelector(link.getAttribute('href'));
                this.coordAnchor  = this.anchor.getBoundingClientRect().top;
                this.windowY = window.pageYOffset;
                this.start = null;

                requestAnimationFrame(this._countStep.bind(that));
            });
        }
    }

    _countStep(time) {
        if (this.start === null) this.start = time;

        const that = this;
        const progress = time - this.start;

        const coordY =
            this.coordAnchor < 0
                ? Math.max(this.windowY - progress / this.speed, this.windowY + this.coordAnchor)
                : Math.min(this.windowY + progress / this.speed, this.windowY + this.coordAnchor);

        window.scrollTo(0, coordY);

        if (coordY !== this.windowY + this.coordAnchor) {
            requestAnimationFrame(this._countStep.bind(that));

        }
    }
}
