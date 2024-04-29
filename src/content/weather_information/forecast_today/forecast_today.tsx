import React, { useState, useEffect } from 'react';
import iconClearSkyDay from '../../../icons/01d.png';
import iconClearSkyNight from '../../../icons/01n.png';
import iconFewCloudsDay from '../../../icons/02d.png';
import iconFewCloudsNight from '../../../icons/02n.png';
import iconScatteredCloudsDay from '../../../icons/03d.png';
import iconScatteredCloudsNight from '../../../icons/03n.png';



function ForecastToday() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isDayTime, setIsDayTime] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        const currentHour = currentTime.getHours();
        setIsDayTime(currentHour >= 6 && currentHour < 18); // Giả định ban ngày từ 6h sáng đến 6h chiều
    }, [currentTime]);

    const todayForecastData = [
        {
            time: "06:00",
            temperature: "25°C",
            weather: isDayTime ? iconClearSkyDay : iconClearSkyNight
        },
        {
            time: "09:00",
            temperature: "27°C",
            weather: isDayTime ? iconClearSkyDay : iconClearSkyNight
        },
        { 
            time: "12:00", 
            temperature: "28°C",
            weather: isDayTime ? iconFewCloudsDay : iconFewCloudsNight
        },
        { 
            time: "15:00", 
            temperature: "26°C",
            weather: isDayTime ? iconFewCloudsDay : iconFewCloudsNight
        },
        { 
            time: "18:00", 
            temperature: "24°C",
            weather: isDayTime ? iconScatteredCloudsDay : iconScatteredCloudsNight
        },
        { 
            time: "21:00", 
            temperature: "23°C",
            weather: isDayTime ? iconScatteredCloudsDay : iconScatteredCloudsNight
        }
    ]; 
    return (
        <div className=''>
            <div className='mb-4'>
                <div className='text-gray-300 font-bold flex justify-center'>TODAY'S FORECAST</div>
                <div className='text-sky-300 text-xs flex justify-center'>{todayForecastData.length} available forecasts</div>
            </div>
            <div className='flex justify-between'>
                {todayForecastData.map((forecast, index) => (
                    <div key={index} className={`flex flex-col items-center bg-gray-100 ${index === 0 ? 'bg-opacity-40' : 'bg-opacity-10'} rounded-lg m-0.5 w-full py-1`}>
                            <div className="text-xs text-gray-300 ">{forecast.time}</div>
                            <div className='size-8'><img src={forecast.weather} alt="" /></div>
                            <div className="text-sm font-bold text-white">{forecast.temperature}</div> 
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ForecastToday;