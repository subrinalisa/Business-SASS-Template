/*=====================================================
Dom
========================================================*/
const apiKey = '5fdb8b94f042171aff94df37e212fc0d';
const content = document.querySelector('.content');
const history = document.querySelector('.history');
const form = document.querySelector('#form');
const input = document.querySelector('#form input');
/*==================================================
Function
=====================================================*/
const fetchDate = (url) => {
    axios
        .get(url)
        .then((res) => {
            const data = res.data;
            renderDate(data);
            fetchLocation(data.coord.lat, data.coord.lon);
        })
        .catch((err) => alert(`Wrong City`))
}
const fetchHistory = (url) => {
    axios
        .get(url)
        .then((res) => {
            const data = res.data;
            renderHistory(data);
        })
        .catch((err) => alert(`Wrong Location`))
}
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
    return window.moment(dt * 1000).format('h:mm a');
}
const convertDate = (dt) => {
    return window.moment(dt * 1000).format('dddd, Do MMM');
}
const renderDate = (data) => {
    content.innerHTML = `
    <h2 class="city-name">Weather in ${data.name}, ${data.sys.country}</h2>
    <hr>
    <div class="row today">
        <div class="col-md-6">
            <div class="single">
                <h3>Temperature: ${data.main.temp} °C</h3>
                <table class="table-sm table-borderless">
                    <tbody>
                        <tr>
                            <th>Humidity</th>
                            <td>:</td>
                            <td>${data.main.humidity} %</td>
                        </tr>
                        <tr>
                            <th>Sunrise</th>
                            <td>:</td>
                            <td>${convertTime(data.sys.sunrise)}</td>
                        </tr>
                        <tr>
                            <th>Sunset</th>
                            <td>:</td>
                            <td>${convertTime(data.sys.sunset)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="col-md-6 text-md-end">
            <div class="single">
                <h3>${convertDate(data.dt)}</h3>
                <h5><i class="${iconValue(data.weather[0].icon)} me-2"></i><span>${data.weather[0].description}</span></h5>
            </div>
        </div>
    </div>
    `;
}
const fetchLocation = (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    fetchHistory(url);
}
const renderHistory = (data) => {
    history.innerHTML = '';
    data.daily.forEach((element) => {
        history.innerHTML += `
            <div class="col-md-6 col-lg-4 col-xl-3">
                <div class="card single">
                    <div class="card-header">
                        <h4 class="card-title">${window.moment(element.dt * 1000).format('ddd, Do MMM')}</h4>
                    </div>
                    <div class="card-body">
                        <div class="icon"><i class="${iconValue(element.weather[0].icon)}"></i></div>
                        <p class="des">${element.weather[0].description}</p>
                        <p>Day: ${element.temp.day} °C</p>
                        <p>Night: ${element.temp.night} °C</p>
                    </div>
                </div>
            </div>`;
    })
}
/*=======================================
Event
==========================================*/
form.addEventListener('submit', (e) => {
    e.preventDefault();
    jQuery("#preloader").show().fadeOut(250);
    city = input.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    fetchDate(url);
    input.value = '';
});
/*=======================
Initial
==========================*/
let city = 'Rajshahi';
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
fetchDate(url);