import { useQuery } from "react-query"
import usePrivateAxios from "./usePrivateAxios"

export const useFetch = ({queryKey, prepare, path, searchParams, onSuccess, onError, enabled, placeholderData, keepPreviousData}) => {
    const axiosPrivateClient = usePrivateAxios()

    return useQuery(queryKey, async () => {
        try {
            const url = new URL(`http://localhost:5000${path}`)

            if(searchParams){
                for(const [key, value] of Object.entries(searchParams)){
                    url.searchParams.append(key, value)
                }
            }

            const response = await axiosPrivateClient.get(url.pathname + url.search)
            
            return response.data
        } catch (error) {
            console.log(error)
            throw new Error('useFetch hook error')
        }
    }, {
        onSuccess,
        onError,
        select: (prepare) ? prepare : (e) => { return e },
        enabled,
        placeholderData,
        keepPreviousData
    })
}

