import { createContext , useState} from "react"

export const authContext = createContext({})

const AuthContext = ({children}) => {
    const [auth, setAuth] = useState({})

    return (
        <authContext.Provider value={{auth, setAuth}}>
            {children}
        </authContext.Provider>
    )
}

export default AuthContext
