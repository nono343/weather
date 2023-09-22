import React, { useState } from "react";
import "./WeatherApp.css";
import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import humidity_icon from "../Assets/humidity.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import axios from "axios";

const WeatherApp = () => {
  // Estado para almacenar los datos del clima y el ícono del clima
  const [weatherData, setWeatherData] = useState({
    humidity: "64%",
    windspeed: "30km/h",
    temperature: "24ºC",
    location: "Madrid",
  });

  const [icon, setIcon] = useState(cloud_icon); // Estado para el ícono del clima

  const api_key = "c89f078954645f0e135087fb742e51b8"; // Clave de OpenWeatherMap

  // Función para realizar la búsqueda del clima
  const search = async () => {
    const searchInput = document.getElementById("searchInput");
    if (!searchInput || !searchInput.value) {
      return;
    }

    const cityName = searchInput.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=Metric&appid=${api_key}`;

    try {
      const response = await axios.get(url);
      const data = response.data;
      const { main, wind, name, weather } = data;

      // Actualiza los datos del clima en el estado
      setWeatherData({
        humidity: `${main.humidity}%`,
        windspeed: `${wind.speed}km/h`,
        temperature: `${main.temp.toFixed(0)}ºC`,
        location: name,
      });

      // Cambia el ícono de acuerdo al estado del tiempo
      if (weather[0].icon === "01d" || weather[0].icon === "01n") {
        setIcon(clear_icon);
      } else if (weather[0].icon === "02d" || weather[0].icon === "02n") {
        setIcon(cloud_icon);
      } else if (weather[0].icon === "03d" || weather[0].icon === "03n") {
        setIcon(drizzle_icon);
      } else if (weather[0].icon === "04d" || weather[0].icon === "04n") {
        setIcon(drizzle_icon);
      } else if (weather[0].icon === "09d" || weather[0].icon === "09n") {
        setIcon(rain_icon);
      } else if (weather[0].icon === "10d" || weather[0].icon === "10n") {
        setIcon(rain_icon);
      } else if (weather[0].icon === "13d" || weather[0].icon === "13n") {
        setIcon(snow_icon);
      } else {
        setIcon(cloud_icon);
      }
    } catch (error) {
      console.error("Error al obtener datos del clima:", error);
    }
  };

  // Función para manejar la pulsación de la tecla Enter en el campo de búsqueda
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      search();
    }
  };

  return (
    <div className="container bg-primary rounded p-5 mt-5 text-center">
      <div className="input-group">
        <span className="input-group-text" id="addon-wrapping">
          <img
            src={search_icon}
            className="img-fluid"
            alt="..."
            onClick={search}
          />
        </span>
        <input
          id="searchInput"
          type="text"
          className="form-control"
          placeholder="Encuentra tu ciudad"
          aria-label="Search your location"
          aria-describedby="addon-wrapping"
          onKeyDown={handleKeyPress} // Agregar el evento onKeyDown para buscar al presionar Enter
        />
      </div>
      <div className="weather-image mt-5">
        <img src={icon} className="rounded-5" alt="..." />
      </div>

      <div className="weather-temp text-white display-1 mt-4">
        {weatherData.temperature}
      </div>
      <div className="weather-location text-white display-5">
        {weatherData.location}
      </div>
      <div className="data-container mt-5 d-flex justify-content-center text-white">
        <div className="element-humidity mx-auto">
          <img src={humidity_icon} alt="" className="icon" />
          <div className="data mt-1 h5">
            <div className="humidity-percent">{weatherData.humidity}</div>
            <div className="text">Humedad</div>
          </div>
        </div>
        <div className="element-windspeed mx-auto">
          <img src={wind_icon} alt="" className="icon" />
          <div className="data h5">
            <div className="windspeed-velocity">{weatherData.windspeed}</div>
            <div className="text">Velocidad del Viento</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
