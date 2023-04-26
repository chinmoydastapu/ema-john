import { Link } from "react-router-dom";
import { Bars2Icon, MoonIcon, ShoppingCartIcon, SunIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useContext, useEffect, useState } from "react";
import Logo from '../../assets/Logo.svg';
import { CartContext, ThemeContext } from "../../App";
import { getCartData } from "../../utilities/LocalStorage";

const HeaderNav = () => {
    const [toggleTheme, setToggleTheme] = useContext(ThemeContext);
    const { totalCarts, setTotalCarts } = useContext(CartContext);

    const [toggleMenu, setToggleMenu] = useState(false);

    useEffect(() => {
        const totalCartData = Object.keys(getCartData());
        setTotalCarts(totalCartData);
    }, [setTotalCarts]);

    const navItems = [
        { path: '/home', name: 'Home' },
        { path: '/my-shop', name: 'Inventory' },
        { path: '/my-shop/my-orders', name: 'My Orders' },
        { path: '/about', name: 'About' },
        { path: '/contact', name: 'Contact' },
    ];

    return (
        <div className="navbar bg-[#1C2B35] sticky top-0 z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn hover:bg-base-100 focus:bg-base-100 active:bg-base-100 lg:hidden" onClick={() => setToggleMenu(!toggleMenu)}>
                        {
                            toggleMenu ? <XMarkIcon className="w-6 h-6" /> : <Bars2Icon className="w-6 h-6" />
                        }
                    </label>
                    <ul tabIndex={0} className={`menu menu-compact mt-3 shadow bg-base-300 w-64 transition-all duration-500 ease-in-out absolute ${toggleMenu ? 'left-0 opacity-100' : 'left-[-300px] opacity-50'}`}>
                        {
                            navItems.map((item, idx) => <li key={idx} onClick={() => setToggleMenu(!toggleMenu)}><Link to={item.path} className="hover:bg-base-100 focus:bg-base-100 active:bg-base-100">{item.name}</Link></li>)
                        }
                    </ul>
                </div>
                <Link to='/' className="block bg-inherit normal-case ml-2 md:ml-5"><img src={Logo} alt="Ema-John" className="w-24" /></Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {
                        navItems.map((item, idx) => <li key={idx}><Link to={item.path} className="text-gray-300 hover:bg-transparent focus:bg-transparent active:bg-transparent">{item.name}</Link></li>)
                    }
                </ul>
            </div>

            <div className="navbar-end mr-2 md:mr-5" >
                <div onClick={() => setToggleTheme(!toggleTheme)}>
                    {
                        !toggleTheme ? <SunIcon className="w-6 h-6 text-orange-300 cursor-pointer" /> : <MoonIcon className="w-6 h-6 text-gray-300 cursor-pointer" />
                    }
                </div>
                <Link to='/order-review' className="text-secondary ml-4 indicator">
                    <ShoppingCartIcon className="h-6 w-6" />
                    <span className="indicator-item badge badge-error">{totalCarts.length}</span>
                </Link>
            </div>
        </div>
    );
};

export default HeaderNav;