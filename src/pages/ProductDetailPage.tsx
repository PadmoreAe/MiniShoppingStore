import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext.tsx';

function ProductDetailPage() {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<any>(null);
    const [showReviews, setShowReviews] = useState(false);

    const { addToCart } = useCart();

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data));
    }, [id]);

    if (!product) return <p className="text-center">Loading...</p>;

    // Simulated original price and discount
    const originalPrice = product.price * 1.2;
    const discountPercent = Math.round(((originalPrice - product.price) / originalPrice) * 100);

    // Render stars
    const renderStars = () => {
        const stars = [];
        const fullStars = Math.floor(product.rating?.rate);
        const hasHalfStar = product.rating?.rate % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        for (let i = 0; i < fullStars; i++) stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
        if (hasHalfStar) stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
        for (let i = 0; i < emptyStars; i++) stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400" />);
        return stars;
    };

    // Simulated reviews
    const reviews = Array.from({ length: product.rating?.count || 0 }).slice(0, 10).map((_, i) => ({
        id: i,
        reviewer: `User${i + 1}`,
        comment: `This is a great product! Review #${i + 1}`,
        rating: Math.floor(Math.random() * 5) + 1,
    }));

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-900 mt-6 mb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="flex justify-center">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="h-80 w-auto object-contain rounded-xl shadow-md"
                    />
                </div>

                <div className="space-y-4">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{product.title}</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Category: <span className="font-medium">{product.category}</span>
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{product.description}</p>

                    <div
                        className="flex items-center space-x-2 mt-2 cursor-pointer"
                        onClick={() => setShowReviews(prev => !prev)}
                    >
                        {renderStars()}
                        <span className="text-sm text-gray-500 dark:text-gray-400 underline">
                            {product.rating?.rate} ({product.rating?.count} reviews)
                        </span>
                    </div>

                    <div className="mt-4 space-y-1">
                        <span className="text-xl font-semibold text-red-700 dark:text-indigo-400">
                            ${product.price.toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-500 line-through ml-5 mr-5">
                            ${originalPrice.toFixed(2)}
                        </span>
                        <span className="text-sm text-green-600 dark:text-green-400 bg-gray-200 dark:bg-gray-800 rounded-lg p-2">
                            {discountPercent}% off
                        </span>
                    </div>

                    <div className="flex flex-col mt-4">
                        <button
                            onClick={() => addToCart(product)}
                            className="self-end inline-flex items-center px-6 py-2 bg-red-700 text-white rounded-xl hover:bg-red-800 transition duration-300 shadow">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>

            {showReviews && (
                <div className="mt-8 bg-gray-100 dark:bg-gray-800 p-6 rounded-xl">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Reviews</h2>
                    {reviews.map(review => (
                        <div
                            key={review.id}
                            className="border-b border-gray-300 dark:border-gray-700 py-2 text-gray-700 dark:text-gray-300"
                        >
                            <p><strong>{review.reviewer}</strong>: {review.comment}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProductDetailPage;
