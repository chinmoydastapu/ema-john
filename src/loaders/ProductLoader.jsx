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

const getCartProducts = res => {
    let cartProducts = [];
    const cartProductId = Object.keys(getCartData());

    cartProductId.forEach(cartId => {
        const cartProduct = res.find(p => p.id == cartId);
        cartProducts.unshift(cartProduct);
    })

    return cartProducts;
};