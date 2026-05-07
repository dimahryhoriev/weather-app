import {
    dom
} from "./constants.js";


const switchLang = () => {
    const slider = dom.header.lang.slider;
    let isToggleActive = false;
    if (slider.classList.contains('language__slider--active')) isToggleActive = true;

    isToggleActive === true ? isToggleActive = false : isToggleActive = true;
    slider.classList.toggle('language__slider--active');

    return isToggleActive;
}



export { switchLang };