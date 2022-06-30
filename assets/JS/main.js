import AOS from 'aos';
import 'aos/dist/aos.css';

import 'boxicons';

import { showDisplayDigimonCard, showFilteringDigimonCard } from './data/digimonAPI.js';
import { hoverEffect } from './utility/hover-effect.js';
import { showCardDetail, showCardML } from './data/mobile-legend-API.js';

const getPages = document.body.dataset.page;

switch (getPages) {
    case 'landing':
        /** 
        MENERAPKAN HOVER EFFECT
        params(el1 required,el2 required, el3 required)
        */
        hoverEffect(
            document.querySelector('.main-landing__split--left'),
            document.querySelector('.main-landing__split--right'),
            document.querySelector('.main-landing')
        );
        break;

    case 'digimon':
        /*
         *INIT AOS
         */
        AOS.init({
            delay: 800,
        });
        /*
         *MENAMPILKAN BEBERAPA KOMPONEN
         *CARD DIGIMON
         */
        showDisplayDigimonCard(document.querySelector('.digimon-char'));

        /*
         *MENAMPILKAN BEBERAPA KOMPONEN
         *CARD DIGIMON BERDASARKAN
         *USER SELECTED
         */
        showFilteringDigimonCard(
            document.querySelector('.digimon-char'),
            document.querySelector('#digimon-search'),
            document.querySelector('#level-digimon')
        );
        break;
    case 'mobile-legend':
        /*
         *INIT AOS
         */
        AOS.init({
            delay: 800,
        });

        showCardML(document.querySelector('.card-mobile-legend'));

        break;
}
