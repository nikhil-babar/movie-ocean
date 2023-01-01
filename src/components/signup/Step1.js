import React from 'react'


const Step1 = ({ formData, onChange }) => {

    const { name, age, gender } = formData

    return (
        <>
            <input type='text' placeholder='Name' onChange={(e) => onChange({ name: e.target.value })} value={name} />
            <input type='text' placeholder='Age' onChange={(e) => onChange({ age: e.target.value })} value={age} />
            <select onChange={(e) => onChange({ gender: e.target.value })} value={gender}>
                <option>male</option>
                <option>female</option>
                <option>other</option>
                <option>not to specify</option>
            </select>
        </>
    )
}

export default Step1
