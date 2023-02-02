import { axiosPrivateClient as axios } from "./axiosClient"

export async function getMovies() {
    const response = await axios.get('/movies')
    return response.data
}

export async function getMovieById(id) {
    if (isNaN(id)) throw new Error('Invalid movieId')

    const response = await axios.get(`/movies/${id}`)
    return response.data
}

export async function getMoviesByQuery(query) {
    const response = await axios.get('/movies/search', {
        params: {
            term: query
        }
    })

    return response.data
}

export async function getMoviesByGenre(genre, pageParam = 1) {

    const response = await axios.get('/movies/genre', {
        params: {
            page: pageParam,
            genre
        }
    })

    return response.data
}
