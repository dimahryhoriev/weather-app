const dom = {
    form: document.querySelector('.dashboard__search'),
    formInput: document.querySelector('.dashboard__search-input'),
    formBtn: document.querySelector('.dashboard__search-btn'),

    current: {
        temp: document.querySelector('[data-js="c-temp"]'),
        city: document.querySelector('[data-js="c-city"]'),
        time: document.querySelector('[data-js="c-time"]'),
        weekDay: document.querySelector('[data-js="c-week-day"]'),
        day: document.querySelector('[data-js="c-day"]'),
        month: document.querySelector('[data-js="c-month"]'),
        year: document.querySelector('[data-js="c-year"]')
    },

    details: {
        maxTemp: document.querySelector('[data-js="temp-max"]'),
        minTemp: document.querySelector('[data-js="temp-min"]'),
        humidity: document.querySelector('[data-js="humidity"]'),
        cloudy: document.querySelector('[data-js="cloudy"]'),
        wind: document.querySelector('[data-js="wind"]')
    },

    forecast: {
        list: document.querySelector('.forecast__metrics'),
        item: document.querySelector('[data-js="forecast-item"]')
    }
}


// Get user's search result
dom.form.addEventListener('submit', async (event) => {
    event.preventDefault();

    try {
        dom.forecast.list.innerHTML = '';

        const weatherParams = await fetchWeather(dom.formInput.value);
        const localString = weatherParams.location.localtime.replace(' ', 'T');
        let date = new Date(localString);
        console.log(weatherParams);

        // Show current weather by search query
        dom.current.temp.textContent = Math.round(weatherParams.current.temp_c);
        dom.current.city.textContent = weatherParams.location.name;
        dom.current.time.textContent = date.toLocaleString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
        dom.current.weekDay.textContent = date.toLocaleString('en-US', { weekday: 'long' });
        dom.current.day.textContent = date.getDate();
        dom.current.month.textContent = date.toLocaleString('en-US', { month: 'short' });
        dom.current.year.textContent = date.getFullYear().toString().slice(-2);

        // Show weather details by search query
        dom.details.maxTemp.textContent = Math.round(weatherParams.forecast.forecastday[0].day.maxtemp_c);
        dom.details.minTemp.textContent = Math.round(weatherParams.forecast.forecastday[0].day.mintemp_c);
        dom.details.humidity.textContent = weatherParams.current.humidity;
        dom.details.cloudy.textContent = weatherParams.current.cloud;
        dom.details.wind.textContent = Math.round(weatherParams.current.wind_kph);

        // Show next 12 hours weather forecast
        let [currentHour, currentMinute] = dom.current.time.textContent.split(':').map(Number);

        for (let forecastCounter = 1; forecastCounter <= 12; forecastCounter++) {
            // Declare next forecast hour
            const template = dom.forecast.item.content.cloneNode(true);
            const nextHour = template.querySelector('[data-js="f-time"]');
            const nextDesc = template.querySelector('[data-js="f-desc"]');
            const nextTemp = template.querySelector('[data-js="f-temp"]');

            // Calculating the next hour
            currentHour = (currentHour + 1) % 24;
            const formattedHour = currentHour.toString().padStart(2, '0');
            currentMinute = '00';

            // Extract the temperature value for a specific hour
            const hourData = weatherParams.forecast.forecastday[0].hour[currentHour];
            nextTemp.textContent = Math.round(hourData.temp_c);

            nextHour.textContent = `${formattedHour}:${currentMinute}`;
            dom.forecast.list.appendChild(template);
        }
    } catch (error) {
        console.error('Error fetching weather data: ', error);
    }
})

// Fetch weather data from API
const fetchWeather = async (city) => {
    const url = `/api?q=${city}`;

    const res = await fetch(url);
    const data = await res.json();

    return data;
}