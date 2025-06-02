import {Outlet} from "react-router-dom";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import './index.css'
import {FaMoon, FaSun} from "react-icons/fa";
import {useContext} from "react";
import {ThemeContext} from "./contexts/ThemeContext.tsx";

function Layout() {

    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
            <Header />
            <main className="pt-24"> {/* Give space under fixed header */}
                <Outlet />
                <div className="fixed bottom-12 right-24 z-50">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:scale-105 transition-all duration-200 shadow"
                        aria-label="Toggle Theme"
                    >
                        {theme === 'light' ? <FaMoon size={15} /> : <FaSun size={15} />}
                    </button>
                </div>

            </main>
            <Footer />
        </div>
    )
}

export default Layout;