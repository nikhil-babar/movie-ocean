import React from 'react'
import { useState } from 'react'
import { useFetch } from '../customHooks/useFetch'

const Movies = () => {
    const [genre, setGenre] = useState(28)

    const { isSuccess, data:movies } = useFetch({
        path: `/movies/genre/${genre}`,
        queryKey: ['genre', genre],
    })

    return (
        <>
            <div className="mt-24 px-5">
                <div className="flex">
                    <div className="fixed">
                        <select name="genre" id="genre" placeholder='Genre' className='w-64'>
                            <option value={28}>Action</option>
                            <option value={12}>Adventure</option>
                            <option value={16}>Animation</option>
                            <option value={35}>Comedy</option>
                            <option value={878}>Science Fiction</option>
                        </select>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Movies
