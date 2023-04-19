import React, { useEffect, useState, useContext, useRef } from 'react'
import {UserContext} from '../App';
import More from './More';

function Card(props) {
    const {convertTemp, tempSign} = useContext(UserContext);
    const [dateDay, setDateDay] = useState();
    const [date, setDate] = useState();
    const [month, setMonth] = useState();
    const [displayMore, setDisplayMore] = useState(false);
    const cardRef = useRef(null);

    useEffect(()=>{        
        const today = new Date(props.data.dt * 1000);
        setDateDay(today.toLocaleDateString("en-EN",{weekday: 'long'}).slice(0,3));
        setDate(today.getDate());
        setMonth(today.toLocaleString('default', { month: 'long' }).slice(0,3));
        cardRef.current.style.backgroundColor = getBg(props.data.clouds);
    },[]);

    function getBg(clouds) {
        let r=parseInt(0 + (clouds*128/100));
        let g=parseInt(0 + (clouds*128/100));
        let b=parseInt(150 - (22*clouds/100));
        return `rgb(${r},${g},${b})`;
    }

    function close() {
        setDisplayMore(false);
    }

    return (
        <div ref={cardRef} className="cardOuter" >
            <div className="date">
                <div className="day">{dateDay}</div>
                <div className="dayOuter">
                    <div className="day2">{date}</div>
                    <div className="month">{month}</div>
                </div>
                <div className="temp">{convertTemp(props.data.temp.day)} {tempSign}</div>
            </div>
            <div className="icon">
                <img className="iconImg" src={`https://openweathermap.org/img/wn/${props.data.weather[0].icon}@2x.png`} draggable='false' />
            </div>
            <div className="description">{props.data.weather[0].description}</div>
            <div className="temperatureWrapper">
                
                <div className="tempPlus">Min: {convertTemp(props.data.temp.min)} {tempSign}</div>
                <div className="tempPlus">Max: {convertTemp(props.data.temp.max)} {tempSign}</div>
            </div>
            <div className="more" onClick={e=>setDisplayMore(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"><path d="m480 716 180-180-57-56-123 123-123-123-57 56 180 180Zm0 260q-83 0-156-31.5T197 859q-54-54-85.5-127T80 576q0-83 31.5-156T197 293q54-54 127-85.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 83-31.5 156T763 859q-54 54-127 85.5T480 976Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
            </div>
            {displayMore ? <More data={props.data} close={close} /> : null}
        </div>
    )
}

export default Card