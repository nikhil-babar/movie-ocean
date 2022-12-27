import { useMutation } from "react-query"

const apiPath = 'http://localhost:5000'

export const usePost = ({path, type, onSuccess, onError}) => {
    return useMutation(async (data) => {
        try {
            let response = await fetch(`${apiPath}${path}`, {
                method: type,
                headers: {
                    'Content-type': 'application/json'
                },
                mode: 'cors',
                body: JSON.stringify(data)
            })

            if (response.status !== 201) {
                throw new Error(response.status)
            }

            return await response.json()
        } catch (error) {
            throw error
        }
    }, {
        onSuccess: onSuccess,
        onError: onError
    })

}



