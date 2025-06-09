import React from 'react';

const DepartmentDetails = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Department Details</h1>
            <p className="mb-2">Here you can find detailed information about the specific department.</p>
            <h2 className="text-2xl font-semibold mb-2">Department Name</h2>
            <p className="mb-4">Description of the department, its services, and specialties.</p>
            <h3 className="text-xl font-semibold mb-2">Doctors in this Department</h3>
            <ul className="list-disc list-inside mb-4">
                <li>Doctor 1 - Specialization</li>
                <li>Doctor 2 - Specialization</li>
                <li>Doctor 3 - Specialization</li>
            </ul>
            <h3 className="text-xl font-semibold mb-2">Facilities Available</h3>
            <p>Details about the facilities available in this department.</p>
        </div>
    );
};

export default DepartmentDetails;