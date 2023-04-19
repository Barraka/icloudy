import React, { useEffect, useState } from 'react'
import splash from '../assets/rd.png';

function RainDrop(props) {
    const [styles, setStyles] = useState({});

    useEffect(()=>{
        const randStart = Math.floor(Math.random() * window.innerWidth)
        const randSideways = Math.floor(Math.random()*100);
        const randSpeed = Math.floor(Math.random()*4) + 9;
        const randThick = Math.floor(Math.random()*3) + 1;
        const randLand = Math.floor(Math.random()*10) + 90;
        const randDelay = Math.floor(Math.random() * 10000);
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
        <div className="rdOuter" style={styles}>
            <div className="rainDrop"></div>
            <img className="splash" src={splash} draggable='false' />
        </div>
    )
}

export default RainDrop