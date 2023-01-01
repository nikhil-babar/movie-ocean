import React from 'react'
import { useNavigate } from 'react-router-dom';

const Intro = () => {

    const navigate = useNavigate()

    const onClick = (e) => {
        switch (e.target.id) {
            case 'login':
                navigate('/user/login')
                break;
            case 'signup':
                navigate('/user/signup')
                break;

            default:
                break;
        }
    }

    return (
        <>
            <button className='bg-yellow-500 text-xl text-white' id='login' onClick={onClick}>Login</button>
            <button className='bg-yellow-600 text-xl text-white' id='signup' onClick={onClick}>Signup</button>
        </>
    )
}

export default Intro
