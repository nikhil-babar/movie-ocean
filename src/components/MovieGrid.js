import MovieCard from './cards/MovieCard'
import { useNavigate } from 'react-router-dom'

const MovieGrid = ({ movies }) => {
    const navigate = useNavigate()

    const onCardClick = (id) => {
        navigate(`/home/movies/${id}`)
    }

    return (
        <>
            <div className="grid-movie sm:p-2">
                {
                    movies.map((movie) => {
                        return <MovieCard value={movie} key={movie.id} onCardClick = {onCardClick}/>
                    })
                }
            </div>
        </>
    )
}

export default MovieGrid
