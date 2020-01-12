import './main.pcss';

import parallax from './scripts/parallax.ts';
import popupMenu from './scripts/popupMenu.ts';
import sendForm from './scripts/sendForm.ts';
import anchorScroll from './scripts/anchorScroll.ts';
import HeaderFixating from './scripts/headerFixating.ts';

if (process.env.NODE_ENV === 'development') {
    require('file-loader!./index.pug');
}

parallax({
    area: document.querySelector('.js-promo-parallax'),
    layers: document.querySelectorAll('.js-promo-layer')
});

parallax({
    area: document.querySelector('.js-budda-parallax'),
    layers: document.querySelectorAll('.js-budda-layer')
});

popupMenu({
    button: document.querySelector('.js-toggle-btn'),
    template: document.querySelector('.js-mobile-menu')
});


sendForm({
    form: document.querySelector('.j-form')
});

anchorScroll();

const headerFixating = new HeaderFixating();

headerFixating.init({
    header: document.querySelector('.js-header')
});
