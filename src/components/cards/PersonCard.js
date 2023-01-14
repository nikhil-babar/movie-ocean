
const IMG_URL = "http://image.tmdb.org/t/p/original";

const PersonCard = ({value}) => {
    return (
        <>
            <div className="w-64 relative right-10 sm:right-3 ">
                <img src={`${IMG_URL}${value.profile_path}`}  className='text-white h-40 w-40 object-cover rounded-full mx-auto sm:scale-100 scale-[85%]'/>
                <p className="text-white text-center mt-2 text-sm">
                    {value.name}
                </p>
            </div>
        </>
    )
}

export default PersonCard
