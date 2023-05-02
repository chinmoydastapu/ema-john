import { Outlet } from "react-router-dom";
import OrderSummary from "../components/OrderSummary/OrderSummary";
import { createContext, useState } from "react";

export const OrderSummaryContext = createContext();

const SideNav = () => {
    const [removeOrder, setRemoveOrder] = useState(false);

    const [totalSelectedItems, setTotalSelectedItems] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalShippingCharge, setTotalShippingCharge] = useState(0);
    const [totalTax, setTotalTax] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);

    return (
        <OrderSummaryContext.Provider value={{
            removeOrder, setRemoveOrder,
            totalSelectedItems, setTotalSelectedItems,
            totalPrice, setTotalPrice,
            totalShippingCharge, setTotalShippingCharge,
            totalTax, setTotalTax,
            grandTotal, setGrandTotal
        }}>
            <div className="flex flex-col-reverse lg:flex-row justify-between">
                <Outlet></Outlet>
                <OrderSummary></OrderSummary>
            </div>
        </OrderSummaryContext.Provider>
    );
};

export default SideNav;