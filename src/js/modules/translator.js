import i18next from 'i18next';


i18next.init({
    lng: 'en',
    debug: true,
    resources: {
        en: {
            translation: {
                'location_hint_title': 'Select location',
                'location_hint_subtitle': 'Search for a city to see the weather',
                'search_placeholder': 'Search Location...',
                'no_results': 'There is nothing here yet...',
                'details_title': 'Weather Details...',
                'forecast_title': 'Today’s Weather Forecast...',
                'temp_max': 'Temp max',
                'temp_min': 'Temp min',
                'humidity': 'Humidity',
                'cloudy': 'Cloudy',
                'wind': 'Wind',
                'speed': 'km/h',
            }
        },

        ua: {
            translation: {
                'location_hint_title': 'Виберіть локацію',
                'location_hint_subtitle': 'Введіть назву міста, щоб побачити погоду',
                'search_placeholder': 'Шукати Локацію...',
                'no_results': 'Тут поки що нічого немає...',
                'details_title': 'Деталі погоди...',
                'forecast_title': 'Прогноз погоди на сьогодні...',
                'temp_max': 'Макс. темп.',
                'temp_min': 'Мін. темп.',
                'humidity': 'Вологість',
                'cloudy': 'Хмарність',
                'wind': 'Вітер',
                'speed': 'км/год',
            }
        }
    }
})


export default i18next;