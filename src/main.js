import './main.pcss';

import Parallax from './scripts/parallax';

if (process.env.NODE_ENV === 'development') {
    require('file-loader!./index.pug');
}

const promoParallax = new Parallax();

promoParallax.init({
    area: document.querySelector('.js-promo-parallax'),
    layers: document.querySelectorAll('.js-promo-layer')
});

const buddaParallax = new Parallax();

buddaParallax.init({
    area: document.querySelector('.js-budda-parallax'),
    layers: document.querySelectorAll('.js-budda-layer')
});
