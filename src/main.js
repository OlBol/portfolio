import './main.pcss';

import Parallax from './scripts/parallax';
import PopupMenu from './scripts/popupMenu';
import Form from './scripts/sendForm';
import AnchorScroll from './scripts/anchorScroll';
import HeaderFixating from './scripts/headerFixating';

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
