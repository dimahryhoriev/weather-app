import {
    getFileURL,
} from './db.js';


const dom = {
    header: {
        lang: {
            toggle: document.querySelector('.header__language'),
            slider: document.querySelector('.language__slider'),
            item: document.querySelector('.language__item'),
            list: {
                en: document.querySelector('[data-js="lang-en"]'),
                ua: document.querySelector('[data-js="lang-ua"]'),
            }
        },
    },

    search: {
        form: document.querySelector('.dashboard__search'),
        input: document.querySelector('.dashboard__search-input'),
        submitBtn: document.querySelector('.dashboard__search-btn'),
        resetBtn: document.querySelector('.dashboard__search-btn--reset')
    },

    current: {
        section: {
            active: document.querySelector('.current__content--active'),
            default: document.querySelector('.current__content--default')
        },
        temp: document.querySelector('[data-js="c-temp"]'),
        city: document.querySelector('[data-js="c-city"]'),
        time: document.querySelector('[data-js="c-time"]'),
        weekDay: document.querySelector('[data-js="c-week-day"]'),
        day: document.querySelector('[data-js="c-day"]'),
        month: document.querySelector('[data-js="c-month"]'),
        year: document.querySelector('[data-js="c-year"]'),
        icon: document.querySelector('[data-js="c-icon"]'),
        background: document.body,
    },

    details: {
        section: document.querySelector('.dashboard__details'),
        description: document.querySelector('.details__subtitle'),
        maxTemp: document.querySelector('[data-js="temp-max"]'),
        minTemp: document.querySelector('[data-js="temp-min"]'),
        humidity: document.querySelector('[data-js="humidity"]'),
        cloudy: document.querySelector('[data-js="cloudy"]'),
        wind: document.querySelector('[data-js="wind"]')
    },

    forecast: {
        section: document.querySelector('.dashboard__forecast'),
        list: document.querySelector('.forecast__metrics'),
        item: document.querySelector('[data-js="forecast-item"]')
    },

    placeholder: {
        section: document.querySelector('.dashboard__placeholder')
    },

    default: {
        section: document.querySelector('.current__content--default'),

        // (SVG ---> BLOB ---> indexedDB) for icons
        icons: {
            element: document.querySelector('.current__illustration'),
            no_internet: await getFileURL('no_internet_icon'),
            too_many_requests: await getFileURL('too_many_requests_icon'),
        },

        // (JPG ---> BLOB ---> indexedDB) for backgrounds
        backgrounds: {
            no_internet: await getFileURL('no_internet_bg'),
            too_many_requests: await getFileURL('too_many_requests_bg'),
        },
        title: document.querySelector('.current__title'),
        subtitle: document.querySelector('.current__subtitle'),
    }
}

const dayCycles = {
    Jan: { startOfDay: 8, endOfDay: 17 },
    Feb: { startOfDay: 7, endOfDay: 17 },
    Mar: { startOfDay: 7, endOfDay: 19 },
    Apr: { startOfDay: 6, endOfDay: 20 },
    May: { startOfDay: 5, endOfDay: 21 },
    Jun: { startOfDay: 5, endOfDay: 21 },
    Jul: { startOfDay: 5, endOfDay: 21 },
    Aug: { startOfDay: 6, endOfDay: 20 },
    Sep: { startOfDay: 7, endOfDay: 19 },
    Oct: { startOfDay: 7, endOfDay: 18 },
    Nov: { startOfDay: 7, endOfDay: 16 },
    Dec: { startOfDay: 8, endOfDay: 16 },
}

