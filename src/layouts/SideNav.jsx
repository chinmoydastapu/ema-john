import { Outlet } from "react-router-dom";
import OrderSummary from "../components/OrderSummary/OrderSummary";
import { createContext, useContext, useState } from "react";
import { getQuantityData } from "../utilities/LocalStorage";
import { ProductsContext } from "../App";

export const OrderSummaryContext = createContext();

const SideNav = () => {
    const [removeOrder, setRemoveOrder] = useState(false);

    const [totalSelectedItems, setTotalSelectedItems] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalShippingCharge, setTotalShippingCharge] = useState(0);
    const [totalTax, setTotalTax] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);

    const { products } = useContext(ProductsContext);

    const updateOrderSummaryState = () => {
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
                price += previousAddedProduct.price * previousAddedProduct.quantity;

                // Calculating total shipping charge
                shippingCharge += previousAddedProduct.shipping * previousAddedProduct.quantity;
            }
        }
        // Updating Tax
        const tax = parseFloat((price * 0.05).toFixed(2));
        // Updating all values
        setTotalPrice(price);
        setTotalShippingCharge(shippingCharge);
        setTotalTax(tax);
        setGrandTotal(price + shippingCharge + tax);
    }

    return (
        <OrderSummaryContext.Provider value={{
            removeOrder, setRemoveOrder,
            totalSelectedItems, setTotalSelectedItems,
            totalPrice, setTotalPrice,
            totalShippingCharge, setTotalShippingCharge,
            totalTax, setTotalTax,
            grandTotal, setGrandTotal,
            updateOrderSummaryState
        }}>
            <div className="flex flex-col-reverse lg:flex-row justify-between">
                <Outlet></Outlet>
                <OrderSummary></OrderSummary>
            </div>
        </OrderSummaryContext.Provider>
    );
};

export default SideNav;