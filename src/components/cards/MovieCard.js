import React from 'react'

const Card = ({ value, onCardClick }) => {

    return (
        <>
            <div className="card text-center" onClick={()=>onCardClick(value.id)}>
                <img src={`https://image.tmdb.org/t/p/original${value.poster_path}`} alt = "Poster" className="card-img" />
                <h5 className='text-sm text-white py-2'>{value.title}</h5>
                <p className="text-xs text-yellow-500 text-wrap">Rating: {value.vote_average}</p>
            </div>
        </>
    )
}

export default Card
