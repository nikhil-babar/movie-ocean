import React from 'react'

const Step3 = ({formData, setFormData}) => {

    const onChange = (data)=>{
        setFormData(prev => {
            return {...prev, ...data}
        })
    }

    const { bio } = formData

    return (
        <>
            <p className="text-white text-start text-lg">Something that makes you unique</p>
            <textarea className='w-full h-40 px-3 py-2 rounded-lg my-2 bg-transparent border-white border-2' placeholder='type something..' 
            onChange={(e)=>onChange({bio: e.target.value})} value = {bio}/>
        </>
    )
}

export default Step3
