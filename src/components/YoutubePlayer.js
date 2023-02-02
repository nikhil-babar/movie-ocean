import React from 'react'
import '../styles/player.css'

const YoutubePlayer = ({ value }) => {
    return (
        <>
            <iframe src={`https://www.youtube.com/embed/${value.key}`} title="videos" className='player' allowFullScreen></iframe>
        </>
    )
}

export default YoutubePlayer
