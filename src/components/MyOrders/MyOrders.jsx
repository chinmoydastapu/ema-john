import { useEffect, useState } from "react";
import { orderFromLocalStorage } from "../../loaders/ProductLoader";
import Order from "./Order";

const MyOrders = () => {
    const [orderedProducts, setOrderedProducts] = useState([]);

    useEffect(() => {
        orderFromLocalStorage()
            .then(orders => setOrderedProducts(orders));
    }, []);

    return (
        <div className="w-3/4 mx-auto lg:mx-20 text-center">
            <h2 className="text-orange-400 text-2xl font-semibold mt-10 mb-5 text-center">Your Orders List</h2>
            {
                orderedProducts?.map(orderedProduct => <Order
                    key={orderedProduct.id}
                    orderedProduct={orderedProduct}></Order>)
            }
        </div>
    );
};

export default MyOrders;