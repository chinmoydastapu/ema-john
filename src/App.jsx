import { createContext, useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { productLoader } from "./loaders/ProductLoader";
import { router } from "./routes/Routes";

export const ThemeContext = createContext();
export const CartContext = createContext();
export const ProductsContext = createContext();
export const OrderContext = createContext();

const App = () => {
  const [toggleTheme, setToggleTheme] = useState(false);
  const [totalCarts, setTotalCarts] = useState(['']);
  const [products, setProducts] = useState([]);
  const [orderedProduct, setOrderedProduct] = useState({});

  useEffect(() => {
    productLoader().then(res => setProducts(res));
  }, []);

  return (
    <div data-theme={!toggleTheme ? 'night' : 'autumn'}>
      <ThemeContext.Provider value={[toggleTheme, setToggleTheme]}>
        <CartContext.Provider value={{ totalCarts, setTotalCarts }}>
          <ProductsContext.Provider value={{ products }}>
            <OrderContext.Provider value={{orderedProduct, setOrderedProduct}}>
              <RouterProvider router={router}></RouterProvider>
            </OrderContext.Provider>
          </ProductsContext.Provider>
        </CartContext.Provider>
      </ThemeContext.Provider>
    </div>
  );
};

export default App;