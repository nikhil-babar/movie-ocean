import React from 'react'
import { useState } from 'react'
import useInfiniteFetch from '../customHooks/useInfiniteFetch'
import MovieGrid from '../components/MovieGrid'
import Dropdown from '../components/Dropdown'

const GENRE_DROPDOWN = [
    {
        "id": 28,
        "name": "Action"
    },
    {
        "id": 12,
        "name": "Adventure"
    },
    {
        "id": 16,
        "name": "Animation"
    },
    {
        "id": 35,
        "name": "Comedy"
    },
    {
        "id": 80,
        "name": "Crime"
    },
    {
        "id": 99,
        "name": "Documentary"
    },
    {
        "id": 18,
        "name": "Drama"
    },
    {
        "id": 10751,
        "name": "Family"
    },
    {
        "id": 14,
        "name": "Fantasy"
    },
    {
        "id": 36,
        "name": "History"
    },
    {
        "id": 27,
        "name": "Horror"
    },
    {
        "id": 10402,
        "name": "Music"
    },
    {
        "id": 9648,
        "name": "Mystery"
    },
    {
        "id": 10749,
        "name": "Romance"
    },
    {
        "id": 878,
        "name": "Science Fiction"
    },
    {
        "id": 10770,
        "name": "TV Movie"
    },
    {
        "id": 53,
        "name": "Thriller"
    },
    {
        "id": 10752,
        "name": "War"
    },
    {
        "id": 37,
        "name": "Western"
    }
]

const Movies = () => {
    const [genre, setGenre] = useState(28)

    const { isSuccess, data: movies, fetchNextPage } = useInfiniteFetch({
        queryKey: genre,
        path: '/movies/genre',
        searchParams: {
            genre
        },
        onSuccess: (data) => {
            console.log(data)
        }
    })

    const getMovies = () => {
        let temp = []

        for (const page of movies.pages) {
            for (const movie of page.results) {
                temp.push(movie)
            }
        }

        return temp
    }

    if (isSuccess) {
        const getTitle = () => {
            for (const item of GENRE_DROPDOWN) {
                if (genre === item.id) {
                    return item.name
                }
            }
        }

        return (
            <>
                <div className="mt-16 sm:mt-24 px-3 lg:max-w-[95%] mx-auto">
                    <div className="p-2 sm:p-5">
                        <header className='flex p-5 text-4xl text-white justify-between my-5'>
                            <p>{getTitle()}</p>
                            <Dropdown list={GENRE_DROPDOWN} setData={setGenre} icon='fa-solid fa-caret-down' />
                        </header>

                        <div>
                            <MovieGrid movies={getMovies()} />
                            <button className='bg-green-600 text-white my-5' onClick={fetchNextPage}>Load more</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Movies
