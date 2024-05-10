import React, { useState, useEffect } from 'react';
import weatherIcons from '../../weatherIcons';
import { faDroplet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faTemperatureQuarter, faWind  } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function getDayOfWeek(dateString: string) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateString);
    const dayOfWeekIndex = date.getDay();
    return daysOfWeek[dayOfWeekIndex];
}

function WeeklyForecast({ forecastData }: { forecastData: any }) {

    const [weatherList, setWeatherList] = useState<{
        time?: string;
        description?: string;
        temperature?: number;
        icon?: string;
        windSpeed?: number;
        humidity?: number;
        clouds?: number;
    }[]>([]);

    // useEffect(() => {
    //     const fetchWeather = async () => {
    //         try {
    //             const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast?q=hanoi&appid=8a7c5f0be154320f7be5cdd94e638411');
    //             const currentTime = new Date(); // Thời gian hiện tại
    
    //             // Lọc dự đoán thời tiết cho 7 ngày tiếp theo
    //             const nextSevenDaysForecasts: any[] = [];
    //             const today = currentTime.getDate(); // Ngày hiện tại
    //             for (let i = 0; i < response.data.list.length; i++) {
    //                 const forecastTime = new Date(response.data.list[i].dt_txt);
    //                 const forecastDay = forecastTime.getDate();
    
    //                 if (forecastDay !== today && forecastTime.getHours() >= 12 && !nextSevenDaysForecasts.find(forecast => forecastDay === new Date(forecast.dt_txt).getDate())) {
                        
    //                     nextSevenDaysForecasts.push(response.data.list[i]);
    //                 }
    
    //             }
    
    //             setWeatherList(nextSevenDaysForecasts.map(forecast => ({
    //                 temperature: Math.round(forecast.main.temp - 273.15),
    //                 description: forecast.weather[0].description,
    //                 icon: forecast.weather[0].icon,
    //                 windSpeed: forecast.wind.speed,
    //                 humidity: forecast.main.humidity,
    //                 clouds: forecast.clouds.all,
    //                 time: forecast.dt_txt
    //             })));
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };
    
    //     fetchWeather();
    // }, []);


    useEffect(() => {
        const fetchWeather = async () => {
            try {
                if (!forecastData) return;

                const currentTime = new Date(); // Thời gian hiện tại

                const nextSevenDaysForecasts: any[] = [];
                const today = currentTime.getDate(); // Ngày hiện tại
                
                for (let i = 0; i < forecastData.list.length; i++) {
                    const forecastTime = new Date(forecastData.list[i].dt_txt);
                    const forecastDay = forecastTime.getDate();

                    if (forecastDay !== today && forecastTime.getHours() >= 12 && !nextSevenDaysForecasts.find((forecast: any) => forecastDay === new Date(forecast.dt_txt).getDate())) {
                        
                        nextSevenDaysForecasts.push(forecastData.list[i]);
                    }
                }

    
                setWeatherList(nextSevenDaysForecasts.map((forecast: any) => ({
                    temperature: Math.round(forecast.main.temp - 273.15),
                    description: forecast.weather[0].description,
                    icon: forecast.weather[0].icon,
                    windSpeed: forecast.wind.speed,
                    humidity: forecast.main.humidity,
                    clouds: forecast.clouds.all,
                    time: forecast.dt_txt
                })));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchWeather();
    }, [forecastData]);
    
    
    

    // Nếu không có dữ liệu dự báo, trả về null để không hiển thị bất kỳ điều gì
    if (!forecastData) return null;

    return (
        <div>
            <div className='text-gray-300 font-bold flex justify-center mb-2'>WEEKLY FORECAST</div>
            <div className='flex flex-col'>
                
                    {weatherList.map((forecast, index) => {
                        const iconSrc = weatherIcons[forecast.icon as keyof typeof weatherIcons || ''];
                        return(
                            <div key={index} className="flex justify-around items-center bg-gray-100 bg-opacity-10 rounded-xl m-0.5 py-2 w-full ">
                                <div className='w-28'>
                                    {/* <div>{forecast.time}</div> */}
                                    <div className='text-white text-sm font-bold'>{forecast.time ? getDayOfWeek(forecast.time) : ''}</div>
                                    <div className='my-1'></div>
                                    <div className='grid grid-cols-2 gap-2 justify-items-start place-items-center w-16'>
                                        <div className=''><img className='' src={iconSrc} alt="" /></div>
                                        <div className='text-gray-300 text-xs w-28'>{forecast.description}</div>
                                    </div>
                                </div>
                                <div className='w-20'>
                                    <div className='grid grid-cols-2 gap-2 justify-items-start place-items-center w-10'>
                                        <div className='text-gray-300 text-sm'><FontAwesomeIcon icon={faTemperatureQuarter} /></div>
                                        <div className='text-white text-sm font-bold'>{forecast.temperature}°C</div>
                                    </div>
                                    <div className='my-1'></div>
                                    <div className='grid grid-cols-2 gap-2 justify-items-start place-items-center w-10'>
                                        <div className='text-gray-300 text-sm'>
                                            <FontAwesomeIcon icon={faCloud} />
                                        </div>
                                        <div className='text-white text-sm font-bold'>
                                            {forecast.clouds}%
                                        </div>
                                    </div>
                                </div>
                                <div className='w-20'>
                                    <div className='grid grid-cols-2 gap-2 justify-items-start place-items-center w-10'>
                                        <div className='text-gray-300 text-sm'>
                                            <FontAwesomeIcon icon={faWind} />
                                        </div>
                                        <div className='text-white text-sm font-bold'>
                                            {forecast.windSpeed}m/s
                                        </div>
                                    </div>
                                    <div className='my-1'></div>
                                    <div className='grid grid-cols-2 gap-2 justify-items-start place-items-center w-10'>
                                        <div className='text-gray-300 text-sm'>
                                            <FontAwesomeIcon icon={faDroplet} />
                                        </div>
                                        <div className='text-white text-sm font-bold'>
                                            {forecast.humidity}%
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                
            </div>
        </div>
        
    );
}

export default WeeklyForecast;