import { useCart } from '../contexts/CartContext';
import { useState } from 'react';

function CheckoutPage() {
    const { cart, clearCart } = useCart();
    const [orderPlaced, setOrderPlaced] = useState(false);

    const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * (item.quantity || 1),
        0
    );

    const placeOrder = () => {
        setOrderPlaced(true);
        clearCart(); // Clear the cart after placing the order
    };

    return (
        <div className="container mx-auto p-4 mb-28">

            {orderPlaced ? (
                <p className="text-center text-gray-600 text-lg mt-20 mb-24">
                    ✅ Your order has been placed successfully!
                </p>
            ) : cart.length === 0 ? (
                <p className="text-center py-52 text-gray-600">
                    🛒 Your checkout is empty.
                </p>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items List */}
                    <ul className="lg:col-span-2 space-y-4">
                        {cart.map(item => (
                            <li key={item.id} className="flex justify-between border p-4 rounded shadow-sm bg-white">
                                <div>
                                    <h3 className="font-semibold">{item.title}</h3>
                                    <p className="text-sm text-gray-600">
                                        ${item.price.toFixed(2)} × {item.quantity}
                                    </p>
                                </div>
                                <p className="font-bold">
                                    ${(item.price * (item.quantity || 1)).toFixed(2)}
                                </p>
                            </li>
                        ))}
                    </ul>

                    {/* Summary Section */}
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md h-fit sticky top-20">
                        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                        <div className="flex justify-between mb-2">
                            <span>Total Items:</span>
                            <span>{cart.reduce((sum, item) => sum + (item.quantity || 1), 0)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg mb-6">
                            <span>Total Price:</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        <button
                            onClick={placeOrder}
                            className="w-full bg-red-700 hover:bg-red-800 text-white py-2 rounded transition"
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CheckoutPage;
