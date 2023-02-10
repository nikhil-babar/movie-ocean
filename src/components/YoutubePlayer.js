
const YoutubePlayer = ({ value }) => {

    return (
        <>
            <iframe src={`https://www.youtube.com/embed/${value.key}`} title="videos" className='player z-0 hover:scale-105 transition-transform duration-[50] aspect-video md:w-[350px] mx-auto w-[320px]' allowFullScreen loading='eager' />
        </>
    )
}

export default YoutubePlayer
