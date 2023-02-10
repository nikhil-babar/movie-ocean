import SlidingWindow from '../components/SlidingWindow'
import Background from '../components/Background'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getMovies } from '../api/movies'

const IMG_URL = 'http://image.tmdb.org/t/p/original'

function Home() {
    const navigate = useNavigate()

    const { isSuccess, isError, data, error, isLoading } = useQuery(['movies'], getMovies)

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <i className="fa-solid fa-circle-notch animate-spin text-red-600 sm:text-5xl text-4xl"></i>
            </div>
        )
    }
    
    else if (isSuccess) {
        const randomMovie = getRandomMovie(data)
        const movieBackdrop = `${IMG_URL}${randomMovie.backdrop_path}`

        return (
            <>
                <section className='section-main'>
                    <Background img={movieBackdrop} className={'justify-end section-main'}>
                        <div className="bottom-2 left-0 p-3 z-10 sm:p-5 md:p-7 lg:p-12 mb-5">
                            <p className='text-xl text-white sm:text-3xl md:text-5xl lg:my-4'>{randomMovie.title}</p>
                            <p className="text-sm text-yellow-500 sm:text-lg">Rating: {randomMovie.vote_average}</p>
                            <p className="text-white md:block hidden my-3 max-w-[70%]">{randomMovie.overview}</p>
                        </div>
                    </Background>
                </section>
                <div className="pt-10">
                    {
                        data.map((section) => {
                            return <SlidingWindow value={section.data} title={section.title} key={section.title} className='lg:w-[85%] md:w-[90%] sm:w-[93%] mx-auto mb-3 md:mb-16 sm:mb-10' type={1} clickFunc={(id) => navigate(`/home/movies/${id}`)} />
                        })
                    }
                </div>
            </>
        )
    }

    else if (isError) {
        return (
            <h1 className='text-white'>Error: {error.message}</h1>
        )
    }
}

function getRandomMovie(movies) {
    let i = Math.round(Math.random() * (movies.length - 1))
    let j = Math.round(Math.random() * (movies[i].data.length - 1))
    return movies[i].data[j]
}

export default Home;
