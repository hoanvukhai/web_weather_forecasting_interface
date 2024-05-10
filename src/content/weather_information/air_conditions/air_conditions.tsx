import React, { useState, useEffect } from 'react';
import { faDroplet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faTemperatureQuarter, faWind  } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function AirConditions({ weatherData }: { weatherData: any }) { 
    // const [weather, setWeather] = useState<{temperature?: number; windSpeed?: number; humidity?: number; clouds?: number}>({}); 

    // useEffect(() => {
    //     const fetchWeather = async () => {
    //         try {
    //             const response = await axios.get('https://api.openweathermap.org/data/2.5/weather?q=hanoi&appid=8a7c5f0be154320f7be5cdd94e638411');
    //             setWeather({
    //                 temperature: Math.round(response.data.main.temp - 273.15),
    //                 windSpeed: response.data.wind.speed, // Lấy tốc độ gió từ phản hồi API
    //                 humidity: response.data.main.humidity, // Lấy độ ẩm từ phản hồi API
    //                 clouds: response.data.clouds.all // Lấy thông tin về mây từ phản hồi API

    //             });
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     fetchWeather();
    // }, []);

    if (!weatherData) {
        return null; // Kiểm tra xem dữ liệu thời tiết đã sẵn sàng chưa
    }

    const { name, main, weather } = weatherData;
    const country = weatherData.sys.country;
    const temperature = Math.round(main.temp - 273.15);
    const description = weather[0].description;
    const icon = weather[0].icon;
    const humidity = main.humidity;
    const windSpeed = weatherData.wind.speed;
    const cloudAll = weatherData.clouds.all;

    return (
        <div className='px-5 '>
            <div className='text-gray-300 font-bold flex justify-center mb-4'>AIR CONDITIONS</div>
            <div className='flex justify-between'>
                <div className='flex flex-col items-center'>
                    <div className='text-gray-300 text-sm mb-3'><FontAwesomeIcon icon={faTemperatureQuarter} /> Real Feel</div>
                    <div className='text-white font-bold'>{temperature} °C</div>
                </div>
                <div className='flex flex-col items-center'>
                    <div className='text-gray-300 text-sm mb-3'><FontAwesomeIcon icon={faWind} /> Wind</div>
                    <div className='text-white font-bold'>{windSpeed} m/s</div>
                </div>
                <div className='flex flex-col items-center'>
                    <div className='text-gray-300 text-sm mb-3'><FontAwesomeIcon icon={faCloud} /> Cloud</div>
                    <div className='text-white font-bold'>{cloudAll} %</div>
                </div>
                <div className='flex flex-col items-center'>
                    <div className='text-gray-300 text-sm mb-3'><FontAwesomeIcon icon={faDroplet} /> Humidity</div>
                    <div className='text-white font-bold'>{humidity} %</div>
                </div>
            </div>
        </div>
    );
}

export default AirConditions;