import { axiosPrivateClient as axios } from "./axiosClient"

export async function getMovies() {
    const response = await axios.get('/movies')
    return response.data
}

export async function getMovieById(id) {
    if(isNaN(id)) throw new Error('Invalid movieId')

    const response = await axios.get(`/movies/${id}`)
    return response.data
}

export async function getMoviesByQuery(query) {
    if(query.match(/[^a-zA-Z ]/)) throw new Error('Invalid query')

    const url = new URL('http://localhost:5000/movies/search')
    url.searchParams.append('term', query)

    const response = await axios.get(url.href)
    return response.data
}

export async function getMoviesByGenre(genre, pageParam = 1) {
    const url = new URL('http://localhost:5000/movies/genre')
    url.searchParams.append('page', pageParam)
    url.searchParams.append('genre', genre)

    const response = await axios.get(url.pathname + url.search)
    return response.data
}
