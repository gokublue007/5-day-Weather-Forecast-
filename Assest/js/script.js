// Created varibles to able to call APIs
var cityName = document.getElementById("cityName");
var formSubmit = document.getElementById("formSubmit");
var apiKey = "81b4c7c4da34e876161d3d4ab3f9e4a6";
var dashBoard = document.querySelector(".dashBoard");
var fiveDay = document.querySelector(".fiveDay");

formSubmit.addEventListener("submit", getApi);

// Called function to call API, and use InnerHTML to create divs and p classes to call and push the forecast data onto the page
function getApi(event) {
    event.preventDefault();

    var city = cityName.value

    var currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    fetch(currentUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (currentData) {
            console.log(currentData);
            var requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${currentData.coord.lat}&lon=${currentData.coord.lon}&exclude={part}&appid=${apiKey}&units=imperial`;
            fetch(requestUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    dashBoard.innerHTML = `
            <h2>${currentData.name} ${moment(data.daily[1].dt, "X").format("(MM/DD/YYYY)")} ☁️ </h2>
            <p>Temp: ${currentData.main.temp} ℉ </p>
            <p>Wind: ${currentData.wind.speed} MPH</p>
            <p>Humidity: ${currentData.main.humidity} %</p>
            <p>UV Index: ${data.current.uvi} </p>`

                    fiveDay.innerHTML = `
            <div class="col-sm-2">
            <div class="card">
            <div class="card-body">
                <h5 class="card-title">${moment(data.daily[1].dt, "X").format("MM/DD/YYYY")} </h5>
                <p class="card-text">Temp: ${data.daily[1].temp.day} ℉ </p>
                <p class="card-text">Wind: ${data.daily[1].wind_speed} MPH</p>
                <p class="card-text">Humidity: ${data.daily[1].humidity} % </p>
            </div>
            </div>
        </div>
        <div class="col-sm-2">
            <div class="card">
            <div class="card-body">
                <h5 class="card-title">${moment(data.daily[2].dt, "X").format("MM/DD/YYYY")} </h5>
                <p class="card-text">Temp: ${data.daily[2].temp.day} ℉ </p>
                <p class="card-text">Wind: ${data.daily[2].wind_speed} MPH</p>
                <p class="card-text">Humidity: ${data.daily[2].humidity} % </p>
            </div>
            </div>
        </div>
        <div class="col-sm-2">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${moment(data.daily[3].dt, "X").format("MM/DD/YYYY")} </h5>
                    <p class="card-text">Temp: ${data.daily[3].temp.day} ℉ </p>
                    <p class="card-text">Wind: ${data.daily[3].wind_speed} MPH</p>
                    <p class="card-text">Humidity: ${data.daily[3].humidity} % </p>
                </div>
            </div>
            </div>
            <div class="col-sm-2">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${moment(data.daily[4].dt, "X").format("MM/DD/YYYY")} </h5>
                    <p class="card-text">Temp: ${data.daily[4].temp.day} ℉ </p>
                    <p class="card-text">Wind: ${data.daily[4].wind_speed} MPH</p>
                    <p class="card-text">Humidity: ${data.daily[4].humidity} % </p>
                </div>
                </div>
            </div>
            <div class="col-sm-2">
                <div class="card">
                <div class="card-body">
                    <h5 class="card-title"> ${moment(data.daily[5].dt, "X").format("MM/DD/YYYY")} </h5>
                    <p class="card-text">Temp: ${data.daily[5].temp.day} ℉ </p>
                    <p class="card-text">Wind: ${data.daily[5].wind_speed} MPH</p>
                    <p class="card-text">Humidity: ${data.daily[5].humidity} % </p>
                </div>
            </div>
            </div>`
                });
        });
}