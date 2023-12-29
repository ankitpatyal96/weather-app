const iconUrls = {
    '04n': 'https://openweathermap.org/img/wn/04n.png',
    '01d': 'https://openweathermap.org/img/wn/01d.png',
    '01n': 'https://openweathermap.org/img/wn/01n.png',
    '04d': 'https://openweathermap.org/img/wn/04d.png',
    '02d': 'https://openweathermap.org/img/wn/02d.png',
    '10d': 'https://openweathermap.org/img/wn/10d.png',
    '03n': 'https://openweathermap.org/img/wn/03n.png'
}

let weather = {
    fetchWeather: function (weatherCityFile) {
        fetch(weatherCityFile)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("No weather found.");
                }
                return response.json();
            })
            .then((data) => this.displayWeather(data))
            .catch((e) => {
                document.querySelector('.weather-box').classList.add("loading");
            });
    },

    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".location").innerText = "Weather in " + name;
        document.querySelector(".icon").src = iconUrls[icon];
        document.querySelector(".description").innerText = description;
        document.querySelector(".temperature").innerText = temp + "°C";
        document.querySelector(".humidity").innerText =
            "Humidity : " + humidity + "%";

        document.querySelector(".wind").innerText =
            "Wind speed : " + speed + " km/h";
        document.body.style.backgroundImage =
            "url('https://source.unsplash.com/1600x900/?" + name + "')";
        
        document.querySelector('.weather-box').classList.remove("loading");

    },

    search: function () {
        let value = "/data/" + document.querySelector(".input-search").value + ".json";
        this.fetchWeather(value);
    },
};

document.querySelector(".search-box button").addEventListener("click", function () {
    weather.search();
});

document
    .querySelector(".input-search")
    .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            weather.search();
        }
    });

weather.fetchWeather("/data/indonesia.json");