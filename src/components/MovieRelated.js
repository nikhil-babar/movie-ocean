import useMovie from "../customHooks/useMovie";
import SlidingWindow from "./SlidingWindow";
import Reviews from './Reviews'
import PostModal from './modal/PostModal'
import { useNavigate } from "react-router-dom";

const MovieRelated = () => {
    const {
        id,
        videos,
        related,
        title
    } = useMovie()

    const navigate = useNavigate()

    return (
        <>
            <SlidingWindow value={videos} title="Videos" type={3} className="px-2" />
            <SlidingWindow value={related} title="You may also like" type={1} className="mt-10"/>
            <section className="relative top-12">
                <div className="flex justify-between items-center">
                    <p className="text-white text-xl sm:mx-10 mx-7">Reviews on {title}</p>
                    <PostModal/>
                </div>
                <Reviews movieId={id} />
            </section>
        </>
    )
}

export default MovieRelated
