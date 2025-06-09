import React from 'react';

const DepartmentCategories = () => {
    const categories = [
        { id: 1, name: 'Cardiology' },
        { id: 2, name: 'Neurology' },
        { id: 3, name: 'Pediatrics' },
        { id: 4, name: 'Orthopedics' },
        { id: 5, name: 'Gynecology' },
        { id: 6, name: 'Dermatology' },
    ];

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Department Categories</h1>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map(category => (
                    <li key={category.id} className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
                        <h2 className="text-xl font-semibold">{category.name}</h2>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DepartmentCategories;