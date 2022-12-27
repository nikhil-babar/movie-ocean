import React from 'react'

const Navbar = () => {

  return (
    <>
      <div className="flex justify-between items-center h-fit pl-4 absolute top-0 w-full">
        <h2 className="navbar-brand z-20">
          MOVIE-REVIEW
        </h2>

        <div className="searchbar py-1 flex items-center">
          <span className='navbar-icon'><i className='fa-solid fa-bars'></i></span>
        </div>
      </div>
    </>
  )
}

export default Navbar
