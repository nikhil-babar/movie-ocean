import { useState, useEffect } from 'react'
import useAuth from './useAuth'
import { useNavigate } from 'react-router-dom'

const useSignOut = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(null)
    const { signOut } = useAuth()
    const navigate = useNavigate()
    
  
    useEffect(() => {
      if (isError) {
        switch (isError.code) {
          case 'auth/wrong-password': {
            alert('Please enter a valid password')
            break
          }
  
          default: {
            alert('Invalid user information')
          }
        }
  
        setIsError(null)
        setIsLoading(false)
      }
    }, [isError])
  
    const handleSignOut = async () => {
      try {
        setIsLoading(true)
        await signOut()
        setIsLoading(false)
        navigate('/')
      } catch (err) {
        console.log(err)
        setIsError(err)
      }
    }

    return {
        handleSignOut,
        isLoading,
        isError
    }
}

export default useSignOut
