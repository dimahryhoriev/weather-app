const dom = {
    search: {
        form: document.querySelector('.dashboard__search'),
        input: document.querySelector('.dashboard__search-input'),
        submitBtn: document.querySelector('.dashboard__search-btn'),
        resetBtn: document.querySelector('.dashboard__search-btn--reset')
    },

    current: {
        temp: document.querySelector('[data-js="c-temp"]'),
        city: document.querySelector('[data-js="c-city"]'),
        time: document.querySelector('[data-js="c-time"]'),
        weekDay: document.querySelector('[data-js="c-week-day"]'),
        day: document.querySelector('[data-js="c-day"]'),
        month: document.querySelector('[data-js="c-month"]'),
        year: document.querySelector('[data-js="c-year"]'),
        icon: document.querySelector('[data-js="c-icon"]'),
        background: document.body
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

// ⇘⇘⇘ GET ALL WEATHER DATA FROM API ⇙⇙⇙ //
// Show current weather by search query
function updateWeatherCurrent(weatherParams, date) {
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
}

// Show weather details by search query
function updateWeatherDetails(weatherParams) {
    dom.details.maxTemp.textContent = Math.round(weatherParams.forecast.forecastday[0].day.maxtemp_c);
    dom.details.minTemp.textContent = Math.round(weatherParams.forecast.forecastday[0].day.mintemp_c);
    dom.details.humidity.textContent = weatherParams.current.humidity;
    dom.details.cloudy.textContent = weatherParams.current.cloud;
    dom.details.wind.textContent = Math.round(weatherParams.current.wind_kph);
}

// Show next 12 hours weather forecast
function updateWeatherForecast(weatherParams, currentHour, currentMinute) {
    let forecastHour = currentHour;
    let forecastMinute = currentMinute;

    for (let forecastCounter = 1; forecastCounter <= 12; forecastCounter++) {
        // Declare next forecast hour
        const template = dom.forecast.item.content.cloneNode(true);
        const nextHour = template.querySelector('[data-js="f-time"]');
        const nextDesc = template.querySelector('[data-js="f-desc"]');
        const nextTemp = template.querySelector('[data-js="f-temp"]');

        // Calculating the next hour
        forecastHour = (forecastHour + 1) % 24;
        const formattedHour = forecastHour.toString().padStart(2, '0');
        forecastMinute = '00';
        nextHour.textContent = `${formattedHour}:${forecastMinute}`;

        // Extract the temperature value for a specific hour
        const hourData = weatherParams.forecast.forecastday[0].hour[forecastHour];
        nextTemp.textContent = Math.round(hourData.temp_c);

        dom.forecast.list.appendChild(template);

        // Extract the weather icon for a specific hour
        updateCurrentIcon(weatherParams, forecastHour, 'forecastIcon');
    }
}

// Change icon relying on current weather & time
function updateCurrentIcon(weatherParams, currentHour, type) {
    let cloudyData = weatherParams.current.cloud;

    if (type === 'currentIcon') {
        cloudyData = weatherParams.current.cloud;
    } else {
        cloudyData = weatherParams.forecast.forecastday[0].hour[currentHour].cloud;
    }

    let isDay;
    let isNight;
    let iconPath = '';
    let backgroundPath = '';
    let currentMonth = dom.current.month.textContent;

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

    if (currentMonth in dayCycles) {
        isDay = currentHour >= dayCycles[currentMonth].startOfDay
            && currentHour <= dayCycles[currentMonth].endOfDay;
        isNight = !isDay;
    }

    switch (true) {
        // Day icon variants
        case (isDay):
            if (cloudyData <= 25) {
                iconPath = "url('assets/icons/clear-day.svg')";
                backgroundPath = "url('assets/images/day/clear.jpg')";
            } else if (cloudyData <= 45) {
                iconPath = "url('assets/icons/partly-cloudy-day.svg')";
                backgroundPath = "url('assets/images/day/partly-cloudy.jpg')";
            } else if (cloudyData <= 70) {
                iconPath = "url('assets/icons/mostly-cloudy-day.svg')";
                backgroundPath = "url('assets/images/day/mostly-cloudy.jpg')";
            } else {
                iconPath = "url('assets/icons/cloudy.svg')";
                backgroundPath = "url('assets/images/day/cloudy.jpg')";
            } break;

        // Evening - Night icon variants
        case (isNight):
            if (cloudyData <= 25) {
                iconPath = "url('assets/icons/clear-night.svg')";
                backgroundPath = "url('assets/images/night/clear.jpg')";
            } else if (cloudyData <= 45) {
                iconPath = "url('assets/icons/partly-cloudy-night.svg')";
                backgroundPath = "url('assets/images/night/partly-cloudy.jpg')";
            } else if (cloudyData <= 70) {
                iconPath = "url('assets/icons/mostly-cloudy-night.svg')";
                backgroundPath = "url('assets/images/night/mostly-cloudy.jpg')";
            } else {
                iconPath = "url('assets/icons/cloudy.svg')";
                backgroundPath = "url('assets/images/night/cloudy.jpg')";
            } break;
    }

    if (type === 'currentIcon') {
        dom.current.icon.style.backgroundImage = iconPath;
        dom.current.background.style.backgroundImage = backgroundPath;
    } else {
        const allForecastIcons = document.querySelectorAll('[data-js="f-icon"]');
        const newestForecastIcon = allForecastIcons[allForecastIcons.length - 1];
        newestForecastIcon.style.backgroundImage = iconPath;
    }
}
// ⇗⇗⇗ GET ALL WEATHER DATA FROM API ⇖⇖⇖ //


// Get user's search result
dom.search.form.addEventListener('submit', async (event) => {
    event.preventDefault();

    try {
        dom.forecast.list.innerHTML = '';

        const weatherParams = await fetchWeather(dom.search.input.value);
        const localString = weatherParams.location.localtime.replace(' ', 'T');
        let date = new Date(localString);
        console.log(weatherParams);

        updateWeatherCurrent(weatherParams, date);
        let [currentHour, currentMinute] = dom.current.time.textContent.split(':').map(Number);

        updateWeatherDetails(weatherParams);
        updateWeatherForecast(weatherParams, currentHour, currentMinute);
        updateCurrentIcon(weatherParams, currentHour, 'currentIcon');

    } catch (error) {
        console.error('Error fetching weather data: ', error);
    }
})

dom.search.form.addEventListener('input', (event) => {
    event.preventDefault();

    if (dom.search.input.value.length >= 1) {
        dom.search.submitBtn.style.display = 'none';
        dom.search.resetBtn.style.display = 'flex';
    } else {
        dom.search.submitBtn.style.display = 'flex';
        dom.search.resetBtn.style.display = 'none';
    }
})

dom.search.form.addEventListener('reset', (event) => {
    event.preventDefault();

    dom.search.submitBtn.style.display = 'flex';
    dom.search.resetBtn.style.display = 'none';
    dom.search.input.value = '';
})


// Fetch weather data from API
const fetchWeather = async (city) => {
    const url = `/api?q=${city}&t=${new Date().getTime()}`;

    const res = await fetch(url);
    const data = await res.json();

    return data;
}
