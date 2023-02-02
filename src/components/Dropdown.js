import React from 'react'
import { useState } from 'react'

const Dropdown = ({ icon, list, setData }) => {
    const [toggle, setToggle] = useState(false)

    return (
        <>
            <div className="relative dropdown">
                <button className={`text-white mr-0 text-xl ${(toggle) ? 'arrow-up' : 'arrow-down'}`} onClick={() => { setToggle(prev => !prev) }}><i className={icon}></i></button>
                <div className={`absolute bg-templateBlue text-white right-0 rounded-lg h-56 w-64 z-10 overflow-y-scroll ${(toggle) ? 'dropdown-menu-active' : 'dropdown-menu-none'}`}>
                    <ul className='p-3'>
                    {
                        list.map((e, i)=>{
                            return <p className="mx-2 my-1 text-lg cursor-pointer hover:scale-105" key = {i} onClick = {()=>{setData(e.id); setToggle(prev => !prev)}}>
                                {e.name}
                            </p >
                        })
                    }
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Dropdown
