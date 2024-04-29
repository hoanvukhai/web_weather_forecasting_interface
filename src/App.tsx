import React from 'react';
import logo from './logo.svg';
import './App.css';
import Heading from './header/header';
import Search from './search/search';
import Content from './content/content';


function App() {
  return (
      <div className="h-screen bg-gradient-to-b from-black to-blue-900 flex justify-center items-start">
        <div className="w-screen max-w-5xl min-w-96" >
          <div className="bg-cover bg-[url('NightSky2.jpeg')] rounded-lg">
            <div className="rounded-lg border-2 border-white shadow-lg ">
              <div className='m-4'>
                <Heading/>
                <Search/>
                <Content/>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default App;
