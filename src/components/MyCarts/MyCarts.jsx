import { useContext, useEffect, useState } from "react";
import { cartFromLocalStorage } from "../../loaders/ProductLoader";
import Product from "../Inventory/Product";
import { Link } from "react-router-dom";
import { addOrderToDb, getOrderData } from "../../utilities/LocalStorage";
import { Toaster, toast } from "react-hot-toast";
import { OrderContext } from "../../App";

const MyCarts = () => {
    const [cartProducts, setCartProducts] = useState([]);

    const { setOrderedProduct } = useContext(OrderContext);

    useEffect(() => {
        cartFromLocalStorage()
            .then(data => {
                setCartProducts(data);
            }).catch(error => console.log(error.message));
    }, []);

    const handleOrderNowBtn = (id) => {
        const product = cartProducts.find(p => p.id === id);
        setOrderedProduct(product);

        // Displaying Toast according to existing product
        const orderIds = Object.keys(getOrderData());
        const existed = orderIds.find(orderId => orderId === id);
        if(existed) {
            toast.error("This Order is Already Added");
        } else {
            addOrderToDb(id);
            toast.success(`${product ? product.name : ''} Added to Your Order List`);
        }
    };

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
                        product={cartProduct}
                        handleOrderNowBtn={handleOrderNowBtn}></Product>)
                }
            </div>
            <Toaster />
        </div>
    );
};

export default MyCarts;