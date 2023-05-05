import { TrashIcon, CreditCardIcon } from '@heroicons/react/24/solid';
import { useContext, useEffect } from 'react';
import { deleteOrderData, getQuantityData } from '../../utilities/LocalStorage';
import { Toaster, toast } from 'react-hot-toast';
import { OrderSummaryContext } from '../../layouts/SideNav';
import { totalOrderedItemsFromLS } from '../../loaders/ProductLoader';
import { ProductsContext } from '../../App';
import { useNavigate } from 'react-router-dom';

const OrderSummary = () => {
    const navigate = useNavigate();

    const { products } = useContext(ProductsContext);
    const { setRemoveOrder } = useContext(OrderSummaryContext);
    const {
        totalSelectedItems,
        setTotalSelectedItems,
        totalPrice,
        setTotalPrice,
        totalShippingCharge,
        setTotalShippingCharge,
        totalTax,
        setTotalTax,
        grandTotal,
        setGrandTotal,
    } = useContext(OrderSummaryContext);

    useEffect(() => {
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
        // Calculating Tax
        const tax = parseFloat((price * 0.05).toFixed(2));

        // Setting all values
        totalPrice === 0 && setTotalPrice(price);
        totalShippingCharge === 0 && setTotalShippingCharge(shippingCharge);
        totalTax === 0 && setTotalTax(tax);
        grandTotal === 0 && setGrandTotal(price + shippingCharge + tax);

        // Getting total selected items for updating state
        const selectedItems = totalOrderedItemsFromLS();
        setTotalSelectedItems(selectedItems);
    }, [products,
        totalSelectedItems,
        totalPrice,
        totalShippingCharge,
        totalTax,
        grandTotal,
        setTotalSelectedItems,
        setTotalPrice,
        setTotalShippingCharge,
        setTotalTax,
        setGrandTotal]);

    const handleClearOrders = () => {
        deleteOrderData();
        setTotalSelectedItems(0);
        setTotalPrice(0);
        setTotalShippingCharge(0);
        setTotalTax(0);
        setGrandTotal(0);
        setRemoveOrder(true);
        toast.success("Cleared Order List");
    };

    return (
        <div className="w-full lg:w-96 lg:sticky top-16 mx-auto select-none h-fit p-5 text-black bg-orange-400">
            <h1 className="text-xl font-semibold border-b w-fit px-3 mx-auto py-2">Order Summary</h1>
            <div className='flex justify-between items-center transition-scale duration-500 ease-in-out hover:scale-105'>
                <p className='mt-5'><span className='font-semibold'>Selected Items:</span> </p>
                <span>{totalSelectedItems}</span>
            </div>
            <div className='flex justify-between items-center transition-scale duration-500 ease-in-out hover:scale-105'>
                <p className='mt-3'><span className='font-semibold'>Total Price:</span> </p>
                <span>${totalPrice}</span>
            </div>
            <div className='flex justify-between items-center transition-scale duration-500 ease-in-out hover:scale-105'>
                <p className='mt-3'><span className='font-semibold'>Total Shipping Charge:</span> </p>
                <span>${totalShippingCharge}</span>
            </div>
            <div className='flex justify-between items-center transition-scale duration-500 ease-in-out hover:scale-105'>
                <p className='mt-3'><span className='font-semibold'>Tax</span><span className="text-sm">(5%): </span></p>
                <span>${totalTax}</span>
            </div>
            <div className='flex justify-between items-center text-xl font-bold select-text'>
                <h3 className='mt-3 mb-5'>Grand Total: </h3>
                <span>${grandTotal}</span>
            </div>
            <div className="flex justify-between items-center p-3 my-3 bg-red-600 hover:bg-red-500 w-full text-white rounded-md cursor-pointer" onClick={handleClearOrders}>
                <div className="text-xl font-semibold">Clear Orders</div>
                <TrashIcon className='ml-2 h-5 w-5' />
            </div>
            <div className="flex justify-between items-center p-3 bg-green-600 hover:bg-green-500 w-full text-white rounded-md cursor-pointer">
                <div className="text-lg font-medium" onClick={() => navigate('/checkout')}>Proceed Checkout</div>
                <CreditCardIcon className='ml-2 h-5 w-5' />
            </div>
            <Toaster />
        </div>
    );
};

export default OrderSummary;