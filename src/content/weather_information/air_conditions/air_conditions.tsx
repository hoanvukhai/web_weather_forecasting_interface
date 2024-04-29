import React from 'react';
import { faDroplet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faTemperatureQuarter, faWind  } from '@fortawesome/free-solid-svg-icons';

function AirConditions() {  
    return (
        <div className='px-5 '>
            <div className='text-gray-300 font-bold flex justify-center mb-4'>AIR CONDITIONS</div>
            <div className='flex justify-between'>
                <div className='flex flex-col items-center'>
                    <div className='text-gray-300 text-sm mb-3'><FontAwesomeIcon icon={faTemperatureQuarter} /> Real Feel</div>
                    <div className='text-white font-bold'>33 °C</div>
                </div>
                <div className='flex flex-col items-center'>
                    <div className='text-gray-300 text-sm mb-3'><FontAwesomeIcon icon={faWind} /> Wind</div>
                    <div className='text-white font-bold'>1.29 m/s</div>
                </div>
                <div className='flex flex-col items-center'>
                    <div className='text-gray-300 text-sm mb-3'><FontAwesomeIcon icon={faCloud} /> Cloud</div>
                    <div className='text-white font-bold'>29 %</div>
                </div>
                <div className='flex flex-col items-center'>
                    <div className='text-gray-300 text-sm mb-3'><FontAwesomeIcon icon={faDroplet} /> Humidity</div>
                    <div className='text-white font-bold'>23 %</div>
                </div>
            </div>
        </div>
    );
}

export default AirConditions;