import React from 'react'
import { useState } from 'react'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useQueryClient } from 'react-query'
import { getMoviesByQuery } from '../api/movies'

const SearchBar = ({ className }) => {
  const [tempTerm, setTempTerm] = useState('')
  const [term, setTerm] = useState('')
  const flag = useRef(false)
  const navigate = useNavigate()
  const client = useQueryClient()

  const { data: searchResults, isSuccess, isLoading } = useQuery(['movies', 'search', term], () => getMoviesByQuery(term), {
    enabled: flag.current && term.length !== 0,
    placeholderData: [
      {
        id: 1,
        title: 'Loading..'
      }
    ],
    onSuccess: (data) => {
      console.log(data)
    }
  })

  useEffect(() => {
    client.setQueryData(['movies', 'search', ''], [{ id: 0, title: 'No result' }])
  }, [client])

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
      <div className={`w-80 h-80 ${className}`}>
        <div className="search-bar float-right absolute top-0">
          <input type="text" name="term" id="term" placeholder='Search' onChange={onChange} className="search-bar-input" required autoComplete='off' />
          <button className='search-bar-button mx-auto'><i className="fa-solid fa-magnifying-glass text-white"></i></button>
        </div>
        <div className="search-bar-content">
          {
            (isSuccess) ? searchResults.map((movie) => {
              return <p className="p-3 text-gray-300 hover:text-white" key={movie.id} onMouseDown={() => navigate(`/home/movies/${movie.id}`)}>{movie.title}</p>
            })
              : (isLoading) ? <p className="p-3 text-gray-300">Loading..</p>
                : <p className="p-3 text-gray-300">No results</p>
          }
        </div>
      </div>
    </>
  )
}


export default SearchBar