const weatherConfig = {
    cloud: {
        none: [['clear', 'sunny'], 25],
        light: [['partly-cloudy'], 45],
        medium: [['mostly-cloudy'], 70],
        heavy: [['overcast'], 100],
    },

    wind: {
        adviceMap: {
            'light': {
                'cold_wind': 'Chilly breeze. Wear a warm coat.',
                'cool_wind': 'Fresh air. A light hoodie is enough.',
                'warm_wind': 'Perfect weather. Enjoy the sun!'
            },

            'moderate': {
                'cold_wind': 'Biting wind. Layer up with a windbreaker.',
                'cool_wind': 'Breezy. Keep your jacket zipped.',
                'warm_wind': 'Nice breeze. No extra layers needed.'
            },

            'strong': {
                'cold_wind': 'Freezing gale! Wear a scarf and thick coat.',
                'cool_wind': 'Very windy. A sturdy jacket is a must.',
                'warm_wind': 'Warm but gusty. Hold onto your hat!'
            },

            'storm': {
                'cold_wind': 'Danger! Extreme wind chill. Stay indoors.',
                'cool_wind': 'Storm alert. Avoid trees and seek shelter.',
                'warm_wind': 'Severe winds. Stay safe inside.'
            }
        },

        setWindSpeed: (speed) => {
            if (speed <= 5) return 'light';
            if (speed <= 11) return 'moderate';
            if (speed <= 19) return 'strong';
            if (speed >= 20) return 'storm';
        },

        setWindTemperature: (temperature) => {
            if (temperature < 10) return 'cold';
            if (temperature < 15) return 'cool';
            if (temperature >= 15) return 'warm';
        },
    },

    rain: {
        none: [['no-precip'], 20],
        light: [['light-rain'], 40],
        medium: [['medium-rain'], 60],
        heavy: [['heavy-rain'], 100],
    },

    snow: {
        none: [['no-precip'], 20],
        light: [['light-snow'], 40],
        medium: [['medium-snow'], 60],
        heavy: [['snow'], 100],
    }
}

