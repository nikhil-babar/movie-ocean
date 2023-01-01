import React from 'react'

const Step2 = ({ formData, onChange }) => {

    const { userName, password } = formData

    return (
        <>
            <input type="text" placeholder='Username' onChange={(e) => onChange({ userName: e.target.value })} value={userName} />
            <input type="text" placeholder='Password' onChange={(e) => onChange({ password: e.target.value })} value={password} />
        </>
    )
}

export default Step2
