import { createContext } from 'react'
import { useQuery } from 'react-query'
import { getMovieById } from '../api/movies'

export const Context = createContext({})

const MovieContext = ({ id, children }) => {
    const {
        isSuccess,
        isLoading,
        data: movie,
    } = useQuery(['movies', parseInt(id)], () => getMovieById(id))

    if (isLoading) {
        return (
            <div class="flex justify-center items-center h-screen">
                <i class="fa-solid fa-circle-notch animate-spin text-red-600 sm:text-5xl text-4xl"></i>
            </div>
        )
    }

    if(isSuccess){
        return (
            <Context.Provider value={movie ? { ...movie } : {}}>
                {
                    children
                }
            </Context.Provider>
        )
    }
}

export default MovieContext
