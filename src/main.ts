import './main.pcss';

import parallax from './scripts/parallax.ts';
import PopupMenu from './scripts/popupMenu.ts';
import Form from './scripts/sendForm.ts';
import AnchorScroll from './scripts/anchorScroll.ts';
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

const popupMenu = new PopupMenu();

popupMenu.init({
    button: document.querySelector('.js-toggle-btn'),
    template: document.querySelector('.js-mobile-menu')
});

const form = new Form();


form.init({
    form: document.querySelector('.j-form')
});

const anchorScroll = new AnchorScroll();

anchorScroll.init();


const headerFixating = new HeaderFixating();

headerFixating.init({
    header: document.querySelector('.js-header')
});
