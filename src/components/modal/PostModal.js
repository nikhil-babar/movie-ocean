import React from 'react'
import Modal from '../Modal'
import { useState } from 'react'
import { useMutation } from 'react-query'
import useMovie from '../../customHooks/useMovie'
import { addReview } from '../../api/review'
import { useQueryClient } from 'react-query'

const Temp = () => {
    const [modal, setModal] = useState(false)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const {
        id
    } = useMovie()
    const client = useQueryClient()


    const { mutateAsync, isLoading } = useMutation(addReview, {
        onSuccess: async () => {
            client.invalidateQueries(['reviews', parseInt(id)])
        },

        onError: (err) => {
            console.log(err.message)
        }
    })

    const onSubmit = async (e) => {
        e.preventDefault()

        await mutateAsync({
            movieId: id,
            title,
            content
        })

        setModal(false)
    }

    return (
        <>
            <div>
                <button onClick={() => setModal(true)} className="mr-3 text-xl"><i className="fa-solid fa-circle-plus text-yellow-500"></i></button>

                <Modal modal={modal} onClick={() => setModal(false)}>
                    <h1 className='text-yellow-500 text-3xl mx-2 my-3'>Review</h1>
                    <form className='p-3 text-gray-400' onSubmit={onSubmit}>
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" className='outline-none mb-5 text-white border-gray-400 focus:border-white' onChange={(e) => setTitle(e.target.value)} required/>
                        <label htmlFor="content" className='mb-2'>Content</label>
                        <textarea id="content" rows={8} className='rounded-lg text-white outline-none w-full h-full bg-transparent border-2 border-gray-400 p-3 focus:border-white' onChange={(e) => setContent(e.target.value)} required></textarea>
                        <button type='submit' className='bg-yellow-600 text-white my-2 disabled:hidden' disabled={isLoading}>Post Review</button>
                        {
                            isLoading ? <p className='text-center my-2'>Posting your review</p> : null
                        }
                    </form>
                </Modal>
            </div>
        </>
    )
}

export default Temp
