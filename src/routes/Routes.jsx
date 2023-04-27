import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../components/Home/Home";
import MyOrders from "../components/MyOrders/MyOrders";
import About from "../components/About/About";
import Contact from "../components/Contact/Contact";
import Signup from "../components/Signup/Signup";
import Login from "../components/Login/Login";
import Shop from "../components/Inventory/Shop";
import { productLoader } from "../loaders/ProductLoader";
import SideNav from "../layouts/SideNav";
import MyCarts from "../components/MyCarts/MyCarts";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/home',
                element: <Home></Home>
            },
            {
                path: '/my-shop',
                element: <SideNav></SideNav>,
                children: [
                    {
                        path: '/my-shop',
                        loader: productLoader,
                        element: <Shop></Shop>
                    },
                    {
                        path: '/my-shop/my-orders',
                        element: <MyOrders></MyOrders>
                    },
                ],
            },
            {
                path: '/my-cart',
                element: <MyCarts></MyCarts>
            },
            {
                path: '/about',
                element: <About></About>
            },
            {
                path: '/contact',
                element: <Contact></Contact>
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            },
            {
                path: '/login',
                element: <Login></Login>
            }
        ],
    },
    {
        path: '*',
        element: <div>404 | Path Not Found</div>
    }
]);