import React, { useEffect, useState } from 'react'
import splash from '../assets/rd.png';

function RainDrop(props) {
    const [sideWays, setSideways] = useState();
    const [start, setStart] = useState();
    const [speed, setSpeed] = useState();
    const [thick, setThick] = useState();
    const [land, setLand] = useState();
    const [delay, setDelay] = useState();
    const [styles, setStyles] = useState({});

    useEffect(()=>{
        const randStart = Math.floor(Math.random() * window.innerWidth)
        const randSideways = Math.floor(Math.random()*100);
        const randSpeed = Math.floor(Math.random()*4) + 9;
        const randThick = Math.floor(Math.random()*3) + 1;
        const randLand = Math.floor(Math.random()*10) + 90;
        const randDelay = Math.floor(Math.random() * 10000);
        setSideways(randSideways);
        setStart(randStart);
        setSpeed(randSpeed);
        setThick(randThick);
        setLand(randLand);
        setDelay(randDelay);
        setStyles({
            '--sideways': randSideways+'px',
            '--speed': randSpeed+'s',
            '--thickness': randThick+'px',
            '--start': randStart+'px',
            '--delay': randDelay+'ms',
            '--land': randLand+'vh'
        });

    },[]);


    return (
        // <div className="rdOuter" style={`--sideways:${sideWays}px; --speed:${speed}s; --thickness:${thick}px; --start:${start}px; --delay:${delay}s; --land:${land}vh;`}>
        //     <img className="splash" src={splash} />
        // </div>
        <div className="rdOuter" style={styles}>
            <div className="rainDrop"></div>
            <img className="splash" src={splash} />
        </div>
    )
}

export default RainDrop