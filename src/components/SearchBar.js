import React from 'react'
import { useState } from 'react'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useQueryClient } from 'react-query'
import { getMoviesByQuery } from '../api/movies'

const SearchBar = ({ className }) => {
  const [tempTerm, setTempTerm] = useState('')
  const [term, setTerm] = useState(false)
  const flag = useRef(false)
  const navigate = useNavigate()
  const client = useQueryClient()

  const { data: searchResults, isSuccess } = useQuery(['movies', 'search', term], () => getMoviesByQuery(term), {
    enabled: flag.current,
    placeholderData: {
      results: [
        { title: 'No results' }
      ]
    }
  })

  useEffect(() => {
    client.setQueryData(['movies', 'search', ''], { results: [{title: 'No result'}]})
  }, [])

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
        <div className="search-bar float-right absolute top-0 glass">
          <input type="text" name="term" id="term" placeholder='Search' onChange={onChange} className="search-bar-input" />
          <button className='search-bar-button mx-auto'><i className="fa-solid fa-magnifying-glass text-white"></i></button>
        </div>
        <div className="search-bar-content glass">
          {
            (isSuccess) ? searchResults.results.map((movie) => {
              return <p className="p-3 text-gray-300 hover:text-white" onMouseDown={() => navigate(`/home/movies/${movie.id}`)}>{movie.title}</p>
            })
              : <p className="p-3">No results</p>
          }
        </div>
      </div>
    </>
  )
}


export default SearchBar
