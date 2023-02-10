import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import useAuth from "../customHooks/useAuth"
import Input from "./Input"

const Signup = () => {

    const { signUp  } = useAuth()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(null)
    const [isSuccess, setIsSuccess] = useState(false)

    useEffect(() => {
        if (isError) {
            switch (isError.code) {
                case 'auth/email-already-in-use':
                    alert('Email already registered, please login')
                    break;

                default:
                    alert("Signup unsuccessfull")
                    break;
            }
            setIsError(null)
        }
    }, [isError])

    const INPUT = [
        {
            id: 1,
            name: 'name',
            type: 'text',
            placeholder: 'Username',
            required: true,
            pattern: '^[A-Za-z][A-Za-z0-9_]{3,29}$',
            message: 'Username should only contain alphanumeric characters and alteast one alphabet and atleast 4 characters',
            value: formData.name
        },
        {
            id: 2,
            name: 'email',
            type: 'email',
            placeholder: 'Email',
            required: true,
            value: formData.email,
            pattern: '^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$',
            message: 'Email should consist of lowercase letters, one symbol, and digits'
        },
        {
            id: 3,
            name: 'password',
            type: 'password',
            placeholder: 'Password',
            required: true,
            pattern: '(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}',
            message: 'Password should contain minimum 8 characters, at least one letter, one number and one special character',
            value: formData.password,
        },
        {
            id: 4,
            name: 'confirmPassword',
            type: 'password',
            placeholder: 'Confirm password',
            required: true,
            pattern: formData.password,
            value: formData.confirmPassword,
            message: 'Input should match with password'
        },
    ]

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        try {
            e.preventDefault()
            setIsLoading(true)
            await signUp(formData.name,formData.email, formData.password)
            setIsLoading(false)
            setIsSuccess(true)
        } catch (error) {
            console.log(error)
            setIsLoading(false)
            setIsError(error)
        }
    }

    return (
        <>
            <div className='text-white text-center w-80 relative bottom-10 md:w-96 backdrop-blur-sm bg-white/20 p-5 rounded-2xl'>
                <p className='text-3xl my-8'>Signup</p>
                <form onSubmit={onSubmit}>
                    {
                        INPUT.map((input) => {
                            return <Input key={input.id} inputProps={input} onChange={onChange} />
                        })
                    }
                    <button type='submit' className='bg-blue-500 font-bold mt-10 disabled:hidden' disabled={isLoading}>Signup</button>
                    <span hidden={!isLoading} className="text-xl mt-10">Signing up..</span>
                    <span hidden={!isSuccess} className="text-lg mt-5 text-green-600">A verification mail has been send to you</span>
                </form>
            </div>
        </>
    )
}

export default Signup
