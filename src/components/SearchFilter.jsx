import React, { useState } from 'react';

const SearchFilter = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <div className="flex justify-center my-4">
            <form onSubmit={handleSearch} className="flex">
                <input
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="border border-gray-300 rounded-l-md p-2"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white rounded-r-md p-2 hover:bg-blue-600"
                >
                    Search
                </button>
            </form>
        </div>
    );
};

export default SearchFilter;