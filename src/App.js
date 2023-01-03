import Home from "./pages/Home"
import { Route, Routes } from "react-router-dom"
import Index from "./pages/Index"
import Login from "./components/Login"
import Signup from "./components/signup/Signup"
import Navbar from "./components/Navbar"
import MovieDescription from "./pages/MovieDescription"
import Intro from "./pages/Intro"
import Movies from "./pages/Movies"

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Intro />} />
                <Route path="/home/*" element={<Navbar />}>
                    <Route path="test" element={<Movies />} />
                    <Route index element={<Home />} />
                    <Route path="movie/:id" element={<MovieDescription />} />
                </Route>
                <Route path="/user/*" element={<Index />}>
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<Signup />} />
                </Route>
            </Routes>
        </>
    )
}

export default App
