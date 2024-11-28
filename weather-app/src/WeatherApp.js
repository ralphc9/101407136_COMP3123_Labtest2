import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WeatherApp.css';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = '95218e78fa0bbcb501fbf14149e11b7d';
  
  const fetchWeather = async () => {
    if (!city) return; 

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
    } catch (err) {
      setError('City not found or invalid. Please try again.');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (city) {
      fetchWeather();
    }
  }, [city]);

  return (
    <div className="weather-container">
      <div className="header">
        <h1>Weather App</h1>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}

      {weather && (
        <div className="weather-details">
          <div className="weather-icon">
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
          </div>
          <div className="weather-row">
            <span>Condition:</span>
            <span>{weather.weather[0].description}</span>
          </div>
          <div className="weather-row">
            <span>Temperature:</span>
            <span>{weather.main.temp}°C</span>
          </div>
          <div className="weather-row">
            <span>Feels Like:</span>
            <span>{weather.main.feels_like}°C</span>
          </div>
          <div className="weather-row">
            <span>Humidity:</span>
            <span>{weather.main.humidity}%</span>
          </div>
          <div className="weather-row">
            <span>Wind Speed:</span>
            <span>{weather.wind.speed} m/s</span>
          </div>
        </div>
      )}

      <div className="footer">
        <span>Powered by OpenWeatherMap</span>
      </div>
    </div>
  );
};

export default WeatherApp;
