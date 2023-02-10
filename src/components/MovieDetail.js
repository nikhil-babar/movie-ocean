import useMovie from '../customHooks/useMovie'
import Time from "./Time";
import Background from './Background'

const IMG_URL = "http://image.tmdb.org/t/p/original";

const MovieDetail = () => {
    const {
        backdrop_path,
        poster_path,
        title,
        overview,
        runtime,
        crew,
    } = useMovie()

    const poster = `${IMG_URL}${poster_path}`;
    const backdrop = `${IMG_URL}${backdrop_path}`;

    const getUnique = (array) => {
        return array.filter((v, i, arr) => arr.indexOf(v) === i && i < 4)
    }

    return (
        <>
            <Background img={backdrop}></Background>
            <div className="md:flex justify-start mt-20 md:mt-24 h-fit px-2 md:px-0 lg:mt-32">
                <img
                    src={`${poster}`}
                    alt="poster"
                    className="rounded-lg w-52 h-80 sm:w-64 sm:h-96 shadow-md shadow-white mx-auto md:mx-10 max-h-96"
                />
                <div className="pb-3 md:pt-2 text-white max-w-2xl pt-5 md:w-full sm:w-[95%] md:mt-0 mt-10 mx-auto sm:mx-0">
                    <h2 className="text-2xl md:text-3xl mx-3">
                        {title}
                    </h2>
                    <Time minutes={runtime} />
                    <p className="p-3 mt-3 mb-1">{overview}</p>
                    <div className="px-3">
                        {[
                            {
                                title: "Director",
                                value: getUnique(crew.directors.map(e => e.name)),
                            },
                            {
                                title: "Producer",
                                value: getUnique(crew.producers.map(e => e.name)),
                            },
                            {
                                title: "Writer",
                                value: getUnique(crew.writers.map(e => e.name)),
                            },

                        ].map((element) => {
                            return (
                                <p className="py-1 text-white text-md" key={element.title}>
                                    <span className="text-yellow-500 font-bold">{element.title}</span>: {element.value.join(', ')}
                                </p>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default MovieDetail
