import { useEffect, useState } from "react";
import { orderFromLocalStorage } from "../../loaders/ProductLoader";
import Order from "./Order";
import { removeFromOrderDb } from "../../utilities/LocalStorage";
import { Link } from "react-router-dom";

const MyOrders = () => {
    const [orderedProducts, setOrderedProducts] = useState([]);

    useEffect(() => {
        orderFromLocalStorage()
            .then(orders => setOrderedProducts(orders));
    }, []);

    const handleRemoveOrderedProduct = id => {
        removeFromOrderDb(id);

        const remainingProducts = orderedProducts.filter(orderedProduct => orderedProduct.id !== id);
        setOrderedProducts(remainingProducts);
    };

    return (
        <div className="w-full lg:w-3/5 mx-auto lg:mx-20 text-center">
            <div className="text-orange-400 text-2xl font-semibold mt-10 mb-5 text-center">
                {
                    orderedProducts?.length > 0 ? <h2>Your Orders List <span className="text-sm">(Total {orderedProducts.length} Products)</span></h2> :
                        <p>No Orders Yet, <Link to='/my-shop' className="text-blue-400 underline">Click Here</Link> to Add Orders</p>
                }
            </div>
            {
                orderedProducts?.map(orderedProduct => <Order
                    key={orderedProduct.id}
                    orderedProduct={orderedProduct}
                    handleRemoveOrderedProduct={handleRemoveOrderedProduct}></Order>)
            }
        </div>
    );
};

export default MyOrders;