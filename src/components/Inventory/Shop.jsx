import { useState } from "react";
import Product from "./Product";
import { useLoaderData } from "react-router-dom";
import { addOrderToDb } from "../../utilities/LocalStorage";
import { Toaster, toast } from "react-hot-toast";

const Shop = () => {
    const products = useLoaderData();

    const [visibleProducts, setVisibleProducts] = useState(products.slice(0, 5));

    const handleOrderNowBtn = (id) => {
        addOrderToDb(id);
        const product = visibleProducts.find(p => p.id === id);
        toast.success(`${product ? product.name : ''} Added to Your Order List`);
    };

    return (
        <>
            <div className="w-11/12 lg:w-3/5 mx-auto lg:mx-20">
                <h1 className="text-orange-400 text-2xl font-semibold mt-10 mb-5 text-center">Our Available Products</h1>
                <div className={`mb-10 grid grid-cols-1 gap-5`}>
                    {
                        visibleProducts.map(product => <Product key={product.id} product={product} handleOrderNowBtn={handleOrderNowBtn}></Product>)
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