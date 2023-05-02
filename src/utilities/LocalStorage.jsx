// use local storage to manage cart data
// for cart data
const addCartToDb = id => {
    let cartData = getCartData();
    cartData[id] = 1;
    
    localStorage.setItem('cart', JSON.stringify(cartData));
}

// for order data
const addOrderToDb = id => {
    let orderData = getOrderData();
    orderData[id] = 1;
    
    localStorage.setItem('order', JSON.stringify(orderData));

    setQuantityToLS(id, 1);
}

// for quantity data
const setQuantityToLS = (id, quantity) => {
    let quantityData = getQuantityData();
    // add quantity
    const lsQuantity = quantityData[id];
    if (!lsQuantity) {
        quantityData[id] = 1;
    }
    else {
        quantityData[id] = quantity;
    }
    localStorage.setItem('quantity', JSON.stringify(quantityData));
}

const removeFromCartDb = id => {
    const cartData = getCartData();
    if (id in cartData) {
        delete cartData[id];
        localStorage.setItem('cart', JSON.stringify(cartData));
    }
}

const removeFromOrderDb = id => {
    const orderData = getOrderData();
    const quantityData = getQuantityData();
    if (id in orderData) {
        delete orderData[id];
        delete quantityData[id];
        localStorage.setItem('order', JSON.stringify(orderData));
        localStorage.setItem('quantity', JSON.stringify(quantityData));
    }
}

const getCartData = () => {
    let cartData = {};

    //get the shopping cart from local storage
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cartData = JSON.parse(storedCart);
    }
    return cartData;
}

const getOrderData = () => {
    let orderData = {};

    //get the shopping cart from local storage
    const storedCart = localStorage.getItem('order');
    if (storedCart) {
        orderData = JSON.parse(storedCart);
    }
    return orderData;
}

const getQuantityData = () => {
    let quantityData = getOrderData();

    //get the shopping cart from local storage
    const storedQuantity = localStorage.getItem('quantity');
    if (storedQuantity) {
        quantityData = JSON.parse(storedQuantity);
    }
    return quantityData;
}

const deleteCartData = () => {
    localStorage.removeItem('cart');
}

const deleteOrderData = () => {
    localStorage.removeItem('order');
    localStorage.removeItem('quantity');
}

export {
    addCartToDb,
    addOrderToDb,
    setQuantityToLS,
    removeFromCartDb,
    removeFromOrderDb,
    getQuantityData,
    getCartData,
    getOrderData,
    deleteCartData,
    deleteOrderData
}