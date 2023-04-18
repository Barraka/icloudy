import React, { useEffect, useState } from 'react'
import Favourite from './Favourite'

function Favourites(props) {


    return (
        <div className='favouriteWrapper'>
            
            {props.home ? <div className="homeLink">{props.home.name}</div> : null}
            {props.data.map(x=><Favourite data={x} />)}

        </div>
    )
}

export default Favourites