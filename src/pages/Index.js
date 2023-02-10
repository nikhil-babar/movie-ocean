import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Backdrop from '../assets/backdrop.jpg'


const index = () => {
  return (
    <>
        <Navbar />
        <div className="flex h-screen justify-center items-center gap-12 min-h-[800px]" style={{
          background: `url('${Backdrop}')`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundColor: 'rgb(0,0,0,0.7)',
          backgroundBlendMode: 'darken'
        }}>
          <Outlet/>
        </div>
    </>
  )
}

export default index
