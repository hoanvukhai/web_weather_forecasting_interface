import React, { useState, useEffect } from 'react';
import weatherIcons from '../../../weatherIcons';

// import axios from 'axios';

function ForecastToday({ forecastData }: { forecastData: any }) {

    // const [weatherList, setWeatherList] = useState<{ time?: string; temperature?: number; icon?: string; }[]>([]);

    // useEffect(() => {
    //     const fetchWeather = async () => {
    //         try {
    //             const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast?q=hanoi&appid=8a7c5f0be154320f7be5cdd94e638411');
    //             const currentTime = new Date(); // Thời gian hiện tại

    //             // Lọc dự đoán thời tiết cho ngày hôm nay
    //             const todayForecasts = response.data.list.filter((forecast: any) => {
    //                 const forecastTime = new Date(forecast.dt_txt);
    //                 return forecastTime.getDate() === currentTime.getDate(); // Lọc theo ngày
    //             });

    //             // Lấy thông tin từ dự đoán thời tiết của ngày hôm nay
    //             const formattedForecasts = todayForecasts.map((forecast: any) => ({
    //                 time: forecast.dt_txt.split(' ')[1].slice(0, 5),
    //                 temperature: Math.round(forecast.main.temp - 273.15),
    //                 icon: forecast.weather[0].icon,
    //             }));

    //             setWeatherList(formattedForecasts);
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     fetchWeather();
    // }, []);

    const [weatherList, setWeatherList] = useState<{ time?: string; temperature?: number; icon?: string; }[]>([]);

    useEffect(() => {
        if (!forecastData) return;

        const currentTime = new Date(); // Thời gian hiện tại

        // Lọc dự đoán thời tiết cho ngày hôm nay
        const todayForecasts = forecastData.list.filter((forecast: any) => {
            const forecastTime = new Date(forecast.dt_txt);
            return forecastTime.getDate() === currentTime.getDate(); // Lọc theo ngày
        });

        // Lấy thông tin từ dự đoán thời tiết của ngày hôm nay
        const formattedForecasts = todayForecasts.map((forecast: any) => ({
            time: forecast.dt_txt.split(' ')[1].slice(0, 5),
            temperature: Math.round(forecast.main.temp - 273.15),
            icon: forecast.weather[0].icon,
        }));

        setWeatherList(formattedForecasts);
    }, [forecastData]);
    
    // Nếu không có dữ liệu dự báo, trả về null để không hiển thị bất kỳ điều gì
    if (!forecastData) return null;

    return (
        <div className=''>
            <div className='mb-4'>
                <div className='text-gray-300 font-bold flex justify-center'>TODAY'S FORECAST</div>
                <div className='text-sky-300 text-xs flex justify-center'>{weatherList.length} available forecasts</div>
            </div>
            <div className='flex justify-center '>
                {weatherList.map((forecast, index) => {
                    const iconSrc = weatherIcons[forecast.icon as keyof typeof weatherIcons || ''];
                    return(
                        <div key={index} className={`flex flex-col items-center bg-gray-100 ${index === 0 ? 'bg-opacity-40' : 'bg-opacity-10'} rounded-lg m-0.5  py-1 w-1/6`}>
                            <div className="text-xs text-gray-300 ">{forecast.time}</div>
                            <div className='size-8'><img src={iconSrc} alt="" /></div>
                            <div className="text-sm font-bold text-white">{forecast.temperature} °C</div> 
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ForecastToday;