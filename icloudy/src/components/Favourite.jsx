import React, { useEffect, useState } from 'react'

function Favourite(props) {
    useEffect(()=>{
        console.log('data: ', props.data);
    },[]);
    
    return (
        <div className='favItem' onClick={e=>props.fetchData(props.data)}>
            {props.data.name}
            <svg onClick={e=>props.removeFav(e,props.data)} className='remove' xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="m291 816-51-51 189-189-189-189 51-51 189 189 189-189 51 51-189 189 189 189-51 51-189-189-189 189Z"/></svg>
        </div>
    )
}

export default Favourite