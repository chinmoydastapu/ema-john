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
}

// for quantity data
const addQuantityToLS = id => {
    let orderData = getOrderData();
    // add quantity
    const quantity = orderData[id];
    if (!quantity) {
        orderData[id] = 1;
    }
    else {
        const newQuantity = quantity + 1;
        orderData[id] = newQuantity;
    }
    localStorage.setItem('quantity', JSON.stringify(orderData));
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
    if (id in orderData) {
        delete orderData[id];
        localStorage.setItem('order', JSON.stringify(orderData));
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

const deleteCartData = () => {
    localStorage.removeItem('cart');
}

const deleteOrderData = () => {
    localStorage.removeItem('order');
}

export {
    addCartToDb,
    addOrderToDb,
    addQuantityToLS,
    removeFromCartDb,
    removeFromOrderDb,
    getCartData,
    getOrderData,
    deleteCartData,
    deleteOrderData
}