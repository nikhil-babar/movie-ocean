import { useEffect } from 'react'
import useAuth from './useAuth'
import { axiosPrivateClient, axiosClient } from '../api/axiosClient'

const usePrivateAxios = () => {
    const { auth, setAuth } = useAuth()

    useEffect(() => {
        const requestInterceptor = axiosPrivateClient.interceptors.request.use(
            async config => {
                config.headers['Authorization'] = `Bearer ${auth.accessToken}`
                return config
            },

            async error => {
                return Promise.reject(error)
            }
        )

        const responseInterceptor = axiosPrivateClient.interceptors.response.use(
            response => response,

            async error => {
                try {
                    if(error.response?.status === 401){
                        const request = error.config

                        const newAccessToken = await axiosClient('/user/getAccessToken')

                        setAuth(prev => {
                            return { ...prev, accessToken: newAccessToken.data.accessToken }
                        })

                        return axiosClient(request)
                    }

                    return Promise.reject('')

                } catch (error) {
                    return Promise.reject(error)
                }
            }
        )

        return () => {
            axiosPrivateClient.interceptors.request.eject(requestInterceptor)
            axiosPrivateClient.interceptors.response.eject(responseInterceptor)
        }
    }, [auth, setAuth])

    return axiosPrivateClient
}

export default usePrivateAxios
