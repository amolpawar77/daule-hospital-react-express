import React from 'react';

const ServiceCategories = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Service Categories</h1>
            <p className="mb-4">Explore the various medical services we offer at our hospital.</p>
            <ul className="list-disc pl-5">
                <li className="mb-2">Emergency Services</li>
                <li className="mb-2">Outpatient Services</li>
                <li className="mb-2">Inpatient Services</li>
                <li className="mb-2">Surgical Services</li>
                <li className="mb-2">Diagnostic Services</li>
                <li className="mb-2">Rehabilitation Services</li>
                <li className="mb-2">Pediatric Services</li>
                <li className="mb-2">Maternity Services</li>
                <li className="mb-2">Geriatric Services</li>
            </ul>
        </div>
    );
};

export default ServiceCategories;