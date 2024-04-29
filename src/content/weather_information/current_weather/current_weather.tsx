import React, { useState, useEffect } from 'react';
import iconDay from '../../../icons/01d.png';
import iconNight from '../../../icons/01n.png';

const monthsOfYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function CurrentWeather() {
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

    const day = currentTime.getDate();
    const currentMonthIndex = currentTime.getMonth();
    const currentMonth = monthsOfYear[currentMonthIndex];
    
    // const formattedTime = currentTime.toLocaleTimeString();
    const formattedDate = `${day} ${currentMonth}`;
    return (
        <div className='px-10 '>
            <div className='text-gray-300 font-bold flex justify-center mb-4'>CURRENT WEATHER</div>
            <div className='flex justify-between '>
                <div className='flex flex-col items-center'>
                    <div className='text-white font-bold'>Hà Nội</div>
                    <div className='text-gray-300 text-xs'>Today {formattedDate}</div>
                </div>
                <div className='flex flex-col items-center'>
                    <div className='text-white font-bold'>35°C</div>
                    <div className='text-gray-300 text-xs'>clear sky</div>
                </div>
                <div className='flex flex-col items-center'>
                    <div className='size-12'>
                        <img src={isDayTime ? iconDay : iconNight} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CurrentWeather;