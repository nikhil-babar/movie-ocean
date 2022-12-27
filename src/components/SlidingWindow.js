import React from 'react'
import Slider from 'react-slick';
import Card from './Card';

const SlidingWindow = ({ movies, title }) => {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        initialSlide: 0,
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
            <section className='my-5'>
                <div className="px-7 sm:px-7 md:px-10 lg:px-14">
                    <p className='text-white text-lg sm:text-xl md:text-2xl lg:text-3xl md:mb-2 lg:mb-10'>{title}</p>
                    <Slider {...settings} className="justify-center mt-5">
                        {
                            movies.map(value => {
                                return (<Card key={value.title} value={value} />)
                            })
                        }
                    </Slider>
                </div>
            </section>
        </>
    )
}

export default SlidingWindow
