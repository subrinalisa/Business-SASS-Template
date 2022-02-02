/*=====================================================
Dom
========================================================*/
const content = document.querySelector('.content');
const form = document.querySelector('#form');
const input = document.querySelector('#form input');
/*=======================================================
Api
==========================================================*/
const apiKey = '5fdb8b94f042171aff94df37e212fc0d';
/*==================================================
Function
=====================================================*/
const iconValue = (icon) => {
    if (icon == '01d' || icon == '01n') {
        return icon = 'bi bi-cloud-fill';
    } else if (icon == '02d' || icon == '02n') {
        return icon = 'bi bi-cloud-sun-fill';
    } else if (icon == '03d' || icon == '03n') {
        return icon = 'bi bi-clouds-fill';
    } else if (icon == '04d' || icon == '04n') {
        return icon = 'bi bi-cloud-haze2-fill';
    } else if (icon == '09d' || icon == '09n') {
        return icon = 'bi bi-cloud-drizzle-fill';
    } else if (icon == '10d' || icon == '10n') {
        return icon = 'bi bi-cloud-drizzle-fill';
    } else if (icon == '11d' || icon == '11n') {
        return icon = 'bi bi-cloud-lightning-fill';
    } else if (icon == '13d' || icon == '13n') {
        return icon = 'bi bi-cloud-snow-fill';
    } else if (icon == '50d' || icon == '50n') {
        return icon = 'bi bi-cloud-haze2-fill';
    }
}
const convertTime = (dt) => {
    formattedTime = window.moment(dt * 1000).format('h:mm a');
    return formattedTime;
}
const convertDate = (dt) => {
    formattedDate = window.moment(dt * 1000).format('dddd, do MMM');
    return formattedDate;
}
const fetchDate = (city, container) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    axios
        .get(url)
        .then((res) => {
            const data = res.data;
            renderDate(data, container);
        })
        .catch((err) => alert(`Wrong City`))
}
const renderDate = (data, container) => {
    let icon = data.weather[0].icon;
    icon = iconValue(icon);
    const date = convertDate(data.dt);
    const sunrise = convertTime(data.sys.sunrise);
    const sunset = convertTime(data.sys.sunset);
    container.innerHTML = `
    <h2>Weather in ${data.name}, ${data.sys.country}</h2>
    <hr>
    <div class="row">
        <div class="col-md-6 order-1 order-md-0 single">
            <h4 class="mb-2">Temperature: ${data.main.temp} &#xb0;C</h4>
            <table class="table-sm table-borderless">
                <tr>
                    <th>Humidity</th>
                    <td>:</td>
                    <td>${data.main.humidity} %</td>
                </tr>
                <tr>
                    <th>Sunrise</th>
                    <td>:</td>
                    <td>${sunrise}</td>
                </tr>
                <tr>
                    <th>Sunset</th>
                    <td>:</td>
                    <td>${sunset}</td>
                </tr>
            </table>
        </div>
        <div class="col-md-6 order-0 order-md-1 single daily-weather">
            <h3>${date}</h3>
            <p class="today-time"></p>
            <p><i class="${icon} me-2"></i><span>${data.weather[0].description}</span></p>
        </div>
    </div>`;
}
/*=======================================
Event
==========================================*/
form.addEventListener('submit', (e) => {
    e.preventDefault();
    jQuery("#preloader").show().fadeOut(250);
    const city = input.value;
    fetchDate(city, content);
    input.value = '';
});
/*=======================
Initial
==========================*/
fetchDate('rajshahi', content);
setInterval((e) => {
    const time = new Date().toLocaleTimeString();
    const todayTime = content.querySelector('.today-time');
    todayTime.innerText = `${time} (BD Time)`;
}, 1000);