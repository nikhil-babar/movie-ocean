import React from "react";
import Time from "../components/Time";
import { useNavigate, useParams } from "react-router-dom";
import Background from "../components/Background";
import SlidingWindow from "../components/SlidingWindow";
import useWindow from "../customHooks/useWindow";
import { useQuery } from "react-query";
import { getMovieById } from "../api/movies";

const IMG_URL = "http://image.tmdb.org/t/p/original";

const MovieDescription = () => {
    const { id } = useParams()
    const { width } = useWindow()
    const navigate = useNavigate()

    const {
        isLoading,
        isSuccess,
        data: movie,
    } = useQuery(['movies', parseInt(id)], () => getMovieById(id))

    if (isLoading) {
        return <h1 className="text-white">loading..</h1>;
    }

    if (isSuccess) {
        const poster_path = `${IMG_URL}${movie.details.poster_path}`;

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
                            <div className="pb-3 md:pt-2 text-white max-w-2xl pt-5 md:w-full sm:w-[95%] md:mt-0 mt-10 mx-auto sm:mx-0">
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
                            (width < 1024) ? temp() : <div></div>
                        }
                    </Background>
                </div>
                {
                    (width >= 1024) ? temp() : <div></div>
                }
            </>
        );
    }

    function getCrewDetails() {
        const getUnique = (array) => {
            return array.filter((v, i, arr) => arr.indexOf(v) === i && i < 4)
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
                            <span className="text-yellow-500 font-bold">{element.title}</span>: {element.value.join(', ')}
                        </p>
                    );
                })}
            </>
        );
    }

    function temp() {
        return (
            <>
                <div className="lg:w-[85%] md:w-[90%] sm:w-[93%] mx-auto w-full lg:mt-0 md:mt-10">
                    <div className="flex justify-between w-full gap-10">
                        <SlidingWindow value={movie.crew.cast} key = "top cast" className={'md:mt-10 sm:mt-7 h-72 sm:h-80 md:h-96 lg:w-3/4 w-full'} title={'Top Cast'} type={2} />

                        <div className="w-56 h-64 relative top-12 lg:block hidden">
                            {
                                [
                                    {
                                        title: "Revenue",
                                        value: (movie.details.revenue === 0) ? 'Unknown' : movie.details.revenue.toLocaleString('en-IN', {
                                            style: 'currency',
                                            currency: 'INR'
                                        }),
                                    },
                                    {
                                        title: "Budget",
                                        value: (movie.details.budget === 0) ? 'Unknown' : movie.details.budget.toLocaleString('en-IN', {
                                            style: 'currency',
                                            currency: 'INR'
                                        }),
                                    },
                                    {
                                        title: "Release date",
                                        value: movie.details.release_date,
                                    },
                                    {
                                        title: 'Production',
                                        value: movie.details.production_companies.map((e)=>e.name).filter((_e, i) => i<2).join(', ')
                                    },
                                    {
                                        title: 'Genre',
                                        value: movie.details.genres.map((e)=>e.name).filter((_e, i) => i<2).join(', ')
                                    },
                                    {
                                        title: 'Countries',
                                        value: movie.details.production_countries.map((e)=>e.name).filter((_e, i) => i<2).join(', ')
                                    },
                                ].map((e) => {
                                    return <p className="mb-2 p-1 text-sm" key = {e.title}><span className="text-yellow-500 font-bold">{e.title}</span>: <span className="text-gray-300">{e.value}</span></p>
                                })
                            }
                        </div>
                    </div>

                    <SlidingWindow value={movie.related} title={'You may also like'} key = "related" className={''} type={1} clickFunc={(id) => navigate(`/home/movies/${id}`)} />
                </div>
            </>
        )
    }
};

export default MovieDescription;
