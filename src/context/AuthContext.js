import { createContext, useState } from "react"
import { useEffect } from "react"
import Auth from "../api/firebase"
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    sendEmailVerification,
    signInWithEmailAndPassword,
    signOut as signOutFirebase,
    updateProfile,
    signInWithPopup,
    GoogleAuthProvider
} from "firebase/auth"
import { axiosPrivateClient } from "../api/axiosClient"
import Fallback from "../components/Fallback"

export const AuthContext = createContext({})

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(undefined)

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(Auth, async (user) => {
            console.log(user)

            setAuth(user)
        })

        const requestInterceptor = axiosPrivateClient.interceptors.request.use(
            async config => {
                config.headers['Authorization'] = `Bearer ${auth?.accessToken}`
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
                    if (error.response?.status === 403) {
                        setAuth(null)
                    }

                    if (error.response?.status === 500) {
                        console.log('server side error')
                    }

                    throw error

                } catch (error) {
                    return Promise.reject(error)
                }
            }
        )

        return () => {
            unsubscribeAuth()
            axiosPrivateClient.interceptors.request.eject(requestInterceptor)
            axiosPrivateClient.interceptors.response.eject(responseInterceptor)
        }

    }, [auth, setAuth])

    const signUp = async (userName, email, password) => {
        await createUserWithEmailAndPassword(Auth, email, password)

        await updateProfile(Auth.currentUser, {
            displayName: userName
        })

        await sendEmailVerification(Auth.currentUser, {
            url: 'https://movie-ocean.onrender.com'
        })
    }

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(Auth, email, password)
    }

    const signOut = () => {
        return signOutFirebase(Auth)
    }

    const googleSignIn = () => {
        return signInWithPopup(Auth, new GoogleAuthProvider())
    }

    if (auth === undefined) {
        return (
            <Fallback/>
        )
    }

    return (
        <AuthContext.Provider value={{ auth, signUp, signIn, signOut, googleSignIn }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
