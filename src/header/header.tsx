import React, {useState, useEffect} from "react";
import logo from './logo_weather.png';
import avatar from './Mona_Lisa.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';

function Heading() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    const formattedTime = currentTime.toLocaleTimeString();
    const formattedDate = currentTime.toLocaleDateString();

    return (
        <div className="flex justify-between my-1">
            <div className=""><img src={logo} alt="WeatherLogo" className="h-7"/></div>
            <div className="text-gray-300 text-sm font-bold">
                <span>{formattedTime}</span>
                <span className="ml-1 mr-1"></span>
                <span>{formattedDate}</span>
            </div>
            <div className="">
                <a href="https://github.com/hoanvukhai/web_weather_forecasting_interface.git" className=" ">
                {/* <img src={avatar} alt="MonaLisa" className="w-10 h-10 rounded-full" /> */}
                <div className="text-sky-500 hover:bg-sky-500 px-2 py-0.5 bg-white rounded-3xl hover:text-white"><FontAwesomeIcon icon={faUserTie} /></div>
                </a>
            </div>
        </div>
    );

}

export default Heading;