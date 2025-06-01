import { useCart } from '../contexts/CartContext';

function CheckoutPage() {
    const { cart, clearCart } = useCart();

    // Safety check
    if (!cart) return <p>Loading cart...</p>;

    const totalAmount = cart.reduce(
        (sum, item) => sum + item.price * (item.quantity || 1),
        0
    );

    const handlePlaceOrder = () => {
        if (cart.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        alert("Order placed successfully!");
        clearCart();
    };

    return (
        <div className="container mx-auto px-4 py-8">

            {cart.length === 0 ? (
                <p className="text-center py-52 text-gray-600">You have no checkouts.</p>
            ) : (
                <>
                    <ul className="space-y-4">
                        {cart.map(item => (
                            <li key={item.id} className="flex justify-between items-center border p-4 rounded shadow-sm">
                                <div>
                                    <h3 className="font-semibold text-lg">{item.title}</h3>
                                    <p className="text-sm text-gray-600">
                                        ${item.price.toFixed(2)} × {item.quantity || 1}
                                    </p>
                                </div>
                                <p className="text-md font-bold text-indigo-600">
                                    ${(item.price * (item.quantity || 1)).toFixed(2)}
                                </p>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-8 flex flex-col items-center">
                        <p className="text-xl font-semibold mb-4">
                            Total: <span className="text-indigo-700">${totalAmount.toFixed(2)}</span>
                        </p>
                        <button
                            onClick={handlePlaceOrder}
                            className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700 transition duration-200"
                        >
                            Place Order
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default CheckoutPage;
