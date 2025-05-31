import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useEffect, useState } from 'react';
import logo from '../assets/Logo/kraado.svg';
import {IoBagOutline} from "react-icons/io5";


function Header() {
    const { cart } = useCart();
    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const location = useLocation(); // Get current path

    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

    // Scroll logic for hide/show header
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY + 10) {
                setShowHeader(false);
            } else if (currentScrollY < lastScrollY - 10) {
                setShowHeader(true);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    // Helper to style active link
    const linkClasses = (path: string) =>
        `hover:text-red-500 font-medium ${
            location.pathname === path
                ? 'text-red-700 border-b-2 border-red-700 pb-1'
                : 'text-gray-500 dark:text-white'
        }`;

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/30 dark:bg-gray-900/30 shadow transition-transform duration-300 ${
                showHeader ? 'translate-y-0' : '-translate-y-full'
            }`}
        >
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="text-xl font-bold text-red-700 dark:text-indigo-400">
                    <img src={logo} alt="Logo" className="w-14" />
                </Link>

                <nav className="flex items-center space-x-6">
                    <Link to="/products" className={linkClasses('/products')}>
                        Products
                    </Link>

                    <Link to="/checkout" className={linkClasses('/checkout')}>
                        Checkout
                    </Link>
                </nav>

                <Link to="/cart" className="relative bg-red-50 p-2 rounded-full">
                    <IoBagOutline className="w-6 h-5 text-red-800 dark:text-white" />
                    {totalItems > 0 && (
                        <span className="absolute -top-2 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full font-bold">
                                {totalItems}
                            </span>
                    )}
                    {location.pathname === '/cart' && (
                        <span className="block w-full h-1 bg-red-700 rounded mt-1"></span>
                    )}
                </Link>
            </div>
        </header>
    );
}

export default Header;
