import { TrashIcon, CreditCardIcon } from '@heroicons/react/24/solid';
import { useContext, useEffect, useState } from 'react';
import { OrderContext, ProductsContext } from '../../App';
import { deleteOrderData, getOrderData } from '../../utilities/LocalStorage';
import { totalOrderedItemsFromLS } from '../../loaders/ProductLoader';
import { Toaster, toast } from 'react-hot-toast';
import { RemoveOrderContext } from '../../layouts/SideNav';

const OrderSummary = () => {
    const [selectedITems, setSelectedItems] = useState(0);

    const { products } = useContext(ProductsContext);
    const { orderedProduct } = useContext(OrderContext);
    const { setRemoveOrder } = useContext(RemoveOrderContext);

    useEffect(() => {
        // Adding quantity to all ordered products
        const savedOrders = getOrderData();
        for (const orderId in savedOrders) {
            const previousAddedProduct = products.find(product => product.id === orderId);
            if (previousAddedProduct) {
                const quantity = savedOrders[orderId];
                previousAddedProduct.quantity = quantity;
            }
            if (orderedProduct.id === orderId) {
                orderedProduct.quantity = previousAddedProduct.quantity;
            }
        }

        // Calculating total selected items
        const totalSelectedItems = totalOrderedItemsFromLS();
        setSelectedItems(totalSelectedItems);
    }, [products, orderedProduct]);

    const handleClearOrders = () => {
        deleteOrderData();
        setSelectedItems(0);
        setRemoveOrder(true);
        toast.success("Cleared Order List");
    };

    return (
        <div className="w-full lg:w-96 lg:sticky top-16 mx-auto h-fit p-5 text-black bg-orange-400">
            <h1 className="text-xl font-semibold border-b w-fit px-3 mx-auto py-2">Order Summary</h1>
            <div className='flex justify-between items-center'>
                <p className='mt-5'><span className='font-semibold'>Selected Items:</span> </p>
                <span>{selectedITems}</span>
            </div>
            <div className='flex justify-between items-center'>
                <p className='mt-3'><span className='font-semibold'>Total Price:</span> </p>
                <span>{ }</span>
            </div>
            <div className='flex justify-between items-center'>
                <p className='mt-3'><span className='font-semibold'>Total Shipping Charge:</span> </p>
                <span>{ }</span>
            </div>
            <div className='flex justify-between items-center'>
                <p className='mt-3'><span className='font-semibold'>Tax:</span> <span className="text-sm">(15%)</span></p>
                <span>{ }</span>
            </div>
            <h3 className='mt-3 mb-5 text-xl font-bold'>Grand Total: </h3>
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