const locationConfig = {
    normalizationMap: {
        // A
        'À': 'A', 'Á': 'A', 'Â': 'A', 'Ã': 'A', 'Ä': 'A', 'Å': 'A', 'Ā': 'A', 'Ă': 'A', 'Ą': 'A', 'Ǎ': 'A', 'Ǻ': 'A', 'Ạ': 'A', 'Ả': 'A', 'Ấ': 'A', 'Ầ': 'A', 'Ẩ': 'A', 'Ẫ': 'A', 'Ậ': 'A', 'Ắ': 'A', 'Ằ': 'A', 'Ẳ': 'A', 'Ẵ': 'A', 'Ặ': 'A',
        'à': 'a', 'á': 'a', 'â': 'a', 'ã': 'a', 'ä': 'a', 'å': 'a', 'ā': 'a', 'ă': 'a', 'ą': 'a', 'ǎ': 'a', 'ǻ': 'a', 'ạ': 'a', 'ả': 'a', 'ấ': 'a', 'ầ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ậ': 'a', 'ắ': 'a', 'ằ': 'a', 'ẳ': 'a', 'ẵ': 'a', 'ặ': 'a',

        // C
        'Ç': 'C', 'Ć': 'C', 'Ĉ': 'C', 'Ċ': 'C', 'Č': 'C',
        'ç': 'c', 'ć': 'c', 'ĉ': 'c', 'ċ': 'c', 'č': 'c',

        // D
        'Ð': 'D', 'Ď': 'D', 'Đ': 'D',
        'ð': 'd', 'ď': 'd', 'đ': 'd',

        // E
        'È': 'E', 'É': 'E', 'Ê': 'E', 'Ë': 'E', 'Ē': 'E', 'Ĕ': 'E', 'Ė': 'E', 'Ę': 'E', 'Ě': 'E', 'Ẹ': 'E', 'Ẻ': 'E', 'Ẽ': 'E', 'Ế': 'E', 'Ề': 'E', 'Ể': 'E', 'Ễ': 'E', 'Ệ': 'E',
        'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e', 'ē': 'e', 'ĕ': 'e', 'ė': 'e', 'ę': 'e', 'ě': 'e', 'ẹ': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ế': 'e', 'ề': 'e', 'ể': 'e', 'ễ': 'e', 'ệ': 'e',

        // G
        'Ĝ': 'G', 'Ğ': 'G', 'Ġ': 'G', 'Ģ': 'G',
        'ĝ': 'g', 'ğ': 'g', 'ġ': 'g', 'ģ': 'g',

        // H
        'Ĥ': 'H', 'Ħ': 'H',
        'ĥ': 'h', 'ħ': 'h',

        // I
        'Ì': 'I', 'Í': 'I', 'Î': 'I', 'Ï': 'I', 'Ĩ': 'I', 'Ī': 'I', 'Ĭ': 'I', 'Į': 'I', 'İ': 'I', 'Ǐ': 'I', 'Ị': 'I', 'Ỉ': 'I',
        'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i', 'ĩ': 'i', 'ī': 'i', 'ĭ': 'i', 'į': 'i', 'ı': 'i', 'ǐ': 'i', 'ị': 'i', 'ỉ': 'i',

        // J
        'Ĵ': 'J',
        'ĵ': 'j',

        // K
        'Ķ': 'K',
        'ķ': 'k', 'ĸ': 'k',

        // L
        'Ĺ': 'L', 'Ļ': 'L', 'Ľ': 'L', 'Ŀ': 'L', 'Ł': 'L',
        'ĺ': 'l', 'ļ': 'l', 'ľ': 'l', 'ŀ': 'l', 'ł': 'l',

        // N
        'Ñ': 'N', 'Ń': 'N', 'Ņ': 'N', 'Ň': 'N', 'ŉ': 'N',
        'ñ': 'n', 'ń': 'n', 'ņ': 'n', 'ň': 'n',

        // O
        'Ò': 'O', 'Ó': 'O', 'Ô': 'O', 'Õ': 'O', 'Ö': 'O', 'Ø': 'O', 'Ō': 'O', 'Ŏ': 'O', 'Ő': 'O', 'Ǒ': 'O', 'Ǿ': 'O', 'Ọ': 'O', 'Ỏ': 'O', 'Ố': 'O', 'Ồ': 'O', 'Ổ': 'O', 'Ỗ': 'O', 'Ộ': 'O', 'Ớ': 'O', 'Ờ': 'O', 'Ở': 'O', 'Ỡ': 'O', 'Ợ': 'O',
        'ò': 'o', 'ó': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o', 'ø': 'o', 'ō': 'o', 'ŏ': 'o', 'ő': 'o', 'ǒ': 'o', 'ǿ': 'o', 'ọ': 'o', 'ỏ': 'o', 'ố': 'o', 'ồ': 'o', 'ổ': 'o', 'ỗ': 'o', 'ộ': 'o', 'ớ': 'o', 'ờ': 'o', 'ở': 'o', 'ỡ': 'o', 'ợ': 'o',

        // R
        'Ŕ': 'R', 'Ŗ': 'R', 'Ř': 'R',
        'ŕ': 'r', 'ŗ': 'r', 'ř': 'r',

        // S
        'Ś': 'S', 'Ŝ': 'S', 'Ş': 'S', 'Š': 'S', 'Ș': 'S',
        'ś': 's', 'ŝ': 's', 'ş': 's', 'š': 's', 'ș': 's',

        // T
        'Ţ': 'T', 'Ť': 'T', 'Ŧ': 'T', 'Ț': 'T',
        'ţ': 't', 'ť': 't', 'ŧ': 't', 'ț': 't',

        // U
        'Ù': 'U', 'Ú': 'U', 'Û': 'U', 'Ü': 'U', 'Ũ': 'U', 'Ū': 'U', 'Ŭ': 'U', 'Ů': 'U', 'Ű': 'U', 'Ų': 'U', 'Ǔ': 'U', 'Ǖ': 'U', 'Ǘ': 'U', 'Ǚ': 'U', 'Ǜ': 'U', 'Ụ': 'U', 'Ủ': 'U', 'Ứ': 'U', 'Ừ': 'U', 'Ử': 'U', 'Ữ': 'U', 'Ự': 'U',
        'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u', 'ũ': 'u', 'ū': 'u', 'ŭ': 'u', 'ů': 'u', 'ű': 'u', 'ų': 'u', 'ǔ': 'u', 'ǖ': 'u', 'ǘ': 'u', 'ǚ': 'u', 'ǜ': 'u', 'ụ': 'u', 'ủ': 'u', 'ứ': 'u', 'ừ': 'u', 'ử': 'u', 'ữ': 'u', 'ự': 'u',

        // W
        'Ŵ': 'W',
        'ŵ': 'w',

        // Y
        'Ý': 'Y', 'Ŷ': 'Y', 'Ÿ': 'Y', 'Ỳ': 'Y', 'Ỵ': 'Y', 'Ỷ': 'Y', 'Ỹ': 'Y',
        'ý': 'y', 'ŷ': 'y', 'ÿ': 'y', 'ỳ': 'y', 'ỵ': 'y', 'ỷ': 'y', 'ỹ': 'y',

        // Z
        'Ź': 'Z', 'Ż': 'Z', 'Ž': 'Z',
        'ź': 'z', 'ż': 'z', 'ž': 'z',

        // Спеціальні лігатури (зазвичай нормалізуються у дві літери або одну схожу)
        'Æ': 'AE', 'æ': 'ae', 'Œ': 'OE', 'œ': 'oe', 'ß': 'ss', 'Þ': 'Th', 'þ': 'th'
    }
}


export {
    dom,
    dayCycles,
    weatherConfig,
    locationConfig,
};