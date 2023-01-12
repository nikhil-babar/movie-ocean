import { useInfiniteQuery } from "react-query"
import usePrivateAxios from "./usePrivateAxios"

const useInfiniteFetch = ({ queryKey, path, searchParams, onSuccess, onError }) => {
    const axiosPrivateClient = usePrivateAxios()

    return useInfiniteQuery(['moviesPage', queryKey], async ({ pageParam = 1 }) => {
        try {
            const url = new URL(`http://localhost:5000${path}`)

            for(const [key, value] of Object.entries(searchParams)){
                url.searchParams.append(key, value)
            }

            url.searchParams.append('page', pageParam)

            const response = await axiosPrivateClient.get(url.pathname + url.search)
            return response.data
        } catch (error) {
            throw error
        }
    }, {
        getNextPageParam: (lastPage) => {
            return lastPage.page + 1
        },
        onSuccess,
        onError,
        keepPreviousData: true
    })
}

export default useInfiniteFetch
