import { useCart } from '../contexts/CartContext';

function CheckoutPage() {
    const { cart } = useCart();

    // Safety check (optional, for robustness)
    if (!cart) return <p>Loading cart...</p>;

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Checkout</h2>

            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul className="space-y-4">
                    {cart.map(item => (
                        <li key={item.id} className="flex justify-between border p-4 rounded">
                            <div>
                                <h3 className="font-semibold">{item.title}</h3>
                                <p>${item.price.toFixed(2)} × {item.quantity}</p>
                            </div>
                            <p className="font-bold">
                                ${(item.price * (item.quantity || 1)).toFixed(2)}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default CheckoutPage;
