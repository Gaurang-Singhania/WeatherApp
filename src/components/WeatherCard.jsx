import React from 'react';
import { motion } from 'framer-motion';
import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
} from "react-icons/io";

import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsEye,
  BsWater,
  BsThermometer,
  BsWind,
} from "react-icons/bs";

import { TbTemperatureCelsius } from "react-icons/tb";
import { ImSpinner8 } from "react-icons/im";

const WeatherCard = ({ data, loading }) => {
  if (!data) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-300">
        <ImSpinner8 className="text-5xl animate-spin text-white" />
      </div>
    );
  }

  let icon;
  switch (data.weather[0].main) {
    case "Clear":
      icon = <IoMdSunny />;
      break;
    case "Clouds":
      icon = <IoMdCloudy />;
      break;
    case "Rain":
      icon = <IoMdRainy />;
      break;
    case "Thunderstorm":
      icon = <IoMdThunderstorm />;
      break;
    case "Drizzle":
      icon = <BsCloudDrizzleFill />;
      break;
    case "Haze":
      icon = <BsCloudHaze2Fill />;
      break;
    case "Snow":
      icon = <IoMdSnow />;
      break;
    default:
      icon = <IoMdSunny />;
      break;
  }

  const date = new Date();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className="w-full max-w-[450px] bg-black/20 min-h-[584px] text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6"
    >
      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <ImSpinner8 className="text-white text-5xl animate-spin" />
        </div>
      ) : (
        <div>
          {/* top part */}
          <div className="flex items-center gap-x-5">
            <div className="text-[80px]">{icon}</div>
            <div>
              <div className="text-2xl font-semibold">
                {data.name}, {data.sys.country}
              </div>
              <div>
                {date.getUTCDate()}/{date.getUTCMonth() + 1}/{date.getUTCFullYear()}
              </div>
            </div>
          </div>
          {/* middle part */}
          <div className="my-20">
            <div className="flex justify-center items-center">
              <div className="text-[140px] leading-none font-light">
                {parseInt(data.main.temp)}
              </div>
              <div className="text-4xl"><TbTemperatureCelsius /></div>
            </div>
            <div className="capitalize text-center">
              {data.weather[0].description}
            </div>
          </div>
          {/* bottom part */}
          <div className="max-w-[378px] mx-auto flex flex-col gap-y-6">
            <div className="flex justify-between">
              <div className="flex items-center gap-x-2">
                <div className="text-[20px]">
                  <BsEye />
                </div>
                <div>
                  Visibility <span className="ml-2">{data.visibility / 1000} km</span>
                </div>
              </div>
              <div className="flex items-center gap-x-2">
                <div className="text-[20px]">
                  <BsThermometer />
                </div>
                <div className="flex">
                  Feels like{" "}
                  <span className="ml-2 flex">
                    {parseInt(data.main.feels_like)} <TbTemperatureCelsius />
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-x-2">
                <div className="text-[20px]">
                  <BsWater />
                </div>
                <div>
                  Humidity{" "}
                  <span className="ml-2">{data.main.humidity} %</span>
                </div>
              </div>
              <div className="flex items-center gap-x-2">
                <div className="text-[20px]">
                  <BsWind />
                </div>
                <div>
                  Wind<span className="ml-2">{data.wind.speed} m/s</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default WeatherCard;
