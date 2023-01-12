
const Background = ({ img, children, className }) => {
    return (
        <>
            <div className={`section-main w-full -z-10 ${className}`} style={{
                backgroundImage: `url('${img}')`,
                backgroundRepeat: 'no-repeat',
                backgroundColor: 'rgba(0,0,0,0.7)',
                backgroundSize: 'cover',
                backgroundBlendMode: 'darken',
                boxShadow: '0px -50px 100px #0F1016 inset',
                backgroundPositionX: 'center',
            }}>
                {children}
            </div>
        </>
    )
}

export default Background
