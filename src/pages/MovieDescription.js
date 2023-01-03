import React from "react";
import Time from "../components/Time";
import { useParams } from "react-router-dom";
import { useFetch } from "../customHooks/useFetch";
import Background from "../components/Background";
import SlidingWindow from "../components/SlidingWindow";
import useWindow from "../customHooks/useWindow";

const IMG_URL = "http://image.tmdb.org/t/p/original";

const MovieDescription = () => {
    const { id } = useParams()
    const { width } = useWindow()

    const {
        isLoading,
        isSuccess,
        data: movie,
    } = useFetch({
        queryKey: `movie: ${id}`,
        path: `/movies/${id}`,
        onSuccess: () => {
            console.log(`successfully fetched movie: ${id}`);
        },
        onError: () => {
            console.log("error in fetching");
        },
    })

    if (isLoading) {
        return <h1 className="text-white">loading..</h1>;
    }

    if (isSuccess) {
        const poster_path = `${IMG_URL}${movie.details.poster_path}`;
        console.log(poster_path);

        return (
            <>
                <div className="h-fit">
                    <Background img={`${IMG_URL}${movie.details.backdrop_path}`}>
                        <div className="md:flex justify-start mt-20 md:mt-24 h-fit px-2 md:px-0 lg:mt-32">
                            <img
                                src={`${poster_path}`}
                                alt="poster"
                                className="rounded-lg w-52 h-80 sm:w-64 sm:h-96 shadow-md shadow-white mx-auto md:mx-10 max-h-96"
                            />
                            <div className="pb-3 md:pt-2 text-white max-w-2xl pt-5">
                                <h2 className="text-2xl md:text-3xl mx-3">
                                    {movie.details.title}
                                </h2>
                                <Time minutes={movie.details.runtime} />
                                <button className="bg-yellow-500 m-3">Add to playlist</button>
                                <p className="p-3 mt-3 mb-1">{movie.details.overview}</p>
                                <div className="px-3">{getCrewDetails()}</div>
                            </div>
                        </div>
                        {
                            (width < 1024) ? <SlidingWindow movies={movie.related} title={"You may also like"} className={'mt-10'} /> : <div></div>
                        }
                    </Background>
                </div>
                {
                    (width >= 1024) ? <SlidingWindow movies={movie.related} title={"You may also like"} className={''} /> : <div></div>
                }
            </>
        );
    }

    function getCrewDetails() {
        const getUnique = (array) => {
            return array.filter((v, i, arr) => arr.indexOf(v) === i && i < 15)
        }

        return (
            <>
                {[
                    {
                        title: "Director",
                        value: getUnique(movie.crew.directors.map(e => e.name)),
                    },
                    {
                        title: "Producer",
                        value: getUnique(movie.crew.producers.map(e => e.name)),
                    },
                    {
                        title: "Writer",
                        value: getUnique(movie.crew.writers.map(e => e.name)),
                    },

                ].map((element) => {
                    return (
                        <p className="py-1 text-white text-md" key={element.title}>
                            <span className="text-yellow-600">{element.title}</span>: {element.value.join(', ')}
                        </p>
                    );
                })}
            </>
        );
    }
};

export default MovieDescription;
