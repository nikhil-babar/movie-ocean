import Home from "./pages/Home"
import { Route, Routes } from "react-router-dom"
import Index from "./pages/Index"
import Login from "./components/Login"
import Signup from "./components/signup/Signup"
import Navbar from "./components/Navbar"
import MovieDescription from "./pages/MovieDescription"
import Intro from "./pages/Intro"
import SearchBar from "./components/SearchBar"
import useAuth from "./customHooks/useAuth"
import { axiosPrivateClient, axiosClient } from "./api/axiosClient"
import { useEffect } from "react"
import Movies from "./pages/Movies"
import './App.css'

const App = () => {
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

                        return axiosPrivateClient(request)
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


    return (
        <>
            <Routes>
                <Route path="/" element={<Intro />} />
                <Route path="/home/*" element={<Navbar />}>
                    <Route index element={<Home />} />
                    <Route path="movies/:id" element={<MovieDescription />} />
                    <Route path="movies" element = {<Movies/>} />
                </Route>
                <Route path="/user/*" element={<Index />}>
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<Signup />} />
                </Route>
                <Route path="/test" element = {<SearchBar/>} />
            </Routes>
        </>
    )
}

export default App
