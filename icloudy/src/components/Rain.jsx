import React from 'react'
import RainDrop from './RainDrop';

function Rain(props) {
    const rainList = Array.from({ length: 200 }, (_, index) => index + 1);

    return (
        <div className="screen">
            {rainList.map((x, i)=><RainDrop key={i} />)}
        </div>
    )
}

export default Rain