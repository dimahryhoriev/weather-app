import { dom } from './constants.js';
import { showContent } from './main.js';

const animTime = 125;
const toggleFadeClass = elemIndex => elemIndex.classList.toggle('is-faded');

const useFade = elemsArray => {
    elemsArray.forEach(element => {
        toggleFadeClass(element);

        setTimeout(() => {
            showContent();
            setTimeout(() => {
                toggleFadeClass(element);
            }, animTime);
        }, animTime);
    });
}

export { useFade };