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
                'clear': 'Clear',
                'sunny': 'Sunny',
                'partly_cloudy': 'Partly Cloudy',
                'mostly_cloudy': 'Mostly Cloudy',
                'overcast': 'Overcast',
                'no_precip': 'No Precip',
                'light_rain': 'Light Rain',
                'medium_rain': 'Medium Rain',
                'heavy_rain': 'Heavy Rain',
                'light_snow': 'Light Snow',
                'medium_snow': 'Meidum Snow',
                'heavy_snow': 'Snow',
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
                'clear': 'Чисте Небо',
                'sunny': 'Сонячно',
                'partly_cloudy': 'Мінлива Хмарність',
                'mostly_cloudy': 'Переважно Хмарно',
                'overcast': 'Суцільна Хмарність',
                'no_precip': 'Без Опадів',
                'light_rain': 'Невеликий Дощ',
                'medium_rain': 'Помірний Дощ',
                'heavy_rain': 'Сильний Дощ',
                'light_snow': 'Невеликий Сніг',
                'medium_snow': 'Помірний Сніг',
                'heavy_snow': 'Сніг',
            }
        }
    }
})


export default i18next;