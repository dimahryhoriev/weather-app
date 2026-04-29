// Fetch weather data from API
const fetchWeather = async (city) => {
    const url = `/api?q=${city}&t=${new Date().getTime()}`;

    const res = await fetch(url);
    const data = await res.json();

    return data;
}

export { fetchWeather };