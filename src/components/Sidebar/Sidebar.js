import React from 'react'
import { Link } from 'react-router-dom'
import SidebarData from './SidebarData'

const Sidebar = ({ state, toggler }) => {
  return (
    <>
      <div className={`h-screen fixed top-0 left-0 w-48 z-20 p-3 rounded-r-xl ${(state ? 'sidebar' : 'hidden')}`}>

        <button className='text-2xl text-white absolute right-0 mt-0' onClick={()=>toggler(prev => !prev)}><i className="fa-solid fa-xmark"></i></button>
        <div className="mx-auto mb-5 border-white rounded-full border-2 py-2 w-16 hover:bg-gray-400 mt-10">
          <span className='text-4xl text-white px-4'>N</span>
        </div>
        <p className='text-center text-2xl text-white border-white border-b-2 pb-5 sidebar'>Nikhil babar</p>

        <div className='my-5'>
          {
            SidebarData.map((data) => {
              return <div className="flex justify-start items-center text-white my-2" key={data.title}>
                <span className='text-lg text-white'><i className={data.icon}></i></span>
                <Link className="text-xl text-white mx-3" to={`${data.path}`} onClick = {()=>toggler(prev => !prev)}>{data.title}</Link>
              </div>
            })
          }
        </div>
      </div>
    </>
  )
}

export default Sidebar
