import { dom } from './constants.js';
import { showContent } from './main.js';

const animTime = 250;
const toggleFadeClass = elemIndex => elemIndex.classList.toggle('is-faded');

const useFade = elemsArray => {
    for (let index = 0; index < elemsArray.length; index++) {
        toggleFadeClass(elemsArray[index]);

        setTimeout(() => {
            showContent();
            toggleFadeClass(elemsArray[index]);
        }, animTime);
    }
}

export { useFade };