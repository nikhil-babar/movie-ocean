import { useContext } from "react";
import { Context } from '../context/MovieContext'

const useMovie = () => {
  return useContext(Context)
}

export default useMovie
