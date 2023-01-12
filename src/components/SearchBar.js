import React from 'react'
import { useState } from 'react'
import { useFetch } from '../customHooks/useFetch'
import { useEffect, useRef } from 'react'

const SearchBar = () => {
  const [tempTerm, setTempTerm] = useState('')
  const [term, setTerm] = useState(false)
  const flag = useRef(false)

  const { data: searchResults, isSuccess } = useFetch({
    path: '/movies/search',
    queryKey: ['search', term],
    searchParams: {
      term
    },
    onSuccess: (searchResults) => {
      console.log(searchResults)
    },
    onError: (err) => {
      console.log(err.message)
    },
    enabled: flag.current,
    placeholderData: {
      results: [
        { title: 'No results' }
      ]
    }
  })

  useEffect(() => {
    return () => {
      flag.current = false
    }
  }, [term])

  useEffect(() => {
    const timeout = setTimeout(() => {
      flag.current = true
      setTerm(tempTerm)
    }, 400)

    return () => {
      clearTimeout(timeout)
    }
  }, [tempTerm])


  const onChange = (e) => {
    setTempTerm(e.target.value)
  }

  return (
    <>
      <div className="flex justify-center items center text-white ">
        <div className="w-3/4 h-screen p-5">
          <input type="text" name="term" id="term" placeholder='Search' onChange={onChange} className = "border-2 rounded-lg" />
          <div className="mt-5 p-5 border-white border-2 max-h-96 text-white overflow-y-scroll">
            {
              (isSuccess) ? searchResults.results.map((movie) => {
                    return <p className="p-3 text-white">{movie.title}</p>
                  })
                  : <p className="p-3 text-white">No results</p>
            }
          </div>
        </div>
      </div>
    </>
  )
}


export default SearchBar
