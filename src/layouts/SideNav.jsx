import { Outlet } from "react-router-dom";
import OrderSummary from "../components/OrderSummary/OrderSummary";
import { createContext, useState } from "react";

export const RemoveOrderContext = createContext();

const SideNav = () => {
    const [removeOrder, setRemoveOrder] = useState(false);

    return (
        <RemoveOrderContext.Provider value={{removeOrder, setRemoveOrder}}>
            <div className="flex flex-col-reverse lg:flex-row justify-between">
                <Outlet></Outlet>
                <OrderSummary></OrderSummary>
            </div>
        </RemoveOrderContext.Provider>
    );
};

export default SideNav;