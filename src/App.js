import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const OPEN_WEATHER_API_KEY = process.env.REACT_APP_APIKEY;
  const COUNTRY_URL = `http://api.openweathermap.org/geo/1.0/direct`;
  const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather`;

  const [city, setCity] = useState("Singapore");
  const [name, setName] = useState("");
  const [temp, setTemp] = useState();
  const [maxTemp, setMaxTemp] = useState();
  const [minTemp, setMinTemp] = useState();
  const [feelsLike, setFeelsLike] = useState();
  const [humidity, setHumidity] = useState();
  const [icon, setIcon] = useState();
  const [weatherDescription, setWeatherDescription] = useState();

  const fetchData = () => {
    axios
      .get(`${COUNTRY_URL}?q=${city}&limit=1&appid=${OPEN_WEATHER_API_KEY}`)
      .then((response) => {
        return response.data[0];
      })
      .then((geoData) => {
        return axios.get(
          `${WEATHER_URL}?lat=${geoData.lat}&lon=${geoData.lon}&appid=${OPEN_WEATHER_API_KEY}&units=metric`
        );
      })
      .then((res) => {
        const weatherData = res.data;
        setTemp(weatherData.main.temp);
        setMaxTemp(weatherData.main.temp_max);
        setMinTemp(weatherData.main.temp_min);
        setFeelsLike(weatherData.main.feels_like);
        setHumidity(weatherData.main.humidity);
        setName(weatherData.name);
        setWeatherDescription(weatherData.weather[0].description);
        setIcon(weatherData.weather[0].icon);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const forecastData = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=1.2897&lon=103.8501&appid=${OPEN_WEATHER_API_KEY}`
      )
      .then((res) => console.log(res));
  };

  forecastData();

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className="App">
      <p>
        Welcome to the weather app! Type in the country you wish and hit the
        submit button!
      </p>

      <form onSubmit={handleSubmit}>
        <label>
          Insert Country Here:
          <br></br>
          <input type="text" value={city} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>

      <div>
        <p>Here are the stats</p>
        <img
          src={` http://openweathermap.org/img/wn/${icon}@2x.png`}
          alt="weather description icon"
        />
        <p>Current City: {name}</p>
        <p>Temp: {temp}</p>
        <p>Max Temp: {maxTemp}</p>
        <p>Min Temp: {minTemp}</p>
        <p>Feels Like: {feelsLike}</p>
        <p>Humidity: {humidity}</p>
        <p>Current Weather: {weatherDescription}</p>
      </div>
    </div>
  );
}

export default App;
