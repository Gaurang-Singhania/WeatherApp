import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "./components/Search.jsx";
import WeatherCard from "./components/WeatherCard.jsx";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const key = "7677682f69458b9d5d36c9f60a647135";

const App = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("london");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input !== "") {
      fetchWeatherData(input);
      setInput("");
    }
  };

  const fetchWeatherData = (location) => {
    setLoading(true);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${key}`;

    axios.get(url).then((res) => {
      setData(res.data);
      setLocation(location);
      setLoading(false);
      toast.success("Weather data fetched successfully!");
    }).catch((error) => {
      console.error("Error fetching weather data:", error);
      setLoading(false);
      toast.error("Failed to fetch weather data!");
    });
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLoading(true);
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${key}`
          )
          .then((res) => {
            setData(res.data);
            setLocation(`${res.data.name}, ${res.data.sys.country}`);
            setLoading(false);
            toast.success("Location fetched successfully!");
          })
          .catch((error) => {
            console.error("Error fetching weather data:", error);
            setLoading(false);
            toast.error("Failed to fetch location weather data!");
          });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    console.log("Fetching weather data for location:", location);
    fetchWeatherData(location);
  }, [location]);

  return (
    <div className="w-full h-screen bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-300 flex flex-col items-center justify-center px-4 lg:px-0">
      <Search input={input} handleInput={handleInput} handleSubmit={handleSubmit} handleLocation={handleLocation} />
      <WeatherCard data={data} loading={loading} />
      <ToastContainer pauseOnHover={false} />
    </div>
  );
};

export default App;
