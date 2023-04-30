import { Outlet } from "react-router-dom";
import OrderSummary from "../components/OrderSummary/OrderSummary";
import { createContext, useState } from "react";

export const OrderSummaryContext = createContext();

const SideNav = () => {
    const [removeOrder, setRemoveOrder] = useState(false);
    const [removeSingleOrder, setRemoveSingleOrder] = useState(false);

    return (
        <OrderSummaryContext.Provider value={{removeOrder, removeSingleOrder, setRemoveOrder, setRemoveSingleOrder}}>
            <div className="flex flex-col-reverse lg:flex-row justify-between">
                <Outlet></Outlet>
                <OrderSummary></OrderSummary>
            </div>
        </OrderSummaryContext.Provider>
    );
};

export default SideNav;