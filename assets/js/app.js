/*=====================================================
Dom
=======================================================*/
const apiKey = '5fdb8b94f042171aff94df37e212fc0d';
const today = document.querySelector('.today');
const upcoming = document.querySelector('.upcoming');
const form = document.querySelector('#form');
const input = document.querySelector('#form input');
const cityName = document.querySelector('.city-name');
const images = [
    `https://images.pexels.com/photos/531756/pexels-photo-531756.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`,
    `https://images.pexels.com/photos/6534191/pexels-photo-6534191.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`,
    `https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`,
    `https://cdn.pixabay.com/photo/2017/05/20/20/22/clouds-2329680_960_720.jpg`,
    `https://images.pexels.com/photos/325676/pexels-photo-325676.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
    `https://cdn.pixabay.com/photo/2018/05/31/13/13/rainy-day-3443977_960_720.jpg`,
    `https://cdn.pixabay.com/photo/2018/08/23/07/35/thunderstorm-3625405_960_720.jpg`,
    `https://cdn.pixabay.com/photo/2021/12/03/08/50/nature-6842159_960_720.jpg`,
    `https://images.pexels.com/photos/2335126/pexels-photo-2335126.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`
];
let bgImg = images[0];
/*==================================================
Functions
=====================================================*/
const onSuccess = (position) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
    fetchDate(url);
}
const onError = (error) => {
    alert(error.message);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=rajshahi&units=metric&appid=${apiKey}`;
    fetchDate(url);
}
const fetchDate = (url) => {
    axios
        .get(url)
        .then((res) => {
            cityName.innerHTML = `Weather in ${res.data.name}, ${res.data.sys.country}`;
            const urlNew = `https://api.openweathermap.org/data/2.5/onecall?lat=${res.data.coord.lat}&lon=${res.data.coord.lon}&units=metric&appid=${apiKey}`;
            fetchLocation(urlNew);
        })
        .catch((err) => alert(`Wrong City`));
}
const fetchLocation = (url) => {
    axios
        .get(url)
        .then((res) => renderData(res.data))
        .catch((err) => alert(`Wrong Location`));
}
const renderData = (data) => {
    today.innerHTML = `
    <div class="col-md-6">
        <div class="single">
            <h3>Temperature: ${data.current.temp} °C</h3>
            <table class="table-sm table-borderless">
                <tbody>
                    <tr>
                        <th>Humidity</th>
                        <td>:</td>
                        <td>${data.current.humidity} %</td>
                    </tr>
                    <tr>
                        <th>Sunrise</th>
                        <td>:</td>
                        <td>${convertTime(data.current.sunrise, data.timezone)}</td>
                    </tr>
                    <tr>
                        <th>Sunset</th>
                        <td>:</td>
                        <td>${convertTime(data.current.sunset, data.timezone)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="col-md-6 text-md-end">
        <div class="single">
            <h3>${convertDate(data.current.dt, data.timezone)}</h3>
            <h5 class="mb-1">${convertTime(data.current.dt, data.timezone)}</h5>
            <h5><i class="${iconValue(data.current.weather[0].icon)} me-2"></i><span>${data.current.weather[0].description}</span>
            </h5>
        </div>
    </div>`;
    upcoming.innerHTML = '';
    data.daily.forEach((element, index) => {
        if (index == 0 || index == 7) {
            return false;
        }
        upcoming.innerHTML += `
            <div class="col-md-6 col-lg-4">
                <div class="card single">
                    <div class="card-header">
                        <h4 class="card-title">${convertDate(element.dt, data.timezone)}</h4>
                    </div>
                    <div class="card-body">
                        <div class="icon"><i class="${iconValue(element.weather[0].icon)}"></i></div>
                        <p class="des">${element.weather[0].description}</p>
                        <p>Max Temp : ${element.temp.max} °C</p>
                        <p>Min Temp : ${element.temp.min} °C</p>
                    </div>
                </div>
            </div>`;
    });
    document.body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${changeBg(data.current.weather[0].icon)})`;
}
const convertTime = (time, timezone) => {
    return new Date(time * 1000).toLocaleString('en-US', {
        timeZone: timezone,
        timeStyle: "short"
    })
}
const convertDate = (time, timezone) => {
    return new Date(time * 1000).toLocaleString('en-US', {
        timeZone: timezone,
        dateStyle: "long"
    })
}
const iconValue = (icon) => {
    switch (true) {
        case icon == '01d' || icon == '01n':
            return icon = 'bi bi-cloud-sun-fill';
        case icon == '02d' || icon == '02n':
            return icon = 'bi bi-cloud-sun-fill';
        case icon == '03d' || icon == '03n':
            return icon = 'bi bi-clouds-fill';
        case icon == '04d' || icon == '04n':
            return icon = 'bi bi-cloud-haze2-fill';
        case icon == '09d' || icon == '09n':
            return icon = 'bi bi-cloud-drizzle-fill';
        case icon == '10d' || icon == '10n':
            return icon = 'bi bi-cloud-drizzle-fill';
        case icon == '11d' || icon == '11n':
            return icon = 'bi bi-cloud-lightning-fill';
        case icon == '13d' || icon == '13n':
            return icon = 'bi bi-cloud-snow-fill';
        case icon == '50d' || icon == '50n':
            return icon = 'bi bi-cloud-haze2-fill';
    }
}
const changeBg = (icon) => {
    switch (true) {
        case icon == '01d' || icon == '01n':
            return bgImg = images[0];
        case icon == '02d' || icon == '02n':
            return bgImg = images[1];
        case icon == '03d' || icon == '03n':
            return bgImg = images[2];
        case icon == '04d' || icon == '04n':
            return bgImg = images[3];
        case icon == '09d' || icon == '09n':
            return bgImg = images[4];
        case icon == '10d' || icon == '10n':
            return bgImg = images[5];
        case icon == '11d' || icon == '11n':
            return bgImg = images[6];
        case icon == '13d' || icon == '13n':
            return bgImg = images[7];
        case icon == '50d' || icon == '50n':
            return bgImg = images[8];
    }
}
/*=======================================
Event
=========================================*/
form.addEventListener('submit', (e) => {
    e.preventDefault();
    jQuery("#preloader").show().fadeOut(250);
    const city = input.value.split(/[ ,]+/)[0].normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    fetchDate(url);
    input.value = '';
});
/*====================================================
Initial
=====================================================*/
navigator.geolocation.getCurrentPosition(onSuccess, onError);
TeleportAutocomplete.init(input);