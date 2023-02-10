import React from 'react'
import { Link } from 'react-router-dom'
import SidebarData from './SidebarData'
import ReactDOM from 'react-dom'
import useSignOut from '../../customHooks/useSignOut'


const Sidebar = ({ state, onClick }) => {
  const { handleSignOut, isLoading } = useSignOut()

  if (!state) {
    return <div></div>
  }

  return ReactDOM.createPortal(<>
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50"></div>
    <div className='h-full fixed top-0 left-0 w-44 z-20 p-3 bg-[#1F2937]'>
      <i className="fa-solid fa-xmark absolute right-2 top-2 text-gray-300" onClick={onClick}></i>
      <div className='my-5'>
        {
          SidebarData.map((data) => {
            return <div className="flex justify-start items-center text-white my-2" key={data.title}>
              <span className='text-lg text-white hover:text-xl'><i className={data.icon}></i></span>
              <Link className="text-xl text-white mx-3 hover:text-2xl" to={`${data.path}`} onClick = {onClick}>{data.title}</Link>
            </div>
          })
        }

        <div className="flex justify-start items-center text-white my-2">
          <span className='text-lg text-white hover:text-xl'><i className='fa-solid fa-right-from-bracket'></i></span>
          <button className='text-xl text-white mx-3 hover:text-2xl disabled:opacity-50' onClick={handleSignOut} disabled={isLoading}>Signout</button>
        </div>
      </div>
    </div>
  </>, document.getElementById('sidebar'))
}

export default Sidebar
