import { useEffect, useState } from "react";
import Product from "./Product";
import { useLoaderData } from "react-router-dom";

const Shop = () => {
    const products = useLoaderData();

    const [visibleProducts, setVisibleProducts] = useState(products.slice(0, 5));
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true);
    }, []);

    return (
        <>
            <div className="w-3/4 mx-auto lg:mx-20">
                <h1 className="text-orange-400 text-2xl font-semibold mt-10 mb-5 text-center">Our Available Products</h1>
                <div className={`mb-10 grid grid-cols-1 gap-5 transition-all duration-1000 ease-in-out ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                    {
                        visibleProducts.map(product => <Product key={product.id} product={product} ></Product>)
                    }
                </div>
                <button className="btn text-white font-bold bg-orange-400 hover:bg-orange-500 mt-5 mb-10 block w-fit mx-auto"
                    onClick={() => setVisibleProducts(products.slice(0, visibleProducts.length + 5))}>View More</button>
            </div>
        </>
    );
};

export default Shop;