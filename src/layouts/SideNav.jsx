import { Outlet } from "react-router-dom";
import OrderSummary from "../components/OrderSummary/OrderSummary";

const SideNav = () => {
    return (
        <div className="flex flex-col-reverse lg:flex-row justify-between">
            <Outlet></Outlet>
            <OrderSummary></OrderSummary>
        </div>
    );
};

export default SideNav;