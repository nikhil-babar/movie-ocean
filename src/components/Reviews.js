import { useInfiniteQuery } from "react-query";
import { getReviews } from "../api/review";

const Reviews = ({ movieId }) => {
    const { isSuccess, data, hasNextPage, fetchNextPage, isFetchingNextPage, isError, isLoading} = useInfiniteQuery(['reviews', parseInt(movieId)], ({ pageParam = 1 }) => getReviews(movieId, pageParam, 5), {
        getNextPageParam: (lastPage) => {
            return (lastPage.next) ? lastPage.next : undefined
        },

        select: (data) => {

            let reviews = []

            for (const page of data.pages) {
                for (const e of page.reviews) {
                    reviews.push(e)
                }
            }

            return {reviews}
        },
    })

    if (isSuccess) {

        return (
            <section className="pb-10">
                
                {
                    
                    data.reviews.map((review) => {
                        return <div className="review" key={review._id}>
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

                {
                    isFetchingNextPage ? <p className="text-xl text-white text-center">Loading...</p> 
                    :<button className="bg-green-500 text-lg text-white disabled:hidden" disabled={!hasNextPage} onClick={fetchNextPage}>Load More</button>
                }

            </section>
        );
    }

    if(isLoading){
        return <>
            <p className="text-white text-xl py-3 sm:py-5 text-center">
                Loading..
            </p>
        </>
    }

    if(isError){
        return <>
            <p className="text-white text-xl py-3 sm:py-5 text-center">
                No reviews available
            </p>
        </>
    }
};

export default Reviews;
