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

function citySearch(city) {
    console.log(city);
}

form.addEventListener('submit', () => {
    event.preventDefault();

    console.log(formInput.value);
})

// Fetch weather data from API
const fetchWeather = async (city) => {
    const url = `/api?q=${city}`

    const res = await fetch(url)
    const data = await res.json()
}

