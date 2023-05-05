import { useContext, useState } from "react";
import Product from "./Product";
import { useLoaderData } from "react-router-dom";
import { addOrderToDb, getQuantityData } from "../../utilities/LocalStorage";
import { Toaster, toast } from "react-hot-toast";
import { OrderContext } from "../../App";
import { existedProduct } from "../../loaders/ProductLoader";
import { OrderSummaryContext } from "../../layouts/SideNav";

const Shop = () => {
    const products = useLoaderData();

    const [visibleProducts, setVisibleProducts] = useState(products.slice(0, 5));

    const { setOrderedProduct } = useContext(OrderContext);
    const {
        setTotalPrice,
        setTotalShippingCharge,
        setTotalTax,
        setGrandTotal,
    } = useContext(OrderSummaryContext);

    const handleOrderNowBtn = (id) => {
        // Displaying Toast or adding data according to existing product
        if (existedProduct(id)) {
            toast.error("This Order is Already Added");
        } else {
            const currentOrderedProduct = visibleProducts.find(p => p.id === id);
            // This data is sent globally, we need this data in different components
            setOrderedProduct(currentOrderedProduct);
            addOrderToDb(id);
            // Traversing through all products for calculating Order Summary data
            const savedOrders = getQuantityData();
            let price = 0;
            let shippingCharge = 0;
            for (const orderId in savedOrders) {
                const previousAddedProduct = products.find(product => product.id === orderId);
                if (previousAddedProduct) {
                    const quantity = savedOrders[orderId];
                    previousAddedProduct.quantity = quantity;

                    // Calculating total price
                    price += previousAddedProduct.price * previousAddedProduct.quantity + (Object.keys(currentOrderedProduct).length !== 0 ? (existedProduct(currentOrderedProduct.id) ? 0 : currentOrderedProduct.price * currentOrderedProduct.quantity) : 0);

                    // Calculating total shipping charge
                    shippingCharge += previousAddedProduct.shipping * previousAddedProduct.quantity + (Object.keys(currentOrderedProduct).length !== 0 ? (existedProduct(currentOrderedProduct.id) ? 0 : currentOrderedProduct.shipping * currentOrderedProduct.quantity) : 0);
                    // console.log("execute in all clicks");
                }
            }
            // Calculating Tax
            const tax = parseFloat((price * 0.05).toFixed(2));
            // Setting all values
            setTotalPrice(price);
            setTotalShippingCharge(shippingCharge);
            setTotalTax(tax);
            setGrandTotal(price + shippingCharge + tax);

            toast.success(`${currentOrderedProduct ? currentOrderedProduct.name : ''} Added to Your Order List`);
        }
    };

    return (
        <>
            <div className="w-11/12 lg:w-3/5 mx-auto lg:mx-20">
                <h1 className="text-orange-400 text-2xl font-semibold mt-10 mb-5 text-center">Our Available Products</h1>
                <div className={`mb-10 grid grid-cols-1 gap-5`}>
                    {
                        visibleProducts.map(product => <Product
                            key={product.id}
                            product={product}
                            handleOrderNowBtn={handleOrderNowBtn}></Product>)
                    }
                </div>
                <button className="btn text-white font-bold bg-orange-400 hover:bg-orange-500 mt-5 mb-10 block w-fit mx-auto"
                    onClick={() => setVisibleProducts(products.slice(0, visibleProducts.length + 5))}>View More</button>
            </div>
            <Toaster />
        </>
    );
};

export default Shop;