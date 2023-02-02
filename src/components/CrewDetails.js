import React from 'react'
import useMovie from '../customHooks/useMovie'
import SlidingWindow from './SlidingWindow'

const CrewDetails = () => {
    const {
        crew,
        revenue,
        budget,
        release_date,
        production_companies,
        production_countries,
        genres,
    } = useMovie()

    return (
        <>
            <div className="flex justify-between w-full gap-10">
                <SlidingWindow value={crew.cast} key="top cast" className={'md:mt-10 sm:mt-7 h-72 sm:h-80 md:h-96 lg:w-3/4 w-full'} title={'Top Cast'} type={2} />

                <div className="w-56 h-64 relative top-12 lg:block hidden">
                    {
                        [
                            {
                                title: "Revenue",
                                value: (revenue === 0) ? 'Unknown' : revenue.toLocaleString('en-IN', {
                                    style: 'currency',
                                    currency: 'INR'
                                }),
                            },
                            {
                                title: "Budget",
                                value: (budget === 0) ? 'Unknown' : budget.toLocaleString('en-IN', {
                                    style: 'currency',
                                    currency: 'INR'
                                }),
                            },
                            {
                                title: "Release date",
                                value: release_date,
                            },
                            {
                                title: 'Production',
                                value: production_companies.map((e) => e.name).filter((_e, i) => i < 2).join(', ')
                            },
                            {
                                title: 'Genre',
                                value: genres.map((e) => e.name).filter((_e, i) => i < 2).join(', ')
                            },
                            {
                                title: 'Countries',
                                value: production_countries.map((e) => e.name).filter((_e, i) => i < 2).join(', ')
                            },
                        ].map((e) => {
                            return <p className="mb-2 p-1 text-sm" key={e.title}><span className="text-yellow-500 font-bold">{e.title}</span>: <span className="text-gray-300">{e.value}</span></p>
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default CrewDetails
