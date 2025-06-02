import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

interface SearchBarProps {
    onSearch: (searchTerm: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
    const [search, setSearch] = useState('');

    // Trigger search on each change
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            onSearch(search.trim());
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [search, onSearch]);

    return (
        <div className="flex items-center w-full max-w-md border rounded-full px-3 py-2 shadow-sm bg-white dark:bg-gray-800">
            <input
                type="text"
                placeholder="Search products..."
                className="flex-grow outline-none bg-transparent text-sm text-gray-700 dark:text-gray-200"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <FaSearch className="text-gray-500" />
        </div>
    );
}

export default SearchBar;
