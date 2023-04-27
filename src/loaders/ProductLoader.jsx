import { getCartData } from "../utilities/LocalStorage";

export const productLoader = async () => {
    const products = await fetch('/products.json');
    const response = await products.json();

    return response;
};

export const cartFromLocalStorage = () => {
    const productsData = productLoader();
    const products = productsData.then(res => getCartProducts(res));

    const cartProducts = products.then(data => {
        return data;
    });
    return cartProducts;
};

export const orderFromLocalStorage = () => {
    const productsData = productLoader();
    const products = productsData.then(res => getOrderedProducts(res));

    const orderedProducts = products.then(data => {
        return data;
    });
    return orderedProducts;
};

const getCartProducts = res => {
    let cartProducts = [];
    const cartProductId = Object.keys(getCartData());

    cartProductId.forEach(cartId => {
        const cartProduct = res.find(product => product.id == cartId);
        cartProducts.unshift(cartProduct);
    })

    return cartProducts;
};

const getOrderedProducts = res => {
    let orderedProducts = [];
    const orderedProductId = Object.keys(getCartData());

    orderedProductId.forEach(orderId => {
        const cartProduct = res.find(product => product.id == orderId);
        orderedProducts.unshift(cartProduct);
    })

    return orderedProducts;
}