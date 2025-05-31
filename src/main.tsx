import { StrictMode } from 'react';
import './index.css';
import { createRoot } from 'react-dom/client';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, Navigate } from 'react-router-dom';

import ProductsPage from "./pages/ProductsPage.tsx";
import CartPage from "./pages/CartPage.tsx";
import CheckoutPage from "./pages/CheckoutPage.tsx";
import Layout from "./Layout.tsx";
import { CartProvider } from "./contexts/CartContext.tsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/products" replace />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
        </Route>
    )
);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <CartProvider>
            <RouterProvider router={router} />
        </CartProvider>
    </StrictMode>
);
