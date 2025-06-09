import React from 'react';

const FacilitiesList = () => {
    const facilities = [
        { id: 1, name: 'Emergency Room', description: '24/7 emergency services.' },
        { id: 2, name: 'Intensive Care Unit', description: 'Specialized care for critically ill patients.' },
        { id: 3, name: 'Maternity Ward', description: 'Comprehensive care for mothers and newborns.' },
        { id: 4, name: 'Surgical Unit', description: 'State-of-the-art surgical facilities.' },
        { id: 5, name: 'Radiology', description: 'Advanced imaging services including MRI and CT scans.' },
        { id: 6, name: 'Pharmacy', description: 'In-house pharmacy for all medication needs.' },
        { id: 7, name: 'Laboratory', description: 'Full-service laboratory for diagnostic testing.' },
        { id: 8, name: 'Physical Therapy', description: 'Rehabilitation services for recovery.' },
    ];

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Facilities Available</h1>
            <ul className="space-y-4">
                {facilities.map(facility => (
                    <li key={facility.id} className="border p-4 rounded shadow">
                        <h2 className="text-xl font-semibold">{facility.name}</h2>
                        <p>{facility.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FacilitiesList;