import React from 'react';
import WeeklyForecast from './forecast_overview/weekly_forecast';
import WeatherInformation from './weather_information/weather_information';
function Content(){
    return(
        <div>
            <div className="">
                <div className="flex flex-col md:flex-row md:space-x-4 my-4">
                    <div className="w-full "><WeatherInformation/></div>
                    <div className="w-full"><WeeklyForecast/></div>
                </div>
            </div>
        </div>
    );
}

export default Content;