import React from 'react';

export const DepartmentStatsLoader = () => {
    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center mb-8 animate-pulse">
            <div className="h-6 w-48 bg-gray-300 rounded mx-auto mb-4"></div>
            <div className="space-y-3">
                <div className="h-4 w-40 bg-gray-300 rounded mx-auto"></div>
                <div className="h-4 w-44 bg-gray-300 rounded mx-auto"></div>
                <div className="h-4 w-42 bg-gray-300 rounded mx-auto"></div>
            </div>
        </div>
    );
};

export const DepartmentCardLoader = () => {
    return (
        <div className="bg-white border rounded-lg p-6 shadow-lg animate-pulse">
            {/* Image placeholder */}
            <div className="w-full h-40 bg-gray-300 rounded-md mb-4"></div>
            
            {/* Title placeholder */}
            <div className="h-6 w-3/4 bg-gray-300 rounded mb-2"></div>
            
            {/* Description placeholder */}
            <div className="space-y-2 mb-4">
                <div className="h-4 w-full bg-gray-300 rounded"></div>
                <div className="h-4 w-5/6 bg-gray-300 rounded"></div>
            </div>
            
            {/* Services list placeholder */}
            <div className="mb-4">
                <div className="h-5 w-1/3 bg-gray-300 rounded mb-2"></div>
                <div className="space-y-2 pl-5">
                    <div className="h-3 w-2/3 bg-gray-300 rounded"></div>
                    <div className="h-3 w-3/4 bg-gray-300 rounded"></div>
                    <div className="h-3 w-1/2 bg-gray-300 rounded"></div>
                </div>
            </div>
            
            {/* Contact and link placeholder */}
            <div className="space-y-2">
                <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
                <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
            </div>
        </div>
    );
};