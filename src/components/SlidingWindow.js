import React from 'react'
import { useRef } from 'react';
import Slider from 'react-slick';
import Card from './Card';
import { useNavigate } from 'react-router-dom';

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block"}}
            onClick={onClick}
        />
    );
}

const SlidingWindow = ({ movies, title, className }) => {

    const navigate = useNavigate()

    const onCardClick = (id) => {
        navigate(`/home/movie/${id}`)
    }

    const slider = useRef(null)

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        initialSlide: 0,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
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


    return (
        <>
            <section className={`my-5 ${className}`}>
                <div className="px-3 sm:px-5 md:px-7 ">
                    <p className='text-white text-lg md:text-xl lg:text-2xl ml-3 md:mb-2 lg:ml-10 md:ml-7 lg:mb-7'>{title}</p>
                    <Slider {...settings} ref={slider} className="justify-center mt-5">
                        {
                            movies.map(value => {
                                return (<Card key={value.title} value={value} onCardClick={onCardClick} />)
                            })
                        }
                    </Slider>
                </div>
            </section>
        </>
    )
}

export default SlidingWindow
