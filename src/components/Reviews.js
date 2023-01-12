import { useFetch } from "../customHooks/useFetch";

const Reviews = ({ movieId }) => {
    const id = 505642;

    const { isSuccess, data } = useFetch({
        queryKey: ["reviews", id],
        path: `/reviews/${id}`,
        onSuccess: (data) => {
            console.log(data.reviews);
        },
        onError: (error) => {
            console.log(error);
        },
    })

    if (isSuccess) {
        return (
            <>
                {
                    data.reviews.map((review) => {
                        return <div className="review">
                            <div className="flex justify-center items-center">
                                <i className="review-icon fa-solid fa-user-astronaut"></i>
                            </div>

                            <div className="flex justify-between items-center">
                                <div className="ml-1">
                                    <div>
                                        <p className="text-md font-bold text-yellow-500">{review.user.name}</p>
                                    </div>
                                    <p className=" text-xs text-gray-400">
                                        {new Date(review.updatedAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="sm:mr-2 mr-4">
                                    <i className="fa-solid fa-thumbs-up text-green-600 text-xl mx-3"></i>
                                    <p className="inline">{review.likes}</p>
                                    <i className="fa-solid fa-thumbs-down text-red-600 text-xl mx-3"></i>
                                    <p className="inline">{review.likes}</p>
                                </div>
                            </div>

                            <div className="review-content">
                                <p className="text-lg mb-3">{review.title}</p>
                                <p className="text-sm text-gray-400">{review.content}</p>
                            </div>
                        </div>
                    })
                }
            </>
        );
    }
};

export default Reviews;
