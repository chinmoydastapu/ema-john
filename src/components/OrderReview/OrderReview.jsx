import { useEffect, useState } from "react";
import { cartFromLocalStorage } from "../../loaders/ProductLoader";
import Product from "../Inventory/Product";

const OrderReview = () => {
    const [cartProducts, setCartProducts] = useState([]);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const carts = cartFromLocalStorage();
        carts.then(data => {
            setCartProducts(data);
            setShow(true);
        })
            .catch(error => console.log(error.message));
    }, []);

    return (
        <div className={`w-full px-5`}>
            <h1 className="text-orange-400 text-2xl font-semibold mt-10 mb-5 text-center">
                {
                    cartProducts.length > 0 ? 'Your Favourite List' : 'Nothing Here in Your Favourite List'
                }
            </h1>
            <div className={`mb-10 grid grid-cols-1 lg:grid-cols-2 gap-5 transition-all duration-1000 ease-in-out ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
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