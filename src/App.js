import { Route, Routes } from "react-router-dom"
import { lazy, Suspense } from "react"
import Home from "./pages/Home"
import Index from "./pages/Index"
import './App.css'
import PrivateRoute from "./components/PrivateRoute"
import Fallback from "./components/Fallback"

const Intro = lazy(() => import("./pages/Intro"))
const Login = lazy(() => import("./pages/Home"))
const Signup = lazy(() => import("./components/Login"))
const MovieDescription = lazy(() => import("./pages/MovieDescription"))
const Movies = lazy(() => import("./pages/Movies"))

if (process.env.NODE_ENV === 'production') {
    console.log = () => {}
    console.error = () => {}
    console.debug = () => {}
}

const App = () => {
    return (
        <>
            <Suspense fallback = {<Fallback/>} >
                <Routes>
                    <Route path="/"
                        element={
                            <PrivateRoute />
                        }>
                        <Route index element={<Home />} />
                        <Route path="movies/:id" element={<MovieDescription />} />
                        <Route path="movies" element={<Movies />} />
                    </Route>
                    <Route path="/*" element={<Index />}>
                        <Route path="login" element={<Login />} />
                        <Route path="signup" element={<Signup />} />
                        <Route path="intro" element={<Intro />} />
                    </Route>
                </Routes>
            </Suspense>
        </>
    )
}

export default App
