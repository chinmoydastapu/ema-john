import { useContext, useEffect, useState } from "react";
import { orderFromLocalStorage } from "../../loaders/ProductLoader";
import Order from "./Order";
import { getQuantityData, removeFromOrderDb } from "../../utilities/LocalStorage";
import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { OrderSummaryContext } from "../../layouts/SideNav";
import { ProductsContext } from "../../App";

const MyOrders = () => {
    const [orderedProducts, setOrderedProducts] = useState([]);

    const { products } = useContext(ProductsContext);
    const {
        removeOrder,
        setRemoveOrder,
        totalSelectedItems,
        setTotalSelectedItems,
        setTotalPrice,
        setTotalShippingCharge,
        setTotalTax,
        setGrandTotal,
    } = useContext(OrderSummaryContext);

    useEffect(() => {
        orderFromLocalStorage()
            .then(orders => setOrderedProducts(orders));

        if (removeOrder) {
            setOrderedProducts([]);
            setRemoveOrder(false);
        }
    }, [removeOrder, setRemoveOrder]);

    const handleTrashBtn = id => {
        removeFromOrderDb(id);

        // For removing single order cart and update the Order Summary data
        // const trashedProduct = orderedProducts.find(orderedProduct => orderedProduct.id === id);

        // Selected Items Updated
        setTotalSelectedItems(totalSelectedItems - 1);

        // Traversing through all products for updating Order Summary data
        const savedOrders = getQuantityData();
        let price = 0;
        let shippingCharge = 0;
        for (const orderId in savedOrders) {
            const previousAddedProduct = products.find(product => product.id === orderId);
            if (previousAddedProduct) {
                const quantity = savedOrders[orderId];
                previousAddedProduct.quantity = quantity;

                // Calculating total price
                price += previousAddedProduct.price * quantity;

                // Calculating total shipping charge
                shippingCharge += previousAddedProduct.shipping * quantity;
            }
        }
        // Updating Tax
        const tax = parseFloat((price * 0.05).toFixed(2));
        // Updating all values
        setTotalPrice(price);
        setTotalShippingCharge(shippingCharge);
        setTotalTax(tax);
        setGrandTotal(price + shippingCharge + tax);

        // Remaining products for showing remaining items in the UI
        const remainingProducts = orderedProducts.filter(orderedProduct => orderedProduct.id !== id);
        setOrderedProducts(remainingProducts);

        toast.success("Successfully Removed Order!");
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
                    handleTrashBtn={handleTrashBtn}></Order>)
            }
            <Toaster />
        </div>
    );
};

export default MyOrders;