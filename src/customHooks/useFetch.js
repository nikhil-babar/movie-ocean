import { useQuery } from "react-query"

export const apiPath = 'http://192.168.43.41:5000'

export const useFetch = ({queryKey, prepare, path, onSuccess, onError}) => {
    return useQuery(`${queryKey}`, async () => {
        try {
            let response = await fetch(`${apiPath}${path}`)

            if (response.status !== 200) {
                throw new Error({ message: 'server side error' })
            }

            return await response.json()
        } catch (error) {
            console.log('useFetch error: ', error.message)
            throw new Error('useFetch hook error')
        }
    }, {
        onSuccess,
        onError,
        select: (prepare) ? prepare : (e) => { return e }
    })
}

