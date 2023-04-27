/* eslint-disable react/prop-types */

import { TrashIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";
import { ThemeContext } from "../../App";

const Order = ({ orderedProduct }) => {
    const [toggleTheme] = useContext(ThemeContext);

    const { name, price, shipping, img } = orderedProduct;

    return (
        <div className={`flex justify-between items-center m-5 my-10 p-3 rounded-lg shadow-lg hover:shadow-xl ${toggleTheme ? 'bg-slate-200' : 'bg-slate-800'}`}>
            <div className="flex justify-start items-center gap-5">
                <div>
                    <img className="w-20 h-20 rounded-lg" src={img} alt="Loading..." />
                </div>
                <div className="text-left font-semibold">
                    <h3 className="text-xl font-semibold">{name}</h3>
                    <p>Price: <span className="text-orange-400">${price}</span></p>
                    <p>Shipping: <span className="text-orange-400">${shipping}</span></p>
                </div>
            </div>
            <div className="cursor-pointer">
                <TrashIcon className="w-12 h-12 bg-orange-300 text-orange-600 p-2 rounded-full" />
            </div>
        </div>
    );
};

export default Order;