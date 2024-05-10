import React, { useState, useEffect } from 'react';
import weatherIcons from '../../../weatherIcons';
// import axios from 'axios';


const monthsOfYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];



function CurrentWeather({ weatherData }: { weatherData: any }) {
    const [currentTime, setCurrentTime] = useState(new Date());
    // const [isDayTime, setIsDayTime] = useState(false);

    // const [weather, setWeather] = useState<{temperature?: number; description?: string; icon?: string; name?: string, country?: string }>({});

    // useEffect(() => {
    //     const fetchWeather = async () => {
    //         try {
    //             const response = await axios.get('https://api.openweathermap.org/data/2.5/weather?q=hanoi&appid=8a7c5f0be154320f7be5cdd94e638411');
    //             setWeather({
    //                 temperature: Math.round(response.data.main.temp - 273.15),
    //                 description: response.data.weather[0].description,
    //                 icon: response.data.weather[0].icon,
    //                 name: response.data.name,
    //                 country: response.data.sys.country
    //             });
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     fetchWeather();
    // }, []);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    if (!weatherData) {
        return null; // Kiểm tra xem dữ liệu thời tiết đã sẵn sàng chưa
      }
    
      const { name, main, weather } = weatherData;
      const country = weatherData.sys.country;
      const temperature = Math.round(main.temp - 273.15);
      const description = weather[0].description;
      const icon = weather[0].icon;



    const day = currentTime.getDate();
    const currentMonthIndex = currentTime.getMonth();
    const currentMonth = monthsOfYear[currentMonthIndex];
    
    // const formattedTime = currentTime.toLocaleTimeString();
    const formattedDate = `${day} ${currentMonth}`;

    const iconSrc = weatherIcons[icon as keyof typeof weatherIcons || ''];

    return (
        <div className='px-10 '>
            <div className='text-gray-300 font-bold flex justify-center mb-4'>CURRENT WEATHER</div>
            <div className='flex justify-between items-center'>
                <div className='flex flex-col items-center'>
                    <div className='text-white font-bold w-28 text-center'>{name}, {country}</div>
                    <div className='text-gray-300 text-xs'>Today {formattedDate}</div>
                </div>
                <div className='flex flex-col items-center'>
                    <div className='text-white font-bold'>{temperature}°C</div>
                    <div className='text-gray-300 text-xs text-center'>{description}</div>
                </div>
                <div className='flex flex-col items-center'>
                    <div className='size-12'>
                        <img src={iconSrc} alt="" className=''/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CurrentWeather;