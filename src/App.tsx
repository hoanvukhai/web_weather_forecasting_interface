import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Heading from './header/header';
import Search from './search/search';
import Content from './content/content';


function App() {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [forecastData, setForecastData] = useState<any>(null); // Thêm trạng thái cho dữ liệu dự báo thời tiết

  // Define onCitySelect function if needed
  const onCitySelect = (city: any) => {
    // Do something with the selected city
  };

  return (
      <div className="h-screen bg-gradient-to-b from-black to-blue-900 flex justify-center items-start">
        <div className="w-screen max-w-5xl min-w-96" >
          <div className="bg-cover bg-[url('NightSky2.jpeg')] rounded-lg">
            <div className="rounded-lg border-2 border-white shadow-lg ">
              <div className='m-4'>
                <Heading/>
                <Search onCitySelect={onCitySelect} setWeatherData={setWeatherData} setForecastData={setForecastData}/>
                <Content weatherData={weatherData} forecastData={forecastData}/>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default App;
