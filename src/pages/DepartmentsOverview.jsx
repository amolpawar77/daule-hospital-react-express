import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import { DepartmentStatsLoader, DepartmentCardLoader } from '../components/LoadingSkeletons';

// 🎯 Child Component: Department Card
const DepartmentCard = ({ department }) => {
    const servicesList = Array.isArray(department.services) 
        ? department.services[0].split(',') 
        : department.services.split(',');

    return (
        <motion.div 
            whileHover={{ scale: 1.05 }} 
            className="bg-white border rounded-lg p-6 shadow-lg transition-transform duration-300"
        >
            <img 
                src={department.image} 
                alt={department.name} 
                className="w-full h-40 object-cover rounded-md mb-4"
                loading="lazy"
            />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{department.name}</h2>
            <p className="text-gray-600 mb-4">{department.description}</p>
            <div className="text-gray-700">
                <h3 className="font-semibold text-lg mb-1">Services Offered:</h3>
                <ul className="list-disc pl-5 mb-4">
                    {servicesList.map((service, index) => (
                        <li key={index} className="text-gray-600">{service.trim()}</li>
                    ))}
                </ul>
                <p className="font-semibold">Contact: <span className="text-pink-500"><a href={`tel:${department.contact}`}>{department.contact}</a></span></p>
                <Link className="hover:underline text-blue-600 font-medium" to={`/department/${department._id}`}>Read More</Link>
            </div>
        </motion.div>
    );
};

// 🎯 Child Component: Department Statistics
const DepartmentStats = ({ departments, totalDepartments }) => {
    const totalServices = departments?.reduce((acc, dept) => {
        const servicesList = Array.isArray(dept.services) 
            ? dept.services[0].split(',') 
            : dept.services.split(',');
        return acc + servicesList.length;
    }, 0) || 0;
    
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }} 
            className="bg-gray-100 p-6 rounded-lg shadow-md text-center mb-8"
        >
            <h3 className="text-xl font-bold text-gray-800 mb-2">🏥 Hospital Statistics</h3>
            <p className="text-gray-700"><strong>Total Departments:</strong> {totalDepartments}</p>
            <p className="text-gray-700"><strong>Total Services Offered:</strong> {totalServices}</p>
            <p className="text-gray-700"><strong>Expert Doctors Available:</strong> {totalDepartments}</p>
        </motion.div>
    );
};

// 🎯 Child Component: Department Information (Why Choose Us)
const DepartmentInfo = () => {
    const features = [
        "🩺 24/7 Emergency Care",
        "🏆 Highly Experienced Doctors",
        "🔬 Advanced Medical Equipment",
        "💊 Affordable Treatment Plans",
        "🏥 Personalized Patient Care"
    ];

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.8 }} 
            className="bg-blue-100 p-6 rounded-lg shadow-md text-center mb-8"
        >
            <h3 className="text-xl font-bold text-gray-800 mb-3">🌟 Why Choose Our Hospital?</h3>
            <ul className="text-gray-700 list-none">
                {features.map((feature, index) => (
                    <li key={index} className="mb-2">{feature}</li>
                ))}
            </ul>
        </motion.div>
    );
};

// 🎯 Main Component: Departments Overview
const DepartmentsOverview = () => {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER_API}/api/departments`);
                setDepartments(response.data.departments);
            } catch (error) {
                toast.error('Failed to fetch departments');
            } finally {
                setLoading(false);
            }
        };
        fetchDepartments();
    }, []);

    if (loading) {
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">🏥 Departments Overview</h1>
                
                {/* Stats Loader */}
                <DepartmentStatsLoader />
                
                {/* Department Cards Loader */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map(index => (
                        <DepartmentCardLoader key={index} />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">🏥 Departments Overview</h1>
            
            {/* Department Stats Section */}
            <DepartmentStats 
                departments={departments} 
                totalDepartments={departments.length} 
            />

            {/* Department Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {departments.map(department => (
                    <DepartmentCard key={department._id} department={department} />
                ))}
            </div>
        </div>
    );
};

export default DepartmentsOverview;
