import {Outlet} from "react-router-dom";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import './index.css'

function Layout() {
    return (
        <>
            <Header />
            <main className="pt-24"> {/* Give space under fixed header */}
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default Layout;