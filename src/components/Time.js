import React from 'react'

const Time = ({minutes}) => {
    if(minutes < 60){
        return(
            <p className='m-3'>${minutes} min</p>
        )
    } else if(minutes % 60 === 0){
        return (
            <p className='m-3'>${minutes % 60} hr</p>
        )
    } else {
        return (
            <p className='m-3'>{Math.floor(minutes / 60)} hr {minutes % 60} min</p>
        )
    }
}

export default Time
