import { TrashIcon, CreditCardIcon } from '@heroicons/react/24/solid';

const OrderSummary = () => {
    return (
        <div className="w-full lg:w-96 lg:sticky top-16 mx-auto h-fit p-5 text-black bg-orange-400">
            <h1 className="text-xl font-semibold border-b w-fit px-3 mx-auto py-2">Order Summary</h1>
            <div className='flex justify-between items-center'>
                <p className='mt-5'><span className='font-semibold'>Selected Items:</span> </p>
                <span>{}</span>
            </div>
            <div className='flex justify-between items-center'>
                <p className='mt-3'><span className='font-semibold'>Total Price:</span> </p>
                <span>{}</span>
            </div>
            <div className='flex justify-between items-center'>
                <p className='mt-3'><span className='font-semibold'>Total Shipping Charge:</span> </p>
                <span>{}</span>
            </div>
            <div className='flex justify-between items-center'>
                <p className='mt-3'><span className='font-semibold'>Tax:</span> <span className="text-sm">(15%)</span></p>
                <span>{}</span>
            </div>
            <h3 className='mt-3 mb-5 text-xl font-bold'>Grand Total: </h3>
            <div className="flex justify-between items-center p-3 my-3 bg-red-600 hover:bg-red-500 w-full text-white rounded-md cursor-pointer">
                <div className="text-xl font-semibold">Clear Orders</div>
                <TrashIcon className='ml-2 h-5 w-5' />
            </div>
            <div className="flex justify-between items-center p-3 bg-green-600 hover:bg-green-500 w-full text-white rounded-md cursor-pointer">
                <div className="text-lg font-medium">Proceed Checkout</div>
                <CreditCardIcon className='ml-2 h-5 w-5' />
            </div>
        </div>
    );
};

export default OrderSummary;