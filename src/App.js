import Home from "./pages/Home"
import { Route, Routes } from "react-router-dom"
import Index from "./pages/Index"
import Login from "./components/Login"
import Signup from "./components/Signup"
import MovieDescription from "./pages/MovieDescription"
import Intro from "./pages/Intro"
import Movies from "./pages/Movies"
import './App.css'
import Temp from "./components/modal/PostModal"
import PrivateRoute from "./components/PrivateRoute"

const App = () => {
    return (
        <>
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
                    <Route path="intro" element = {<Intro/>}/>
                </Route>
                <Route path="/test" element={<Temp />} />
            </Routes>
        </>
    )
}

export default App
