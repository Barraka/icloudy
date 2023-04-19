import React, { useContext } from 'react'
import {UserContext} from '../App';
import Card from './Card';

function Forecast(props) {
    const { dataForecast } = useContext(UserContext);

    return (
        <div className="forecast">
            <div className="innerForecast" >
                {dataForecast.map(x=><Card key={x.dt} data={x} />)}                
            </div>
        </div>
    )
}

export default Forecast