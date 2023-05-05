/* eslint-disable react/prop-types */

import { MinusCircleIcon, PlusCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useContext, useEffect, useState } from "react";
import { ProductsContext, ThemeContext } from "../../App";
import { getQuantityData, setQuantityToLS } from "../../utilities/LocalStorage";
import { OrderSummaryContext } from "../../layouts/SideNav";

const Order = ({ orderedProduct, handleTrashBtn }) => {
    const [initialShow, setInitialShow] = useState(false);
    const [orderQuantity, setOrderQuantity] = useState(1);

    const [toggleTheme] = useContext(ThemeContext);
    const { products } = useContext(ProductsContext);
    const {
        setTotalPrice,
        setTotalShippingCharge,
        setTotalTax,
        setGrandTotal
    } = useContext(OrderSummaryContext);

    const { id, name, price, shipping, img, stock } = orderedProduct;

    useEffect(() => {
        const quantityObject = getQuantityData();
        const prevProduct = products.find(p => p.id === id);
        if (prevProduct) {
            setOrderQuantity(quantityObject[id]);
        }
    }, [id, products]);

    const handleIncreaseQuantity = () => {
        const quantity = parseInt(orderQuantity) + 1;
        if (quantity <= stock) {
            setOrderQuantity(quantity);
            orderedProduct.quantity = quantity;
        } else {
            setOrderQuantity(stock);
            orderedProduct.quantity = stock;
        }
        setQuantityToLS(id, orderedProduct.quantity);
        updateThePrice();
    };

    const handleDecreaseQuantity = () => {
        const quantity = parseInt(orderQuantity) - 1;
        if (quantity > 1) {
            setOrderQuantity(quantity);
            orderedProduct.quantity = quantity;
        } else {
            setOrderQuantity(1);
            orderedProduct.quantity = 1;
        }
        setQuantityToLS(id, orderedProduct.quantity);
        updateThePrice();
    };

    const handleQuantityChange = event => {
        const quantity = !isNaN(event.target.value) ? event.target.value : 1;
        if (quantity <= stock) {
            setOrderQuantity(quantity);
            orderedProduct.quantity = isNaN(parseInt(quantity)) ? 1 : parseInt(quantity);
        } else {
            setOrderQuantity(stock);
            orderedProduct.quantity = stock;
        }
        setQuantityToLS(id, orderedProduct.quantity);
        updateThePrice();
    };

    const updateThePrice = () => {
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
    }

    setTimeout(() => {
        setInitialShow(true);
    }, 10);

    return (
        <div className={`relative flex justify-between items-center m-5 my-10 p-2 sm:p-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-1000 ease-in-out ${toggleTheme ? 'bg-slate-200' : 'bg-slate-800'} ${initialShow ? 'opacity-100' : 'scale-50 opacity-0 -translate-x-96'}`}>
            <div className="flex justify-start items-center gap-5">
                <div className="w-20 sm:w-24 h-24">
                    <img className="rounded-lg h-full" src={img} alt="Loading..." />
                </div>
                <div className="font-semibold">
                    <h3 className="text-left text-sm sm:text-xl font-semibold">{name}</h3>
                    <div className="flex justify-start items-center gap-16 sm:gap-28">
                        <div className="text-left text-sm">
                            <p>Price: <span className="text-orange-400">${price}</span></p>
                            <p>Shipping: <span className="text-orange-400">${shipping}</span></p>
                            <p>Stock: <span className="text-orange-400">{stock}</span></p>
                        </div>
                        <div className="flex justify-start items-center gap-2">
                            <MinusCircleIcon className="w-6 h-6 text-orange-400 cursor-pointer" onClick={handleDecreaseQuantity} />
                            <form>
                                <input type="text" className="py-[3px] w-10 focus:outline-none text-center text-sm  bg-orange-300 text-black rounded-md" value={orderQuantity} onChange={handleQuantityChange} />
                            </form>
                            <PlusCircleIcon className="w-6 h-6 text-orange-400 cursor-pointer" onClick={handleIncreaseQuantity} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute -top-3 -right-3 cursor-pointer" onClick={() => handleTrashBtn(id)}>
                <XMarkIcon className="w-8 h-8 bg-orange-300 text-orange-700 p-2 rounded-full" />
            </div>
        </div>
    );
};

export default Order;