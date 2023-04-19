import { useState, createContext, useEffect, useRef } from 'react'
import './styles/styles.css';
import './styles/rain.css';
import Search from './components/Search';
import Logo from './components/Logo';
import WeatherNow from './components/WeatherNow';
import Forecast from './components/Forecast';
import Rain from './components/Rain';

const UserContext = createContext('info');

function App() {
    const [dataNow, setDataNow] = useState({});
    const [dataForecast, setDataForecast] = useState([]);
    const [convertTemp, setConvertTemp] = useState(()=>convertToCelsius);
    const [tempSign, setTempSign] = useState('°C');
    const [displayLogo, setDisplayLogo] = useState(true);
    const [citySearch, setCitySearch] = useState('');
    const containerRef = useRef(null);

    useEffect(()=>{
        if(Object.keys(dataNow).length)displaceSearch(); 
        else containerRef.current.classList.add('homePage');
    },[dataNow]);

    function updateCity(e) {
        setCitySearch(e);
        if(e==='' && displayLogo===false) {
            setDisplayLogo(true);
            setDataNow({});
        }
    }

    function convertToCelsius(t) {
        const value=parseFloat(t)-273.13;
        return value.toFixed(1);;
    }
    
    function convertToFarhenheit(t) {
        const value=(parseFloat(t)-273.15) * (9/5) + 32;
        return value.toFixed(1);;
    }

    function toggleConvert() {
        if(tempSign==='°C') {
            setConvertTemp(()=>convertToFarhenheit);
            setTempSign('°F');
        } else {
            setConvertTemp(()=>convertToCelsius);
            setTempSign('°C');
        }
    }
    function removeLogo() {
        setDisplayLogo(false);        
    }
    function displaceSearch() {
        containerRef.current.classList.remove('homePage');
    }


    return (
        <UserContext.Provider value={{dataNow, setDataNow, dataForecast, setDataForecast, convertTemp, toggleConvert, tempSign, removeLogo, citySearch, setCitySearch, updateCity, setDisplayLogo }}>
            
            <div className="appWrapper">
            
                <Rain />

                {displayLogo ? <Logo /> : null }                

                <div ref={containerRef} className="container homePage">
                    <Search />        
                    {Object.keys(dataNow).length ? <WeatherNow /> : null}    
                    {Object.keys(dataNow).length ? <Forecast /> : null}  
                </div>
            </div>
        </UserContext.Provider>
    )
}

export {App as default, UserContext}

