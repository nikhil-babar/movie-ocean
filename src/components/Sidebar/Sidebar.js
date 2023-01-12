import React from 'react'
import { Link } from 'react-router-dom'
import SidebarData from './SidebarData'

const Sidebar = ({ state, toggler }) => {
  return (
    <>
      <div className={`h-full fixed top-0 left-0 w-44 z-20 p-3 ${(state ? 'sidebar' : 'hidden')}`}>

        <button className='text-2xl text-white absolute right-0 mt-0' onClick={()=>toggler(prev => !prev)}><i className="fa-solid fa-xmark"></i></button>

        <div className='my-5'>
          {
            SidebarData.map((data) => {
              return <div className="flex justify-start items-center text-white my-2" key={data.title}>
                <span className='text-lg text-white hover:text-xl'><i className={data.icon}></i></span>
                <Link className="text-xl text-white mx-3 hover:text-2xl" to={`${data.path}`} onClick = {()=>toggler(prev => !prev)}>{data.title}</Link>
              </div>
            })
          }
        </div>
      </div>
    </>
  )
}

export default Sidebar
