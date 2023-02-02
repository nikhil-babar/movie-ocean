import { createContext } from 'react'
import { useQuery } from 'react-query'
import { getMovieById } from '../api/movies'

export const Context = createContext({})

const MovieContext = ({ id, children }) => {
    const {
        isSuccess,
        data: movie,
    } = useQuery(['movies', parseInt(id)], () => getMovieById(id))

    if (isSuccess) {
        return (
            <Context.Provider value={{ ...movie }}>
                {
                    children
                }
            </Context.Provider>
        )
    }
}

export default MovieContext
