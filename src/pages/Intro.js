import React from 'react'
import { Link } from 'react-router-dom';
import Cinemalogo from "../assets/cinema-logo.png"

const Intro = () => {

    return (
        <>
            <div className="sm:p-5 text-gray-50 text-center w-[800px]  flex flex-col justify-between h-80">
                <h1 className='lg:text-4xl font-bold md:text-3xl text-2xl'>Welcome to <span className='text-red-600'>MOVIE-OCEAN</span></h1>
                <div>
                    <p className='mt-5 sm:p-0 p-3'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet, iste doloribus omnis placeat quidem itaque molestias officia voluptas cumque laboriosam explicabo harum esse distinctio perferendis ipsa quis eius vel deleniti. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit eligendi molestias voluptatem, atque corrupti assumenda culpa porro unde reiciendis minus veritatis repellendus maiores possimus cum. Quod aut cupiditate dolorem veniam.</p>
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
