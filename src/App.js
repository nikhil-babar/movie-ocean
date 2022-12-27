import Home from "./pages/Home"
import { Route, Routes } from "react-router-dom"
import Index from "./pages/Index"
import Login from "./components/Login"
import Signup from "./components/signup/Signup"

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/*" element={<Index />}>
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<Signup />} />
                </Route>
            </Routes>
        </>
    )
}

export default App
