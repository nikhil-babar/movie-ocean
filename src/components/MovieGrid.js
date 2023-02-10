import MovieCard from './cards/MovieCard'
import { useNavigate } from 'react-router-dom'

const MovieGrid = ({ movies }) => {
    const navigate = useNavigate()

    return (
        <>
            <div className="grid-movie sm:p-2">
                {
                    movies.map((movie) => {
                        return <MovieCard value={movie} key={movie.id} onCardClick = {(id) => navigate(`/movies/${id}`)}/>
                    })
                }
            </div>
        </>
    )
}

export default MovieGrid
