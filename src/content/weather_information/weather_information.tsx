import React from 'react';
import CurrentWeather from './current_weather/current_weather';
import AirConditions from './air_conditions/air_conditions';
import ForecastToday from './forecast_today/forecast_today';

function WeatherInfomation() {
    return (
        <div className='flex flex-col justify-between h-full w-full'>
            <CurrentWeather />
            <AirConditions />
            <ForecastToday />
        </div>
    )
}

export default WeatherInfomation;