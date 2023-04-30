import { getCartData, getOrderData } from "../utilities/LocalStorage";

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

export const totalOrderedItemsFromLS = () => {
    const orderedItems = Object.values(getOrderData());
    const totalOrderedItems = orderedItems.reduce((previous, current) => previous + current, 0);
    return totalOrderedItems;
};

export const existedProduct = id => {
    const orderIds = Object.keys(getOrderData());
    const existed = orderIds.find(orderId => orderId === id);

    return existed;
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
    const orderedProductId = Object.keys(getOrderData());

    orderedProductId.forEach(orderId => {
        const cartProduct = res.find(product => product.id == orderId);
        orderedProducts.unshift(cartProduct);
    })

    return orderedProducts;
}