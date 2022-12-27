import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiPath } from '../customHooks/useFetch'

const Login = () => {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const onSubmit = () => {
        const url = new URL(`${apiPath}/user`)
        url.searchParams.set('userName', userName)
        url.searchParams.set('password', password)

        fetch(url.href)
            .then(response => {
                switch (response.status) {
                    case 201:
                        return response.json()

                    case 404:
                        throw new Error('user not available')

                    default:
                        break;
                }
            })
            .then(data => navigate('/home', { state: {...data} }))
            .catch(() => { alert('please enter a valid username and password') })
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
                <input type="text" placeholder='Username' id='userName' onChange={onChange} />
                <input type="password" placeholder='Password' id='password' onChange={onChange} />
                <p className='text-end my-3 mb-8'><a href="/">Forgot Password?</a></p>
                <button type='submit' className='bg-blue-500 font-bold' onClick={onSubmit}>LOGIN</button>
                <p className='my-2'>Don't have an account? <a href='/'>sign in</a></p>
            </div>
        </>
    )
}

export default Login
