import React from 'react'

const MainSection = ({movie, img}) => {

    return (
        <>
            <section>
                <div className='section-main' style={{
                    backgroundImage: `url('${img}')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    backgroundSize: 'cover',
                    backgroundBlendMode: 'darken'
                }}>
                    <div className="bottom-2 left-0 p-3 z-10 sm:p-5 md:p-7 lg:p-12">
                        <p className='text-3xl text-white sm:text-4xl md:text-5xl lg:my-4'>{movie.title}</p>
                        <p className="text-sm text-yellow-500 sm:text-lg">Rating: {movie.vote_average}</p>
                        <p className="text-xs text-white mt-3 text-ellipsis sm:max-h-fit max-h-14 sm:overflow-auto overflow-scroll sm:text-sm md:text-lg description">{movie.overview}</p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default MainSection
