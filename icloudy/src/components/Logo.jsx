import React, { useEffect, useRef, useState, useContext } from 'react'
import {UserContext} from '../App';
import logo from '../assets/Cloudy.png';

function Logo(props) {
    const {dataNow, removeLogo } = useContext(UserContext);
    const logoRef = useRef(null);
    const [style, setStyle] = useState(true);

    useEffect(()=>{
        
    },[]);
     
    useEffect(()=>{
        if(Object.keys(dataNow).length) {
            setStyle(false);
            
        }
    },[dataNow]);

    function animateEnd() {
        if(logoRef.current.classList.contains('removeLogo')) {
            logoRef.current.classList.add('end');
            removeLogo();
        }
        
    }

    return (
        <div ref={logoRef} className={style ? "logo" : "removeLogo"} onAnimationEnd={animateEnd} >
            <img src={logo} alt="logo" className="img" />
        </div>
    )
}

export default Logo