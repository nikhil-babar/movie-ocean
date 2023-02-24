import Navbar from "./Navbar"

const Fallback = () => {
    return (
        <>
            <Navbar />
            <div className="flex justify-center items-center h-screen">
                <i className="fa-solid fa-circle-notch animate-spin text-red-600 sm:text-5xl text-4xl"></i>
            </div>
        </>
    )
}

export default Fallback
