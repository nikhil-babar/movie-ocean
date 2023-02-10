import ReactDOM from 'react-dom'

const Modal = ({ children, modal, onClick }) => {

    if (!modal) {
        return <div></div>
    }

    return ReactDOM.createPortal(
        <>
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50"></div>
            <div className="rounded-lg fixed text-white bg-templateBlue top-0 left-0 right-0 bottom-0 m-auto w-full max-w-[384px] h-fit sm:scale-100 scale-[0.85] p-3">
                <button onClick={onClick} className="absolute right-0 top-0 m-2"><i className="fa-solid fa-xmark text-red-600"></i></button>
                {
                    children
                }
            </div>
        </>,
        document.getElementById('modal')
    )

}

export default Modal
