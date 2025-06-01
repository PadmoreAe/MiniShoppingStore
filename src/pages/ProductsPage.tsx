import { useEffect, useState, useContext } from 'react';
import { CartContext } from '../contexts/CartContext.tsx';
import { FaTh, FaList } from 'react-icons/fa';
import { FiMenu } from "react-icons/fi";
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import SearchBar from "../components/SearchBar.tsx";
import { Link } from 'react-router-dom';

function ProductsPage() {
    const [allProducts, setAllProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('');
    const [view, setView] = useState<'grid' | 'list'>('grid');
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [showCategories, setShowCategories] = useState(true);

    const itemsPerPage = 8;

    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products/categories')
            .then(res => res.json())
            .then(data => setCategories(data));
    }, []);

    useEffect(() => {
        setLoading(true);
        let url = 'https://fakestoreapi.com/products';
        if (selectedCategory !== 'all') {
            url = `https://fakestoreapi.com/products/category/${selectedCategory}`;
        }

        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (sortBy === 'price-asc') {
                    data.sort((a, b) => a.price - b.price);
                } else if (sortBy === 'price-desc') {
                    data.sort((a, b) => b.price - a.price);
                }
                setAllProducts(data);
                setCurrentPage(1);
                setLoading(false);
            });
    }, [selectedCategory, sortBy]);

    useEffect(() => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        setProducts(allProducts.slice(start, end));
    }, [allProducts, currentPage]);

    const onSearch = (term: string) => {
        const trimmed = term.trim().toLowerCase();
        if (!trimmed) {
            setProducts(allProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
        } else {
            const filtered = allProducts.filter(product =>
                product.title.toLowerCase().includes(trimmed)
            );
            setProducts(filtered);
        }
    };

    const totalPages = Math.ceil(allProducts.length / itemsPerPage);
    if (loading) return <p className="text-center text-gray-500">Loading...</p>;

    return (
        <div className="flex flex-col md:flex-row container mx-auto px-4 py-8">
            {/* Sidebar */}
            <aside className="w-full md:w-64 md:mr-6 mb-8 md:mb-0">
                <div className="bg-white dark:bg-gray-800 pb-4 rounded mr-8">
                    <button
                        onClick={() => setShowCategories(prev => !prev)}
                        className="flex justify-between items-center w-full text-left font-bold text-lg text-gray-700 dark:text-gray-200 mb-2"
                    >
                        <span><FiMenu /></span>
                        Categories
                        {showCategories ? <FaAngleUp /> : <FaAngleDown />}
                    </button>

                    {showCategories && (
                        <ul className="space-y-2 mt-4 border-t border-gray-300">
                            <li>
                                <button
                                    onClick={() => setSelectedCategory('all')}
                                    className={`w-full text-left px-3 py-2 rounded hover:bg-indigo-100 dark:hover:bg-indigo-900 ${
                                        selectedCategory === 'all' ? 'bg-indigo-200 dark:bg-indigo-700 text-indigo-800 dark:text-white' : 'text-gray-700 dark:text-gray-300'
                                    }`}
                                >
                                    All Categories
                                </button>
                            </li>
                            {categories.map(cat => (
                                <li key={cat}>
                                    <button
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`w-full text-left px-3 py-2 rounded hover:bg-indigo-100 dark:hover:bg-indigo-900 ${
                                            selectedCategory === cat ? 'bg-indigo-200 dark:bg-indigo-700 text-indigo-800 dark:text-white' : 'text-gray-700 dark:text-gray-300'
                                        }`}
                                    >
                                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
                <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                    <select
                        className="border px-3 py-2 rounded"
                        value={sortBy}
                        onChange={e => setSortBy(e.target.value)}
                    >
                        <option value="">Sort By</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                    </select>

                    <div className="w-full md:w-auto text-center">
                        <SearchBar onSearch={onSearch} />
                    </div>

                    <div className="flex gap-2 items-center">
                        <button onClick={() => setView('grid')} className={view === 'grid' ? 'text-red-800' : 'text-gray-500'}>
                            <FaTh size={20} />
                        </button>
                        <button onClick={() => setView('list')} className={view === 'list' ? 'text-red-800' : 'text-gray-500'}>
                            <FaList size={20} />
                        </button>
                    </div>
                </div>

                <div className={view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6' : 'flex flex-col gap-4'}>
                    {products.map(product => (
                        <div
                            key={product.id}
                            className="bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden p-4 hover:shadow-xl transition duration-300"
                        >
                            <img
                                src={product.image}
                                alt={product.title}
                                className="h-24 w-full object-contain mb-4"
                            />
                            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 line-clamp-2">
                                {product.title}
                            </h3>
                            <p className="text-red-800 dark:text-indigo-400 font-bold text-md mt-2">
                                ${product.price.toFixed(2)}
                            </p>
                            <div className="flex flex-col gap-2 mt-4">
                                <button
                                    onClick={() => addToCart(product)}
                                    className="bg-gray-100 text-black/65 py-1 px-4 rounded hover:bg-gray-200 transition duration-200"
                                >
                                    Add to Cart
                                </button>
                                <Link
                                    to={`/product/${product.id}`}
                                    className="text-center bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-800 transition duration-200"
                                >
                                    View Product
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="mt-8 flex justify-center gap-2 mb-24">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-4 py-2 rounded ${
                                currentPage === page ? 'bg-gray-100 text-black' : 'text-gray-700'
                            }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default ProductsPage;
