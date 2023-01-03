import { useQuery } from "react-query"
import usePrivateAxios from "./usePrivateAxios"

export const useFetch = ({queryKey, prepare, path, onSuccess, onError}) => {
    const axiosPrivateClient = usePrivateAxios()

    return useQuery(`${queryKey}`, async () => {
        try {
            let response = await axiosPrivateClient(`${path}`)

            return response.data
        } catch (error) {
            console.log('useFetch error: ', error)
            throw new Error('useFetch hook error')
        }
    }, {
        onSuccess,
        onError,
        select: (prepare) ? prepare : (e) => { return e }
    })
}

