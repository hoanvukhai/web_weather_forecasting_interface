import React, { useState, useEffect } from 'react';
import iconCloudDay from '../../icons/04d.png';
import iconDrizzleDay from '../../icons/09d.png';
import iconRainDay from '../../icons/10d.png';
import iconThunderstormDay from '../../icons/11d.png';
import iconSnowDay from '../../icons/13d.png';
import iconUnknown from '../../icons/unknown.png';
import { faDroplet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faTemperatureQuarter, faWind  } from '@fortawesome/free-solid-svg-icons';

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];    

function WeeklyForecast() {

    const [currentDate, setCurrentDate] = useState(new Date());
    
        useEffect(() => {
            const interval = setInterval(() => {
                setCurrentDate(new Date());
            }, 1000);
            return () => {
                clearInterval(interval);
            };
        }, []);
    
        const currentDayIndex = currentDate.getDay();
        // const currentDay = daysOfWeek[currentDayIndex];

    const todayForecastData = [
        {
            day: daysOfWeek[(currentDayIndex + 1) % 7] ,
            icon: iconCloudDay,
            description: "overcast clouds",
            RealFeel: "31°C", 
            Cloud: "31%",
            Wind: "3.93m/s",
            Humidity: "60%",
        },
        { 
            day: daysOfWeek[(currentDayIndex + 2) % 7],
            icon: iconDrizzleDay,
            description: "drizzle",
            RealFeel: "31°C", 
            Cloud: "31%",
            Wind: "3.93m/s",
            Humidity: "60%",
        },
        { 
            day: daysOfWeek[(currentDayIndex + 3) % 7],
            icon: iconRainDay,
            description: "rain",
            RealFeel: "32°C", 
            Cloud: "32%",
            Wind: "4.08m/s",
            Humidity: "69%",
        },
        { 
            day: daysOfWeek[(currentDayIndex + 4) % 7],
            icon: iconThunderstormDay,
            description: "thunderstorm",
            RealFeel: "33°C", 
            Cloud: "37%",
            Wind: "3.95m/s",
            Humidity: "70%",
        },
        { 
            day: daysOfWeek[(currentDayIndex + 5) % 7],
            icon: iconSnowDay,
            description: "snow",
            RealFeel: "34°C", 
            Cloud: "41%",
            Wind: "3.99m/s",
            Humidity: "74%",
        },
        { 
            day: daysOfWeek[(currentDayIndex + 6) % 7],
            icon: iconUnknown,
            description: "fog",
            RealFeel: "35°C", 
            Cloud: "44%",
            Wind: "2.49m/s",
            Humidity: "88%",
        }
    ]; 
    return (
        <div>
            <div className='text-gray-300 font-bold flex justify-center mb-2'>WEEKLY FORECAST</div>
            <div className='flex flex-col'>
                
                    {todayForecastData.map((forecast, index) => (
                        <div key={index} className="flex justify-around items-center bg-gray-100 bg-opacity-10 rounded-xl m-0.5 py-2 w-full ">
                            <div className='w-28'>
                                <div className='text-white text-sm font-bold'>{forecast.day}</div>
                                <div className='my-1'></div>
                                <div className='grid grid-cols-2 gap-2 justify-items-start place-items-center w-16'>
                                    <span className='w-8'><img className='' src={forecast.icon} alt="" /></span>
                                    <div className='text-gray-300 text-xs w-28'>{forecast.description}</div>
                                </div>
                            </div>
                            <div className='w-20'>
                                <div className='grid grid-cols-2 gap-2 justify-items-start place-items-center w-10'>
                                    <div className='text-gray-300 text-sm'><FontAwesomeIcon icon={faTemperatureQuarter} /></div>
                                    <div className='text-white text-sm font-bold'>{forecast.RealFeel}</div>
                                </div>
                                <div className='my-1'></div>
                                <div className='grid grid-cols-2 gap-2 justify-items-start place-items-center w-10'>
                                    <div className='text-gray-300 text-sm'>
                                        <FontAwesomeIcon icon={faCloud} />
                                    </div>
                                    <div className='text-white text-sm font-bold'>
                                        {forecast.Cloud}
                                    </div>
                                </div>
                            </div>
                            <div className='w-20'>
                                <div className='grid grid-cols-2 gap-2 justify-items-start place-items-center w-10'>
                                    <div className='text-gray-300 text-sm'>
                                        <FontAwesomeIcon icon={faWind} />
                                    </div>
                                    <div className='text-white text-sm font-bold'>
                                        {forecast.Wind}
                                    </div>
                                </div>
                                <div className='my-1'></div>
                                <div className='grid grid-cols-2 gap-2 justify-items-start place-items-center w-10'>
                                    <div className='text-gray-300 text-sm'>
                                        <FontAwesomeIcon icon={faDroplet} />
                                    </div>
                                    <div className='text-white text-sm font-bold'>
                                        {forecast.Humidity}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                
            </div>
        </div>
        
    );
}

export default WeeklyForecast;