import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useEffect, useState} from 'react';
import logo from '../assets/Logo/kraado.svg';
import {IoBagOutline} from "react-icons/io5";


function Header() {
    const { cart } = useCart();
    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const location = useLocation(); // Get current path

    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

    const totalPrice = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

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
        `hover:text-red-700 font-medium ${
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

                <div className="flex items-center gap-2">
                    {/* Total Price in black*/}
                    {totalPrice > 0 && (
                        <span
                            className="text-sm font-semibold text-black"
                        >
                            ${totalPrice.toFixed(2)}
                        </span>
                    )}

                    {/* Cart Icon with its own background and badge */}
                    <Link to="/cart" className="relative bg-red-50 p-2 rounded-full hover:bg-red-100 transition">
                        <IoBagOutline className="w-6 h-6 text-red-800 dark:text-white" />

                        {/* Notification badge */}
                        {totalItems > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                                {totalItems}
                            </span>
                        )}

                        {/* Bottom indicator if active */}
                        {location.pathname === '/cart' && (
                            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-red-700 rounded"></span>
                        )}
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Header;
