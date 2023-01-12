import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axiosClient } from '../api/axiosClient'
import useAuth from '../customHooks/useAuth'

const Login = () => {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const { setAuth } = useAuth()
    const navigate = useNavigate()

    const onSubmit = (e) => {
        e.preventDefault()
        axiosClient.post('/user/login', { userName, password })
            .then((response) => {
                setAuth({ ...response.data})

                navigate('/home')
            }).catch((err) => {
                switch (err.response?.status) {
                    case 404:
                        alert('please enter a valid username and password')
                        break;

                    default:
                        break;
                }
            })
    }

    const onChange = (e) => {
        switch (e.target.id) {
            case 'userName':
                setUserName(e.target.value)
                break
            case 'password':
                setPassword(e.target.value)
                break
            default:
                return
        }
    }

    return (
        <>
            <div className='text-white text-center w-2/3 mx-auto h-fit mt-36 max-w-sm px-3 sm:px-5'>
                <p className='text-3xl my-8'>Login</p>
                <form  onSubmit = {onSubmit}>
                    <input type="text" placeholder='Username' id='userName' onChange={onChange} />
                    <input type="password" placeholder='Password' id='password' onChange={onChange} />
                    <p className='text-end my-3 mb-8'><a href="/">Forgot Password?</a></p>
                    <button type='submit' className='bg-blue-500 font-bold' >LOGIN</button>
                    <p className='my-2'>Don't have an account? <a href='/'>sign in</a></p>
                </form>
            </div>
        </>
    )
}

export default Login
