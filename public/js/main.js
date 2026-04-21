let form = document.querySelector('.dashboard__search');
let formInput = document.querySelector('.dashboard__search-input');
let formBtn = document.querySelector('.dashboard__search-btn');
let currentTemp = document.querySelector('[data-js="c-temp"]');
let currentCity = document.querySelector('[data-js="c-city"]');
let currentTime = document.querySelector('[data-js="c-time"]');
let currentWeekDay = document.querySelector('[data-js="c-week-day"]');
let currentDay = document.querySelector('[data-js="c-day"]');
let currentMonth = document.querySelector('[data-js="c-month"]');
let currentYear = document.querySelector('[data-js="c-year"]');


// Get user's search result
form.addEventListener('submit', async () => {
    event.preventDefault();

    const weatherParams = await fetchWeather(formInput.value);
    const epoch = weatherParams.location.localtime_epoch;
    let date = new Date(epoch * 1000);
    console.log(date);
    console.log(weatherParams);

    currentTemp.textContent = Math.round(weatherParams.current.temp_c);
    currentCity.textContent = weatherParams.location.name;
    currentTime.textContent = weatherParams.location.localtime.substring(11, 17);
    currentWeekDay.textContent = date.toLocaleString('en-US', { weekday: 'long' });
    currentDay.textContent = weatherParams.location.localtime.substring(8, 11);
    currentMonth.textContent = date.toLocaleString('en-US', { month: 'short' });
    currentYear.textContent = weatherParams.location.localtime.substring(2, 4);
})

// Fetch weather data from API
const fetchWeather = async (city) => {
    const url = `/api?q=${city}`;

    const res = await fetch(url);
    const data = await res.json();

    return data;
}