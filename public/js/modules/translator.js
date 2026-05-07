import {
    dom
} from "./constants.js";


const getCurrentLang = () => {
    const slider = dom.header.lang.slider;
    let currentLang;

    if (slider.classList.contains('language__slider--active')) {
        currentLang = 'ua';
    } else {
        currentLang = 'en';
    }

    return currentLang;
}


export { getCurrentLang };