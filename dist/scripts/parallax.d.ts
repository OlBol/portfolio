interface ParallaxOptions {
    area: HTMLElement;
    layers: NodeListOf<HTMLElement>;
}
/**
 * @description Parallax scrolling effect.
 * @param options – parallax area and parallax layers data.
 */
export default function parallax(options: ParallaxOptions): void;
export {};
