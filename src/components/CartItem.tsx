import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

export default function CartItem({ item }) {
    const { removeFromCart, updateQuantity } = useContext(CartContext);

    return (
        <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-4">
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-contain"
                />
                <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-gray-600">${item.price}</p>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded">
                    <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                    >
                        -
                    </button>
                    <span className="px-2">{item.quantity}</span>
                    <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                    >
                        +
                    </button>
                </div>
                <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                >
                    Remove
                </button>
            </div>
        </div>
    );
}