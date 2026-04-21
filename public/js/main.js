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
        year: document.querySelector('[data-js="c-year"]'),
    }
}


// Get user's search result
dom.form.addEventListener('submit', async (event) => {
    event.preventDefault();

    try {
        const weatherParams = await fetchWeather(dom.formInput.value);
        const localString = weatherParams.location.localtime.replace(' ', 'T');
        let date = new Date(localString);
        console.log(weatherParams);

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