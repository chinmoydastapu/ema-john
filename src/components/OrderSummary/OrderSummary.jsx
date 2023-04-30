import { TrashIcon, CreditCardIcon } from '@heroicons/react/24/solid';
import { useContext, useEffect, useState } from 'react';
import { OrderContext, ProductsContext } from '../../App';
import { deleteOrderData, getOrderData } from '../../utilities/LocalStorage';
import { existedProduct, totalOrderedItemsFromLS } from '../../loaders/ProductLoader';
import { Toaster, toast } from 'react-hot-toast';
import { OrderSummaryContext } from '../../layouts/SideNav';

const OrderSummary = () => {
    const [selectedITems, setSelectedItems] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalShippingCharge, setTotalShippingCharge] = useState(0);
    const [totalTax, setTotalTax] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);

    const { products } = useContext(ProductsContext);
    const { orderedProduct } = useContext(OrderContext);
    const { setRemoveOrder, removeSingleOrder, setRemoveSingleOrder } = useContext(OrderSummaryContext);

    useEffect(() => {
        // Traversing through all products for calculating Order Summary data
        const savedOrders = getOrderData();
        let price = 0;
        let shippingCharge = 0;
        for (const orderId in savedOrders) {
            const previousAddedProduct = products.find(product => product.id === orderId);
            if (previousAddedProduct) {
                const quantity = savedOrders[orderId];
                previousAddedProduct.quantity = quantity;

                // Calculating total price
                price += previousAddedProduct.price + (Object.keys(orderedProduct).length !== 0 ? (existedProduct(orderedProduct.id) ? 0 : orderedProduct.price) : 0);

                // Calculating total shipping charge
                shippingCharge += previousAddedProduct.shipping + (Object.keys(orderedProduct).length !== 0 ? (existedProduct(orderedProduct.id) ? 0 : orderedProduct.shipping) : 0)
            }
        }

        // Calculating Tax
        const tax = parseFloat((price * 0.05).toFixed(2));

        // "if" is invoked when Order Trash Button is clicked for removing single order cart, "else" is invoked when triggered Order Now btn
        if (removeSingleOrder) {
            // Price updated
            const priceAfterRemovingSingleOrder = price - (Object.keys(orderedProduct).length !== 0 ? (existedProduct(orderedProduct.id) ? 0 : orderedProduct.price) : 0)
            setTotalPrice(priceAfterRemovingSingleOrder);

            // Shipping Charge updated
            const shippingChargeAfterRemovingSingleOrder = shippingCharge - (Object.keys(orderedProduct).length !== 0 ? (existedProduct(orderedProduct.id) ? 0 : orderedProduct.shipping) : 0)
            setTotalShippingCharge(shippingChargeAfterRemovingSingleOrder);

            // Tax updated
            const taxAfterRemovingSingleOrder = tax - (Object.keys(orderedProduct).length !== 0 ? (existedProduct(orderedProduct.id) ? 0 : orderedProduct.price) : 0) * 0.05
            setTotalTax(taxAfterRemovingSingleOrder);

            // Grand Total Price updated
            setGrandTotal(priceAfterRemovingSingleOrder + shippingChargeAfterRemovingSingleOrder + taxAfterRemovingSingleOrder);

            setRemoveSingleOrder(false);
        } else {
            setTotalPrice(price);
            setTotalShippingCharge(shippingCharge);
            setTotalTax(tax);
            setGrandTotal(price + shippingCharge + tax);
        }

        // Getting total selected items for updating state
        const totalSelectedItems = totalOrderedItemsFromLS();
        setSelectedItems(totalSelectedItems);
    }, [products, orderedProduct, removeSingleOrder, setRemoveSingleOrder]);

    const handleClearOrders = () => {
        deleteOrderData();
        setSelectedItems(0);
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
                <span>{selectedITems}</span>
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
                <div className="text-lg font-medium">Proceed Checkout</div>
                <CreditCardIcon className='ml-2 h-5 w-5' />
            </div>
            <Toaster />
        </div>
    );
};

export default OrderSummary;