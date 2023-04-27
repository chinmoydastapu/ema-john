import { useEffect, useState } from "react";
import { cartFromLocalStorage } from "../../loaders/ProductLoader";
import Product from "../Inventory/Product";
import { Link } from "react-router-dom";

const OrderReview = () => {
    const [cartProducts, setCartProducts] = useState([]);

    useEffect(() => {
        cartFromLocalStorage()
            .then(data => {
                setCartProducts(data);
            }).catch(error => console.log(error.message));
    }, []);

    return (
        <div className={`w-full px-5`}>
            <h1 className="text-orange-400 text-2xl font-semibold mt-10 mb-5 text-center">
                {
                    cartProducts.length > 0 ? 
                    <div>Your Favourite List <span className="text-sm">(Total {cartProducts.length} Products)</span></div> :
                    <div>
                        No Products Here,
                        Want to Add Some? <Link to='/my-shop' className="text-lg text-blue-700 underline">Click Here</Link>
                    </div>
                }
            </h1>
            <div className={`mb-10 grid grid-cols-1 lg:grid-cols-2 gap-5`}>
                {
                    cartProducts.map(cartProduct => <Product
                        key={cartProduct.id}
                        product={cartProduct}></Product>)
                }
            </div>
        </div>
    );
};

export default OrderReview;