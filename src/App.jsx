import { createContext, useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes";
import { productLoader } from "./loaders/ProductLoader";

export const ThemeContext = createContext();
export const CartContext = createContext();
export const ProductContext = createContext();

const App = () => {
  const [toggleTheme, setToggleTheme] = useState(false);
  const [totalCarts, setTotalCarts] = useState(['']);
  const [products, setProducts] = useState([{}]);

  useEffect(() => {
    productLoader().then(res => setProducts(res));
  }, []);

  return (
    <div data-theme={!toggleTheme ? 'night' : 'autumn'}>
      <ThemeContext.Provider value={[toggleTheme, setToggleTheme]}>
        <CartContext.Provider value={{ totalCarts, setTotalCarts }}>
          <ProductContext.Provider value={{products}}>
            <RouterProvider router={router}></RouterProvider>
          </ProductContext.Provider>
        </CartContext.Provider>
      </ThemeContext.Provider>
    </div>
  );
};

export default App;