import React, { useState, useEffect } from "react";
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
  const [weatherData, setWeatherData] = useState({
    humidity: "64%",
    windspeed: "30km/h",
    temperature: "24ºC",
    location: "Madrid",
  });

  const [icon, setIcon] = useState(cloud_icon);
  const [iconAnimation, setIconAnimation] = useState(""); // Estado para la clase CSS de animación

  const api_key = "c89f078954645f0e135087fb742e51b8";

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

      setWeatherData({
        humidity: `${main.humidity}%`,
        windspeed: `${wind.speed}km/h`,
        temperature: `${main.temp.toFixed(0)}ºC`,
        location: name,
      });

      if (weather[0].icon === "01d" || weather[0].icon === "01n") {
        setIconAnimation("animate__bounce"); // Activa la animación
        setIcon(clear_icon);
      } else if (weather[0].icon === "02d" || weather[0].icon === "02n") {
        setIconAnimation("animate__bounce");
        setIcon(cloud_icon);
      } else if (weather[0].icon === "03d" || weather[0].icon === "03n") {
        setIconAnimation("animate__bounce");
        setIcon(drizzle_icon);
      } else if (weather[0].icon === "04d" || weather[0].icon === "04n") {
        setIconAnimation("animate__bounce");
        setIcon(drizzle_icon);
      } else if (weather[0].icon === "09d" || weather[0].icon === "09n") {
        setIconAnimation("animate__bounce");
        setIcon(rain_icon);
      } else if (weather[0].icon === "10d" || weather[0].icon === "10n") {
        setIconAnimation("animate__bounce");
        setIcon(rain_icon);
      } else if (weather[0].icon === "13d" || weather[0].icon === "13n") {
        setIconAnimation("animate__bounce");
        setIcon(snow_icon);
      } else {
        setIconAnimation(""); // Limpia la animación
        setIcon(cloud_icon);
      }
    } catch (error) {
      console.error("Error al obtener datos del clima:", error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      search();
    }
  };

  useEffect(() => {
    // Limpia la animación después de 1 segundo
    const animationTimeout = setTimeout(() => {
      setIconAnimation("");
    }, 1000);

    return () => clearTimeout(animationTimeout);
  }, [iconAnimation]);

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
          onKeyDown={handleKeyPress}
        />
      </div>
      <div className={`weather-image mt-5 animate__animated ${iconAnimation}`}>
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
