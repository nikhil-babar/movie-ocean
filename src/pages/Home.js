import '../App.css'
import SlidingWindow from '../components/SlidingWindow'
import { useFetch } from '../customHooks/useFetch'
import {  useNavigate } from 'react-router-dom'
import Background from '../components/Background'

const IMG_URL = 'http://image.tmdb.org/t/p/original'

function Home() {
    const navigate = useNavigate()

    const onSuccess = () => {
        console.log('Data fetched sucessfully')
    }

    const onError = () => {
        console.log('error while fetching')
    }

    const { isSuccess, isError, data, error, isLoading } = useFetch({
        type: 'GET',
        path: '/movies',
        queryKey: 'main-slider',
        onSuccess,
        onError
    })

    if (isLoading) {
        return (
            <h1 className='text-white'>Loading...</h1>
        )
    }

    else if (isSuccess) {
        const randomMovie = getRandomMovie(data)
        const movieBackdrop = `${IMG_URL}${randomMovie.backdrop_path}`

        return (
            <>
                <section className='section-main'>
                    <Background img={movieBackdrop} className = {'justify-end'}>
                        <div className="bottom-2 left-0 p-3 z-10 sm:p-5 md:p-7 lg:p-12 mb-5">
                            <p className='text-xl text-white sm:text-3xl md:text-5xl lg:my-4'>{randomMovie.title}</p>
                            <p className="text-sm text-yellow-500 sm:text-lg">Rating: {randomMovie.vote_average}</p>
                            <p className="text-xs text-white mt-3 text-ellipsis sm:max-h-fit max-h-14 sm:overflow-auto overflow-scroll sm:text-sm md:text-lg description">{randomMovie.overview}</p>
                        </div>
                    </Background>
                </section>
                {
                    data.map((section) => {
                        return <SlidingWindow movies={section.data} title={section.title} key={section.title} />
                    })
                }
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
