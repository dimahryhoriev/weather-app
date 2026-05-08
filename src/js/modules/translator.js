import i18next from 'i18next';


i18next.init({
    lng: 'en',
    debug: true,
    resources: {
        en: {
            translation: {
                'location_hint_title': 'Select location',
                'location_hint_subtitle': 'Search for a city to see the weather',
                'toggle_en': 'EN',
                'toggle_ua': 'UA',
                'search_placeholder': 'Search Location...',
                'no_results': 'There is nothing here yet...',
            }
        },

        ua: {
            translation: {
                'location_hint_title': 'Виберіть локацію',
                'location_hint_subtitle': 'Введіть назву міста, щоб побачити погоду',
                'toggle_en': 'АНГ',
                'toggle_ua': 'УКР',
                'search_placeholder': 'Шукати Локацію...',
                'no_results': 'Тут поки що нічого немає...',
            }
        }
    }
})


export default i18next;