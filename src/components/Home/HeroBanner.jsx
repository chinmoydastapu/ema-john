import { useState } from 'react';
import HeroPicture from '../../assets/heroPicture.png';
import { Link } from 'react-router-dom';

const HeroBanner = () => {
    const [hoverHeroImage, setHoverHeroImage] = useState(false);
    const [initialShow, setInitialShow] = useState(false);

    setTimeout(() => {
        setInitialShow(true);
    }, 10);

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 p-10 my-10'>
            <div className={`flex flex-col justify-center items-center md:items-start ml-10 md:ml-20 my-10 md:my-2 transition-all duration-1000 ease-in-out ${initialShow ? 'opacity-100' : 'opacity-0 -translate-x-96'}`}>
                <p className='text-orange-400 mb-10'>Sale upto 70% off</p>
                <h2 className='text-3xl lg:text-4xl font-bold font-mono'>New Collection For Fall</h2>
                <p className='text-gray-400 mb-10'>Discover all the new arrivals of ready-to-wear collection.</p>
                <Link to='/my-shop' className="btn w-fit text-white font-bold bg-orange-400 rounded-md hover:bg-orange-500">Shop Now</Link>
            </div>
            <div className={`flex justify-center transition-all duration-1000 ease-in-out ${initialShow ? 'opacity-100' : 'opacity-0 translate-x-96'}`}>
                <div className={`bg-orange-400 h-[450px] w-80 rounded-md transition-all duration-500 ease-in-out absolute ${hoverHeroImage && 'translate-x-6 -translate-y-3'}`}></div>
                <img className={`block h-[450px] w-80 z-10 translate-x-3 -translate-y-3 transition-translate duration-500 ease-in-out ${hoverHeroImage && 'translate-x-0 translate-y-0'}`} src={HeroPicture} alt="HeroImg"
                    onMouseEnter={() => setHoverHeroImage(true)}
                    onMouseLeave={() => setHoverHeroImage(false)} />
            </div>
        </div>
    );
};

export default HeroBanner;