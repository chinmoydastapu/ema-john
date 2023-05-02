import { useContext, useEffect, useState } from "react";
import { orderFromLocalStorage } from "../../loaders/ProductLoader";
import Order from "./Order";
import { removeFromOrderDb } from "../../utilities/LocalStorage";
import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { OrderSummaryContext } from "../../layouts/SideNav";

const MyOrders = () => {
    const [orderedProducts, setOrderedProducts] = useState([]);

    const {
        removeOrder,
        setRemoveOrder,
        totalSelectedItems,
        setTotalSelectedItems,
        totalPrice,
        setTotalPrice,
        totalShippingCharge,
        setTotalShippingCharge,
        totalTax,
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
        const trashedProduct = orderedProducts.find(orderedProduct => orderedProduct.id === id);

        // Selected Items Updated
        setTotalSelectedItems(totalSelectedItems - 1);

        // Price updated
        const priceAfterRemovingSingleOrder = totalPrice - trashedProduct.price;
        setTotalPrice(priceAfterRemovingSingleOrder);

        // Shipping Charge updated
        const shippingChargeAfterRemovingSingleOrder = totalShippingCharge - trashedProduct.shipping;
        setTotalShippingCharge(shippingChargeAfterRemovingSingleOrder);

        // Tax updated
        const taxAfterRemovingSingleOrder = parseFloat((totalTax - (trashedProduct.price * 0.05)).toFixed(2));
        setTotalTax(taxAfterRemovingSingleOrder);

        // Grand Total Price updated
        setGrandTotal(priceAfterRemovingSingleOrder + shippingChargeAfterRemovingSingleOrder + taxAfterRemovingSingleOrder);

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