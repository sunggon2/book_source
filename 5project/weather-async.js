let currentMarker = null;
let map;

function formatDateWithWeekday(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekday = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];
    return `${year}.${month}.${day} (${weekday})`;
}

function renderForecast(data) {
    const city = data.city.name;
    const lat = data.city.coord.lat;
    const lon = data.city.coord.lon;
    const forecastList = data.list.filter((_, i) => i % 8 === 0);

    document.querySelector('#forecastHeader').innerHTML = `<span class="city-name">${city}</span>의 5일간의 날씨`;

    const html = forecastList.map(item => {
        const date = new Date(item.dt * 1000);
        const temp = item.main.temp;
        const desc = item.weather[0].description;
        const icon = item.weather[0].icon;
        const iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;

        return `
          <div class="forecast-item">
            <h3>${formatDateWithWeekday(date)}</h3>
            <p>온도: ${temp} ℃</p>
            <p>날씨: ${desc}</p>
            <img src="${iconURL}" alt="${desc}">
          </div>
        `;
    }).join('');

    document.getElementById("weather").innerHTML = html;

    if (currentMarker) map.removeLayer(currentMarker);
    currentMarker = L.marker([lat, lon]).addTo(map)
        .bindPopup(`${city}의 날씨`)
        .openPopup();
    map.setView([lat, lon], 10);
}

async function getWeatherByCity(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=kr&appid=7c4f3b047823024f715f2cd00659b3fd`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        renderForecast(data);
    } catch (err) {
        document.querySelector('#weather').innerHTML = '날씨 정보를 불러오지 못했습니다.';
        console.error(err);
    }
    document.getElementById("cityInput").value = '';
}

async function getWeatherByCoordinates(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=kr&appid=7c4f3b047823024f715f2cd00659b3fd`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        renderForecast(data);
    } catch (err) {
        document.querySelector('#weather').innerHTML = '날씨 정보를 불러오지 못했습니다.';
        console.error(err);
    }
}

function initMap() {
    map = L.map('map').setView([37.5665, 126.978], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    getWeatherByCity('Seoul');

    map.on('click', async e => {
        const { lat, lng } = e.latlng;
        await getWeatherByCoordinates(lat, lng);

        if (currentMarker) map.removeLayer(currentMarker);
        currentMarker = L.marker([lat, lng]).addTo(map)
            .bindPopup("날씨 정보를 불러오는 중...")
            .openPopup();
    });
}

document.getElementById("cityInput").addEventListener("keydown", async e => {
    if (e.key === "Enter") {
        const city = document.getElementById("cityInput").value.trim() || 'Busan';
        await getWeatherByCity(city);
    }
});

initMap();
