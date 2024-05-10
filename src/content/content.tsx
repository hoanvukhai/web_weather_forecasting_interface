import React from 'react';
import WeeklyForecast from './forecast_overview/weekly_forecast';
import WeatherInformation from './weather_information/weather_information';
import { ReactComponent as SplashIcon } from '../splash-icon.svg';

function Content({ weatherData, forecastData }: { weatherData: any; forecastData: any}){
    return(
        <div>
            {weatherData && forecastData ? (
            <div className="">
                <div className="flex flex-col md:flex-row md:space-x-4 my-4">
                    <div className="w-full "><WeatherInformation weatherData={weatherData} forecastData={forecastData}/></div>
                    <div className="w-full"><WeeklyForecast forecastData={forecastData}/></div>
                </div>
            </div>
            ):(
                <div className='flex flex-col justify-center items-center h-96'>
                    <div className='size-40 my-4'><SplashIcon /></div>
                    <div className='text-gray-200 w-2/3 text-center my-4'>Explore current weather data and 4,5-day forecast of more than 200,000 cities!</div>
                </div>
            )}
        </div>
    );
}

export default Content;