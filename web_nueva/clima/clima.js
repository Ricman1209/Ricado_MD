const url = 'https://api.open-meteo.com/v1/forecast?latitude=19.17&longitude=-96.14&current=temperature_2m,wind_speed_10m';

async function getWeather() {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Error al obtener datos del clima');

        const data = await response.json();
        document.getElementById('weather').innerHTML = `
            🌡️ Temperatura: ${data.current.temperature_2m}°C<br>
            💨 Viento: ${data.current.wind_speed_10m} km/h
        `;
    } catch (error) {
        document.getElementById('weather').innerText = 'Error al obtener datos.';
        console.error(error);
    }
}
