import { useParams } from "react-router-dom";
import CrewDetails from "../components/CrewDetails";
import MovieDetail from "../components/MovieDetail";
import MovieRelated from "../components/MovieRelated";
import MovieContext from "../context/MovieContext";


const MovieDescription = () => {
    const { id } = useParams()

    return (
        <>
            <MovieContext id={id}>
                <MovieDetail />
                <div className="lg:w-[85%] md:w-[90%] sm:w-[93%] mx-auto w-full lg:mt-0 md:mt-10 lg:absolute top-[650px] left-0 right-0 block">
                    <CrewDetails/>
                    <MovieRelated/>
                </div>
            </MovieContext>
        </>
    );
};

export default MovieDescription;
