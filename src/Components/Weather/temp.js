// https://api.openweathermap.org/data/2.5/weather?q=pune&appid=090dd596acfb76cc9d8667365ea64e11


import React, {useEffect, useState} from 'react';
import WeatherCard from './weatherCard';
import"./style.css";

const Temp = () => {

    const[searchValue, setSearchValue] = useState("Bengaluru");

    const [tempInfo, setTempInfo] = useState({});

    const getWeatherInfo = async () => {
        try{
            let url =
            `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=090dd596acfb76cc9d8667365ea64e11`;

            let res = await fetch(url);
            let data = await res.json();

            const {temp, humidity, pressure} = data.main;
            const{ main: weatherMood} =  data.weather[0];
            const{name} = data;
            const{speed} =  data.wind;
            const{country, sunset} = data.sys;
            
            const myNewWeatherInfo = {
                temp,
                humidity,
                pressure,
                weatherMood,
                name,
                speed,
                country,
                sunset,
            };

            setTempInfo(myNewWeatherInfo);
        } 
        catch(error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getWeatherInfo();
    }, []);


  return (
   <>
        <div className="wrap">
            <div className="search">
                <input type="search" placeholder="search..." autoFocus id="search"
                className="searchTerm"
                value={ searchValue}
                onChange={ (e) => setSearchValue(e. target.value)}/>

                <button className="searchButton" type="button" onClick={getWeatherInfo}>Search</button>
            </div>
        </div>

        {/* Our temperature card */}

        <WeatherCard tempInfo = {tempInfo}/>
   </>
  )
}

export default Temp


