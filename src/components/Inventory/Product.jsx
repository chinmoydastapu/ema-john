/* eslint-disable react/prop-types */
import { HeartIcon, StarIcon, UserGroupIcon } from '@heroicons/react/24/solid';
import { useContext, useEffect, useState } from 'react';
import { CartContext, ThemeContext } from '../../App';
import { addCartToDb, getCartData, removeFromCartDb } from '../../utilities/LocalStorage';

const Product = ({ product }) => {
    const { id, name, category, img, price, seller, ratings, ratingsCount, stock } = product;

    const [triggerHeartIcon, setTriggerHeartIcon] = useState(false);
    const [showAnimation, setShowAnimation] = useState(false);

    const [toggleTheme] = useContext(ThemeContext);
    const { setTotalCarts } = useContext(CartContext);

    const handleHeartBtn = () => {
        setTriggerHeartIcon(!triggerHeartIcon);
        if (triggerHeartIcon) {
            removeFromCartDb(id);
        } else {
            addCartToDb(id);
        }
        const totalCartIds = Object.keys(getCartData());
        setTotalCarts(totalCartIds);
    };

    useEffect(() => {
        // heart icon turns red when navigated in order-review route
        const inPages = window.location.pathname.split('/');
        const inOrderReviewPage = inPages.find(inPage => inPage === 'order-review');
        if (inOrderReviewPage === 'order-review') {
            setTriggerHeartIcon(true);
        }

        const cartIds = Object.keys(getCartData());
        if (cartIds.find(cartId => cartId === id)) {
            setTriggerHeartIcon(true);
        }
    }, [id]);

    setTimeout(() => {
        setShowAnimation(true);
    }, 10);

    return (
        <div className={`card md:card-side shadow-xl ${!toggleTheme ? 'bg-slate-800' : 'bg-white'} transition-all duration-1000 ease-in-out ${showAnimation ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
            <figure><img src={img ? img : 'https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg'} alt="Error-Image" className='w-full md:w-80 h-full overflow-hidden transition-scale duration-500 ease-in-out hover:scale-110' /></figure>
            <div className="card-body lg:w-96">
                <div className='card-actions justify-end'>
                    <span className={`tooltip tooltip-left ${triggerHeartIcon && 'tooltip-warning'}`}
                        data-tip={triggerHeartIcon ? 'Click to remove from favourite list' : 'Click to add on favourite list'}
                        onClick={handleHeartBtn}>
                        <HeartIcon className={`h-6 w-6 transition-all duration-300 ease-in-out ${triggerHeartIcon && 'text-red-500 scale-110'}`} />
                    </span>
                </div>
                <h2 className="card-title capitalize">
                    {name}
                </h2>
                <div className="flex justify-start gap-3 text-2xl text-orange-400 mt-3">
                    <div><span className="font-bold">Price:</span> {price}</div>
                    <div className="badge badge-secondary">{stock} in stock</div>
                </div>
                <div className="card-actions justify-end mt-2">
                    <div className="badge badge-outline">{category}</div>
                    <div className="badge badge-outline">{seller}</div>
                </div>
                <div className="card-actions justify-around mt-2">
                    <div className="flex items-center gap-1">
                        <div><span className='font-bold'>Ratings: </span> {ratings}</div>
                        <StarIcon className='h-5 w-5 text-orange-400' />
                    </div>
                    <div className="flex items-center gap-1">
                        <UserGroupIcon className='h-5 w-5 text-orange-400' />
                        <div><span className='font-bold'>Reviews: </span>{ratingsCount}</div>
                    </div>
                </div>
                <div className='card-actions justify-end mt-3'>
                    <button className="btn bg-orange-400 hover:bg-orange-500 text-white font-bold">Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default Product;