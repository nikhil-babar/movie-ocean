import { useState } from "react"

const Input = ({ inputProps, onChange }) => {
    const [render, setRender] = useState(false)

    return (
        <>
            <input
                {...inputProps}
                onChange={onChange}
                onBlur={() => {setRender(true)}}
            />

            <span className="text-red-600 text-sm"  leave = {render.toString()}>{inputProps.message}</span>
        </>
    )
}

export default Input
