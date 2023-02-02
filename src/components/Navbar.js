import React from 'react'
import { useState } from 'react'
import { Link, useOutlet } from 'react-router-dom'
import SearchBar from './SearchBar'

const Navbar = () => {

  const outlet = useOutlet()
  const [state, toggler] = useState()

  return (
    <>
      <div className="flex justify-between items-center h-fit pl-2 absolute top-0 left-0 w-full">

        <ul className="flex justify-start items-center list-none flex-nowrap">
          <div className="my-2 pb-1 hover:bg-gray-400 block sm:hidden">
            <button className='text-lg text-white' onClick={() => toggler(prev => !prev)}><i className="fa-sharp fa-solid fa-bars"></i></button>
          </div>
          <li className="p-1 mx-2 pb-2">
            <h2 className="navbar-brand z-20 my-2">
              MOVIE-REVIEW
            </h2>
          </li>

          <li className="p-1 mx-2 hidden sm:block">
            <Link to="/home" className='text-white'>Home</Link>
          </li>
          <li className="p-1 mx-2 hidden sm:block">
            <Link to="/home/movies" className='text-white'>Movies</Link>
          </li>

        </ul>

        <SearchBar className={'absolute right-0 my-[10px] sm:my-4 top-0 mx-3'} />
      </div>


      {outlet}

    </>
  )
}

export default Navbar
