/* eslint-disable react/prop-types */

import { TrashIcon } from "@heroicons/react/24/solid";
import { useContext, useState } from "react";
import { ThemeContext } from "../../App";

const Order = ({ orderedProduct, handleTrashBtn }) => {
    const [initialShow, setInitialShow] = useState(false);

    const [toggleTheme] = useContext(ThemeContext);

    const { id, name, price, shipping, img } = orderedProduct;

    setTimeout(() => {
        setInitialShow(true);
    }, 10);

    return (
        <div className={`flex justify-between items-center m-5 my-10 p-2 sm:p-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-1000 ease-in-out ${toggleTheme ? 'bg-slate-200' : 'bg-slate-800'} ${initialShow ? 'opacity-100' : 'scale-50 opacity-0 -translate-x-96'}`}>
            <div className="flex justify-start items-center gap-5">
                <div>
                    <img className="w-20 h-20 rounded-lg" src={img} alt="Loading..." />
                </div>
                <div className="text-left font-semibold">
                    <h3 className="text-sm sm:text-xl font-semibold">{name}</h3>
                    <p>Price: <span className="text-orange-400">${price}</span></p>
                    <p>Shipping: <span className="text-orange-400">${shipping}</span></p>
                </div>
            </div>
            <div className="cursor-pointer" onClick={() => handleTrashBtn(id)}>
                <TrashIcon className="w-10 h-10 bg-orange-300 text-orange-600 p-2 rounded-full" />
            </div>
        </div>
    );
};

export default Order;