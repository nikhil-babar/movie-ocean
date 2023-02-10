import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'
import useAuth from '../customHooks/useAuth'
import Sidebar from './Sidebar/Sidebar'
import useSignOut from '../customHooks/useSignOut'

const Navbar = () => {
  const { auth } = useAuth()
  const { handleSignOut, isLoading } = useSignOut()
  const [sidebar, setSidebar] = useState(false)

  return (
    <>
      <Sidebar state={sidebar} onClick={() => setSidebar(prev => !prev)} />
      <div className="flex justify-between items-center h-fit pl-2 absolute top-0 left-0 w-full">

        <ul className="flex justify-start items-center list-none flex-nowrap">
          {
            (!auth || !auth.emailVerified) ? null : <div className="my-2 pb-1 hover:bg-gray-400 block sm:hidden">
              <button className='text-xl text-white'><i className="fa-sharp fa-solid fa-bars cursor-pointer" onClick={() => setSidebar(prev => !prev)}></i></button>
            </div>
          }
          <li className="p-1 mx-2 pb-2">
            <h2 className="navbar-brand z-20 my-2">
              MOVIE-OCEAN
            </h2>
          </li>

          {

            (!auth || !auth.emailVerified) ? null
              :
              [
                {
                  id: 1,
                  title: 'Home',
                  link: '/'
                },
                {
                  id: 2,
                  title: 'Movies',
                  link: '/movies'
                }
              ].map(navItem => {
                return <li className="p-1 mx-2 hidden sm:block" key={navItem.id}>
                  <Link to={navItem.link} className='text-white'>{navItem.title}</Link>
                </li>
              })

          }
        </ul>

        {
          (auth === undefined) ? null : (!auth || !auth.emailVerified) ? <button type='button' className='bg-yellow-600 text-lg text-gray-300 mt-[15px] absolute top-0 right-3 h-fit p-1 px-2 rounded-sm hover:bg-yellow-700'><Link to='/login' className="hover:no-underline text-gray-50 hover:text-white">login</Link></button>
            :
            <div className="flex justify-end items-start absolute  right-0 sm:right-3 top-0">
              <SearchBar className={'my-[10px] sm:my-4 relative sm:bottom-0 bottom-1 right-3'} />
              <button type='button' className='bg-yellow-600 text-sm mt-[15px] text-white sm:block hidden rounded-none' onClick={handleSignOut} disabled={isLoading}>Logout</button>
            </div>
        }
      </div>
    </>
  )
}

export default Navbar
