import React, { useEffect, useRef, useState, useContext } from 'react'
import {UserContext} from '../App';
import Favourite from './Favourite';

function Search(props) {
    const {dataNow, setDataNow, setDataForecast, updateCity, setDisplayLogo} = useContext(UserContext);
    const searchRef = useRef(null);
    const [home, setHome]= useState();
    const [favs, setFavs] = useState([]);
    const [suggestion, setSuggestion] = useState([]);

    useEffect(()=>{
        const homeRaw = localStorage.getItem('home');
        if(homeRaw) {
            const home = JSON.parse(homeRaw);
            searchRef.current.value=home.name;
            setHome(home);
        }
        let fav = localStorage.getItem('fav');
        if(fav) {
            fav = JSON.parse(fav);
            setFavs(fav);
        }

        //----Listen Enter
        window.addEventListener('keydown', checkEnter);
        return ()=> {
            window.removeEventListener('keydown', checkEnter);
        }
    },[]);

    useEffect(()=>{
    
    },[suggestion, favs, home]);

    function checkEnter(e) {
        if(e.key==='Enter') {
            getData();
            searchRef.current.blur();
        }
    }

    async function getData() {
        let town=searchRef.current.value;
        if(home && town===home.name) {
            fetchData(home);
            return;
        }
        const firstLetter = town.charAt(0);
        const rest = town.slice(1);
        town= firstLetter.toUpperCase() + rest;
        if(!town)return;
        const key = import.meta.env.VITE_APP_ID; 
        let cities = `https://api.openweathermap.org/geo/1.0/direct?q=${town}&limit=10&appid=${key}`     
        try {            
            const reqCities = await fetch(cities);
            const dataCities = await reqCities.json();           

            const filteredCities = dataCities.reduce((accumulator, currentValue) => {
                // check if an object with the same name, country, and state already exists in the accumulator array
                const exists = accumulator.some((item) => {
                  return item.name === currentValue.name && 
                         item.country === currentValue.country && 
                         item.state === currentValue.state;
                });              
                if(!exists)accumulator.push(currentValue);
              
                return accumulator;
              }, []);

            if(filteredCities.length>1) {
                setSuggestion(filteredCities);
                setDataNow({});
                setDisplayLogo(true);
                return;
            }
            fetchData(dataCities[0]);
        } catch(err) { 
            console.error('Error: ', err);
        }
    }
    async function fetchData(city) {
        setSuggestion([]);
        searchRef.current.value=city.name;
        const key = import.meta.env.VITE_APP_ID;        
        let url_now=`https://api.openweathermap.org/data/3.0/onecall?lat=${city.lat}&lon=${city.lon}&appid=${key}`;
        const reqNow = await fetch(url_now);
        const dataSearchNow = await reqNow.json();
        dataSearchNow.current.name=city.name;
        dataSearchNow.current.lat=dataSearchNow.lat;
        dataSearchNow.current.lon=dataSearchNow.lon;
        setDataNow(dataSearchNow.current);
        setDataForecast(dataSearchNow.daily);
    }

    function addHome() {
        localStorage.setItem('home', JSON.stringify({name:dataNow.name, lat:dataNow.lat, lon: dataNow.lon}));
        setHome(dataNow);
    }

    function addFavourite() {
        let current = localStorage.getItem('fav');
        if(current) {
            current = JSON.parse(current);
            current.push({name:dataNow.name, lat:dataNow.lat, lon: dataNow.lon});
            setFavs(current);
            localStorage.setItem('fav', JSON.stringify(current));
        } else {
            current = [{name:dataNow.name, lat:dataNow.lat, lon: dataNow.lon}];
            localStorage.setItem('fav', JSON.stringify(current));
        }
    }
    function handleInput(e) {
        updateCity(e.target.value)
        if(e.target.value==='')setSuggestion([]);
    }
    function removeHome() {
        localStorage.removeItem('home');
        setHome(undefined);
    }
    function removeFav(e,f) {
        e.preventDefault();
        e.stopPropagation();
        let fav = localStorage.getItem('fav');
        fav = JSON.parse(fav);
        fav = fav.filter(x=>x.name!==f.name);
        setFavs(fav);
        localStorage.setItem('fav', JSON.stringify(fav));
    }

    return (
        <div className='searchWrapper'>
            <div className="outerSearch">            
                <input ref={searchRef} className='citySearch' type="search" name="search" id="search" onChange={handleInput} autoComplete="off" />
                <div className="svgWrapper">
                    
                    <svg onClick={getData} className='searchSVG' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"><path d="M784 936 532 684q-30 24-69 38t-83 14q-109 0-184.5-75.5T120 476q0-109 75.5-184.5T380 216q109 0 184.5 75.5T640 476q0 44-14 83t-38 69l252 252-56 56ZM380 656q75 0 127.5-52.5T560 476q0-75-52.5-127.5T380 296q-75 0-127.5 52.5T200 476q0 75 52.5 127.5T380 656Z"/></svg>

                    {Object.keys(dataNow).length ? 
                    <svg onClick={addHome} className='searchSVG' xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M264 840h96V600h240v240h96V492L480 330 264 492v348Zm-72 72V456l288-216 288 216v456H528V672h-96v240H192Zm288-327Z"/></svg> : null}

                    {Object.keys(dataNow).length ? 
                    <svg onClick={addFavourite} className='searchSVG' xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="m352 811 128-76 129 76-34-144 111-95-147-13-59-137-59 137-147 13 112 95-34 144ZM243 960l63-266L96 515l276-24 108-251 108 252 276 23-210 179 63 266-237-141-237 141Zm237-333Z"/></svg> : null}
                    
                </div>
            </div>
            
            {suggestion.length ? 
                <div className="suggestionWrapper">
                    {suggestion.map((x, i)=> {                
                        return<div key={i} onClick={e=>fetchData(x)} className="suggestion">{x.name} - {x.state} - {x.country}</div>                
                    })}
                </div>
            : null }

            {(favs.length || home) && !suggestion.length ? 
                <div className='favouriteWrapper'>
            
                    {home ? <div className="favItem" onClick={e=>fetchData(home)}>
                        <svg className='searchSVG' xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M264 840h96V600h240v240h96V492L480 330 264 492v348Zm-72 72V456l288-216 288 216v456H528V672h-96v240H192Zm288-327Z"/></svg>
                        {home.name}
                        <svg onClick={removeHome} className='remove' xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="m291 816-51-51 189-189-189-189 51-51 189 189 189-189 51 51-189 189 189 189-51 51-189-189-189 189Z"/></svg>
                        </div> 
                        : null}
                    {favs.map(x=><Favourite key={x.lat} data={x} fetchData={fetchData} removeFav={removeFav} />)}
    
                </div> 
            : null }
        </div>
    )
}

export default Search