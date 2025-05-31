import '../index.css';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';
import logo from '../assets/Logo/kraado.svg'


function Footer() {
    return (
        <footer className="bg-white dark:bg-gray-900 shadow-inner w-full">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid gap-10 md:grid-cols-4 grid-cols-1">

                    {/* Logo */}
                    <div>
                        <img src={logo} alt="logo" className="max-w-20 mb-1 -pl-10" />
                    </div>

                    {/* Links */}
                    <div className="space-y-1">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Quick Links</h3>
                        <a href="#" className="block text-gray-600 dark:text-gray-300 hover:text-red-700 transition">Terms</a>
                        <a href="#" className="block text-gray-600 dark:text-gray-300 hover:text-red-700 transition">Privacy</a>
                        <a href="#" className="block text-gray-600 dark:text-gray-300 hover:text-red-700 transition">Contact</a>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-4 max-w-md">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                            Subscribe to our newsletter
                        </h3>
                        <form className="flex flex-col sm:flex-row items-center gap-3">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="w-full flex-1 px-2 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <button
                                type="submit"
                                className=" py-2 w-full sm:w-auto sm:px-2 sm:py-2 bg-red-700 text-white rounded-md hover:bg-red-800 transition"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>


                    {/* Social Media */}
                    <div className='max-w-2xl mx-auto'>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-8">Follow Us</h3>
                        <div className="flex gap-4">
                            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-500">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-500">
                                <Twitter size={18} />
                            </a>
                            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-500">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-500">
                                <Mail size={18} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Footer bottom */}
                <div className="mt-20 pt-6 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
                    © {new Date().getFullYear()} ShopCart. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

export default Footer;
