import { Outlet } from "react-router-dom";
import OrderSummary from "../components/OrderSummary/OrderSummary";
import { createContext, useState } from "react";

export const RemoveOrderContext = createContext();
export const RemoveSingleOrderContext = createContext();

const SideNav = () => {
    const [removeOrder, setRemoveOrder] = useState(false);
    const [removeSingleOrder, setRemoveSingleOrder] = useState(false);

    return (
        <RemoveOrderContext.Provider value={{ removeOrder, setRemoveOrder }}>
            <RemoveSingleOrderContext.Provider value={{removeSingleOrder, setRemoveSingleOrder}}>
                <div className="flex flex-col-reverse lg:flex-row justify-between">
                    <Outlet></Outlet>
                    <OrderSummary></OrderSummary>
                </div>
            </RemoveSingleOrderContext.Provider>
        </RemoveOrderContext.Provider>
    );
};

export default SideNav;