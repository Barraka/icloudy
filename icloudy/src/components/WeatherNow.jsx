import React, { useEffect, useState, useContext, useRef } from 'react'
import {UserContext} from '../App';

function WeatherNow(props) {
    const {dataNow, setDataNow, dataForecast, convertTemp, toggleConvert, tempSign } = useContext(UserContext);
    const windRef = useRef(null);

    useEffect(()=>{
        windRef.current.style.transform = `rotate(${dataNow.wind_deg}deg)`
    },[]);
    


    return (
        <div className="now" style={{ backgroundColor: "rgb(0, 0, 255)" }}>

            <div className="leftPane">
                <div className="itemWrapper">
                    <div className="nowLabel">Clouds %:</div>
                    <div className="nowText">{dataNow.clouds}</div>
                </div>
                <div className="itemWrapper">
                    <div className="nowLabel">Wind Speed:</div>
                    <div className="nowText">{dataNow.wind_speed}  m/s</div>
                </div>
                <div className="itemWrapper">
                    <div className="nowLabel">Wind Dir. :</div>
                    <div className="windDir">
                        <svg ref={windRef} xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M444 864V426L243 627l-51-51 288-288 288 288-51 51-201-201v438h-72Z"/></svg>
                    </div>
                </div>
            </div>

            <div className="middlePane">
                <div className="cityNameWrapper">
                    <div className="place">{dataNow.name}</div>
                    
                    
                </div>
                <div className="icon">
                    <img
                        className="iconImg"
                        src={`https://openweathermap.org/img/wn/${dataNow.weather[0].icon}@2x.png`}
                    />
                </div>
                <div className="description">{dataNow.weather[0].description}</div>
                <div className="tempOuter" onClick={toggleConvert} >
                    <div className="temp">{convertTemp(dataNow.temp)}</div>
                    <div className="tempSign">{tempSign}</div>
                </div>
            </div>

            <div className="rightPane">
                <div className="itemWrapper">
                    <div className="nowLabel">Feels like:</div>
                    <div className="nowText" data-temp="now">
                        {convertTemp(dataNow.feels_like) +' ' + tempSign}
                    </div>
                </div>
                <div className="itemWrapper">
                    <div className="nowLabel">Visibility:</div>
                    <div className="nowText" data-temp="now">
                        {dataNow.visibility}
                    </div>
                </div>
                <div className="itemWrapper">
                    <div className="nowLabel">Humidity:</div>
                    <div className="nowText">{dataNow.humidity}</div>
                </div>
            </div>
        </div>
    )
}

export default WeatherNow