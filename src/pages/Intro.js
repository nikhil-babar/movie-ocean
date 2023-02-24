import { axiosClient as axios } from '../api/axiosClient';
import { useEffect } from 'react'
import { Link } from 'react-router-dom';
import Cinemalogo from "../assets/cinema-logo.png"

const Intro = () => {

    useEffect(() => {
        axios.get('/').catch(() => {})
    }, [])

    return (
        <>
            <div className="sm:p-5 text-gray-50 text-center w-[800px] flex flex-col justify-between h-80 relative bottom-24 sm:bottom-0">
                <h1 className='lg:text-4xl font-bold md:text-3xl text-2xl'>Welcome to <span className='text-red-600'>MOVIE-OCEAN</span></h1>
                <div>
                    <p className='mt-5 sm:p-0 p-2'>Welcome to Movie-Ocean, your ultimate destination for all things movies! Our mission is to provide movie enthusiasts with the latest information on the biggest blockbusters, indie gems, and everything in between. We believe that movies have the power to entertain, inspire, and bring people together, and we strive to create a community where everyone can share their love for the big screen. Whether you're looking for reviews, recommendations, or just want to stay up-to-date on the latest film news, you've come to the right place. So sit back, relax, and let the magic of movies wash over you!</p>
                    <button className='bg-red-600 text-white text-2xl mt-5 hover:bg-red-700'><Link to = '/signup' className="hover:no-underline text-gray-50 hover:text-white">Get started</Link></button>
                </div>
            </div>
            <div className="p-5 relative bottom-10 md:block hidden opacity-60">
                <img src={Cinemalogo} alt="cinema-logo" className='w-96' />
            </div>
        </>
    )
}

export default Intro
