import '../App.css'
import MainSection from '../components/MainSection'
import Navbar from '../components/Navbar'
import SlidingWindow from '../components/SlidingWindow'
import { useEffect } from 'react'
import { useFetch } from '../customHooks/useFetch'
import { useLocation } from 'react-router-dom'

const IMG_URL = 'http://image.tmdb.org/t/p/original'

function Home() {
    const location = useLocation()

    useEffect(() => {
        console.log(location)
    })

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
                <Navbar />
                <MainSection movie={randomMovie} img={movieBackdrop} />
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
