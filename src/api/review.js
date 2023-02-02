import { axiosPrivateClient as axios } from './axiosClient'

export async function getReviews(movieId, page, limit) {
    const response = await axios.get(`/reviews/${movieId}`, {
        params: {
            page,
            limit
        }
    })

    return response.data
}

export async function addReview(review) {
    const response = await axios.post('/reviews', review)

    return response.data
}