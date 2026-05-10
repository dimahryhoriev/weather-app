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

                'light_cold_wind': 'Chilly breeze. Wear a warm coat.',
                'light_cool_wind': 'Fresh air. A light hoodie is enough.',
                'light_warm_wind': 'Perfect weather. Enjoy the sun!',
                'moderate_cold_wind': 'Biting wind. Layer up with a windbreaker.',
                'moderate_cool_wind': 'Breezy. Keep your jacket zipped.',
                'moderate_warm_wind': 'Nice breeze. No extra layers needed.',
                'strong_cold_wind': 'Freezing gale! Wear a scarf and thick coat.',
                'strong_cool_wind': 'Very windy. A sturdy jacket is a must.',
                'strong_warm_wind': 'Warm but gusty. Hold onto your hat!',
                'storm_cold_wind': 'Danger! Extreme wind chill. Stay indoors.',
                'storm_cool_wind': 'Storm alert. Avoid trees and seek shelter.',
                'storm_warm_wind': 'Severe winds. Stay safe inside.',

                'jan': 'Jan',
                'feb': 'Feb',
                'mar': 'Mar',
                'apr': 'Apr',
                'may': 'May',
                'jun': 'Jun',
                'jul': 'Jul',
                'aug': 'Aug',
                'sep': 'Sep',
                'oct': 'Oct',
                'nov': 'Nov',
                'dec': 'Dec',

                'monday': 'Monday',
                'tuesday': 'Tuesday',
                'wednesday': 'Wednesday',
                'thursday': 'Thursday',
                'friday': 'Friday',
                'saturday': 'Saturday',
                'sunday': 'Sunday',
            }
        },

        uk: {
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

                'light_cold_wind': 'Прохолодний бриз. Одягніть тепле пальто.',
                'light_cool_wind': 'Свіже повітря. Достатньо легкого худі.',
                'light_warm_wind': 'Ідеальна погода. Насолоджуйтесь сонцем!',
                'moderate_cold_wind': 'Пронизливий вітер. Одягніться багатошарово або оберіть вітровку.',
                'moderate_cool_wind': 'Свіжо. Тримайте куртку застебнутою.',
                'moderate_warm_wind': 'Приємний вітерець. Додаткові шари одягу не потрібні.',
                'strong_cold_wind': 'Морозний шторм! Одягніть шарф і товсте пальто.',
                'strong_cool_wind': 'Дуже вітряно. Міцна куртка обов’язкова.',
                'strong_warm_wind': 'Тепло, але поривчасто. Тримайте капелюх!',
                'storm_cold_wind': 'Небезпека! Екстремально холодний вітер. Залишайтеся вдома.',
                'storm_cool_wind': 'Штормове попередження. Уникайте дерев та шукайте укриття.',
                'storm_warm_wind': 'Сильний вітер. Будьте в безпеці всередині приміщення.',

                'jan': 'Січ',
                'feb': 'Лют',
                'mar': 'Бер',
                'apr': 'Квіт',
                'may': 'Трав',
                'jun': 'Черв',
                'jul': 'Лип',
                'aug': 'Серп',
                'sep': 'Вер',
                'oct': 'Жовт',
                'nov': 'Лист',
                'dec': 'Груд',

                'monday': 'Понеділок',
                'tuesday': 'Вівторок',
                'wednesday': 'Середа',
                'thursday': 'Четвер',
                'friday': 'П’ятниця',
                'saturday': 'Субота',
                'sunday': 'Неділя',
            }
        }
    }
})


export default i18next;