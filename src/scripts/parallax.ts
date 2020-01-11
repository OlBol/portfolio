interface ParallaxOptions {
    area: HTMLElement;
    layers: NodeListOf<HTMLElement>
}

/**
 * @description Parallax scrolling effect.
 * @param options – parallax area and parallax layers data.
 */
export default function parallax(options: ParallaxOptions) {
    const div: number = 2;
    const area: HTMLElement = options.area;
    const layers: NodeListOf<HTMLElement> = options.layers;

    window.addEventListener('scroll', () => {
        const coord: any = area.getBoundingClientRect();

        if(coord.top < area.clientHeight && coord.bottom > 0) {
            const scrollY = window.pageYOffset;

            layers.forEach((item: HTMLElement) => {
                const speed: string = item.dataset.speed;
                const value: number = Number(speed) * scrollY / div;

                item.style.transform = `translateY(-${value}px)`;
            });
        }
    });
}
