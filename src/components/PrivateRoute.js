import Navbar from "./Navbar"
import { Navigate, Outlet } from "react-router-dom"
import useAuth from "../customHooks/useAuth"

const PrivateRoute = () => {
    const { auth } = useAuth()

    return (
        <>
            <Navbar />
            {
                (auth && auth.emailVerified) ?
                    <Outlet />
                    :
                    <Navigate to={'/intro'} />
            }
        </>
    )
}

export default PrivateRoute
