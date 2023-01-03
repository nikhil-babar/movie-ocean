import { useState, useEffect } from "react"

const useWindow = () => {
    const [width, setWidth] = useState(window.screen.width)
    const [height, setHeight] = useState(window.screen.height)

    useEffect(() => {
        const resize = () => {
            setWidth(window.screen.width)
            setHeight(window.screen.height)
        }

        window.addEventListener('resize', resize)

        return ()=>{
            window.removeEventListener('resize', resize)
        }
        
    }, [width, height])

    return {
        width,
        height
    }
}

export default useWindow
