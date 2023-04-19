import React from 'react'

function More(props) {


    return (
        <div className="overlay">
            <div className="moreWrapper">
                <div className="overlayLabel">Clouds % :</div>
                <div className="overlayText">{props.data.clouds}</div>
            </div>
            <div className="moreWrapper">
                <div className="overlayLabel">Humidity:</div>
                <div className="overlayText">{props.data.humidity}</div>
            </div>
            <div className="moreWrapper">
                <div className="overlayLabel">Moon phase:</div>
                <div className="overlayText" >{props.data.moon_phase}</div>
            </div>
            <div className="moreWrapper">
                <div className="overlayLabel">Rain %:</div>
                <div className="overlayText">{props.data.pop * 100}</div>
            </div>
            <div className="moreWrapper">
                <div className="overlayLabel">Wind:</div>
                <div className="overlayText">{props.data.wind_speed} m/s</div>
            </div>

            <div className="close" onClick={props.close}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"><path d="m296 711-56-56 240-240 240 240-56 56-184-184-184 184Z"/></svg>
            </div>
        </div>

    )
}

export default More