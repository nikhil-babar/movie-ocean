import React from 'react'
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import MovieCard from './cards/MovieCard';
import PersonCard from './cards/PersonCard'
import YoutubePlayer from './YoutubePlayer';


function Arrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "none" }}
            onClick={onClick}
        />
    );
}

const SlidingWindow = ({ value, title, className, type,  }) => {

    const slider = useRef(null)

    const navigate = useNavigate()

    if(value?.length === 0){
        return <div></div>
    }

    const settings = () => {
        switch (type) {
            case 1:
                return {
                    dots: false,
                    infinite: false,
                    speed: 500,
                    slidesToShow: 5,
                    slidesToScroll: 5,
                    initialSlide: 0,
                    nextArrow: <Arrow />,
                    prevArrow: <Arrow />,
                    responsive: [
                        {
                            breakpoint: 1400,
                            settings: {
                                slidesToShow: 4,
                                slidesToScroll: 4
                            }
                        },
                        {
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 3
                            }
                        },
                        {
                            breakpoint: 650,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 3,
                            }
                        },
                        {
                            breakpoint: 480,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2
                            }
                        }
                    ]
                };

            case 2:
                return {
                    dots: false,
                    infinite: false,
                    speed: 500,
                    slidesToShow: 5,
                    slidesToScroll: 5,
                    initialSlide: 0,
                    nextArrow: <Arrow />,
                    prevArrow: <Arrow />,
                    responsive: [
                        {
                            breakpoint: 1400,
                            settings: {
                                slidesToShow: 4,
                                slidesToScroll: 4
                            }
                        },
                        {
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: 4,
                                slidesToScroll: 4
                            }
                        },
                        {
                            breakpoint: 800,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 3
                            }
                        },
                        {
                            breakpoint: 650,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 3,
                            }
                        },
                        {
                            breakpoint: 480,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2
                            }
                        }
                    ]
                };

            case 3:
                return {
                    dots: false,
                    infinite: false,
                    speed: 500,
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    initialSlide: 0,
                    nextArrow: <Arrow />,
                    prevArrow: <Arrow />,
                    responsive: [
                        {
                            breakpoint: 1400,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 3
                            }
                        },
                        {
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2
                            }
                        },
                        {
                            breakpoint: 800,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2
                            }
                        },
                        {
                            breakpoint: 650,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                            }
                        },
                        {
                            breakpoint: 480,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }
                    ]
                };

            default:
                return {}
        }
    }


    return (
        <>
            <div className={`${className}`}>
                <div className="flex justify-between items-center  lg:pr-[3%] md:pr-[7%] sm:pr-[5%] xs:pr-5 pr-[8%]">
                    <p className = {`text-white text-lg md:text-xl w-full sm:w-1/3 lg:pl-[3%] md:pl-[7%] sm:pl-[5%] xs:pl-5 pl-[8%] my-3 ${(type === 2) ? 'md:ml-5' : ''}`}>{title}</p>
                    <div className={`w-fit flex sm:block ${(type === 3) ? 'block' : 'hidden'}`}>
                        <i className="fa-solid fa-arrow-left-long text-gray-600 md:text-2xl text-xl hover:text-white mr-2" onClick={() => slider?.current?.slickPrev()}></i>
                        <i className="fa-solid fa-arrow-right-long text-gray-600 md:text-2xl text-xl hover:text-white ml-2" onClick={() => slider?.current?.slickNext()}></i>
                    </div>
                </div>
                <Slider {...settings()} ref={slider} className="justify-center lg:mt-10 md:mt-7 sm:mt-5 mt-3">
                    {
                        {
                            1: value.map(movie => <MovieCard key={movie.id} value={movie} onCardClick={(id) => navigate(`/movies/${id}`)} />),
                            2: value.map(person => <PersonCard key={person.id} value={person} />),
                            3: value.filter(video => video.site !== 'Youtube').map(video => <YoutubePlayer key={video.id} value={video} />)
                        }[type]
                    }
                </Slider>
            </div>
        </>
    )
}

export default SlidingWindow
