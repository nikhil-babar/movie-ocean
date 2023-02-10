import { useEffect } from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useAuth from "../customHooks/useAuth"
import Input from "./Input"

const Signup = () => {

    const { signIn, googleSignIn } = useAuth()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(null)

    useEffect(() => {
        if (isError) {
            switch (isError.code) {
                case 'auth/user-not-found':
                    alert('Please enter a valid password')
                    break

                case 'auth/wrong-password':
                    alert('Please enter a valid password');
                    break

                default:
                    alert('Invalid user information')
            }

            setIsError(null)
            setIsLoading(false)
        }
    }, [isError])

    const INPUT = [
        {
            id: 2,
            name: 'email',
            type: 'email',
            placeholder: 'Email',
            value: formData.email,
            pattern: '^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$', //eslint-disable-line
            message: 'Email should consist of lowercase letters, one symbol, and digits',
            autoComplete: 'off'
        },
        {
            id: 3,
            name: 'password',
            type: 'password',
            placeholder: 'Password',
            pattern: '(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}', //eslint-disable-line
            message: 'Password should contain minimum 8 characters, at least one letter, one number and one special character',
            value: formData.password,
            autoComplete: 'off'
        },
    ]

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            setIsLoading(true)
            await signIn(formData.email, formData.password)
            setIsLoading(false)
            navigate('/')
        } catch (err) {
            console.log(err)
            setIsError(err)
        }
    }

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn()
            navigate('/')
        } catch (err) {
            setIsError(err)
        }
    }

    return (
        <>
            <div className='text-white text-center w-80 relative bottom-10 md:w-96 backdrop-blur-sm bg-white/20 p-5 rounded-2xl'>
                <p className='text-3xl my-8'>Signin</p>
                <form onSubmit={onSubmit}>
                    {
                        INPUT.map((input) => {
                            return <Input key={input.id} inputProps={input} onChange={onChange} />
                        })
                    }
                    <button type='submit' className='bg-blue-500 font-bold mt-10 disabled:opacity-50' disabled={isLoading}>Signin</button>
                    <p className='my-2'>Don't have an account? <Link to='/signup' className="text-blue-500">sign up</Link></p>

                    <div className="inline-flex items-center justify-center w-full">
                        <hr className="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                        <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">or</span>
                    </div>
                </form>

                <button type="button" className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2" onClick={handleGoogleSignIn}>
                    <svg className="w-4 h-4 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                    Sign in with Google
                </button>
            </div>
        </>
    )
}

export default Signup
