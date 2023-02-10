import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'
import useAuth from '../customHooks/useAuth'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { signOut, auth } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      switch (isError.code) {
        case 'auth/wrong-password': {
          alert('Please enter a valid password')
          break
        }

        default: {
          alert('Invalid user information')
        }
      }

      setIsError(null)
      setIsLoading(false)
    }
  }, [isError])


  const handleSignOut = async () => {
    try {
      setIsLoading(true)
      await signOut()
      setIsLoading(false)
      navigate('/')
    } catch (err) {
      console.log(err)
      setIsError(err)
    }
  }

  return (
    <>
      <div className="flex justify-between items-center h-fit pl-2 absolute top-0 left-0 w-full">

        <ul className="flex justify-start items-center list-none flex-nowrap">
          <div className="my-2 pb-1 hover:bg-gray-400 block sm:hidden">
            <button className='text-lg text-white' ><i className="fa-sharp fa-solid fa-bars"></i></button>
          </div>
          <li className="p-1 mx-2 pb-2">
            <h2 className="navbar-brand z-20 my-2">
              MOVIE-OCEAN
            </h2>
          </li>

          {

            (!auth || !auth.emailVerified)? null
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
          (auth === undefined) ? null : (!auth || !auth.emailVerified) ? <button type='button' className='bg-yellow-600 text-lg text-gray-300 mt-[15px] absolute top-0 right-3 h-fit p-1 px-2 rounded-sm hover:bg-yellow-700'><Link to = '/login' className="hover:no-underline text-gray-50 hover:text-white">login</Link></button>
            :
            <div className="flex justify-end items-start absolute right-3 top-0">
              <SearchBar className={'my-[10px] sm:my-4 mx-3'} />
              <button type='button' className='bg-yellow-600 text-sm mt-[15px] text-white sm:block hidden rounded-none' onClick={handleSignOut} disabled={isLoading}>Logout</button>
            </div>
        }
      </div>
    </>
  )
}

export default Navbar
