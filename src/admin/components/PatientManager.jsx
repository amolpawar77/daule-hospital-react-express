import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const PatientManager = () => {
    const [patientList, setPatientList] = useState([]);

    useEffect(() => {
        const getPatients = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_SERVER_API}/api/user/patients`
                );
                setPatientList(response.data);
            } catch (err) {
                console.error('Failed to fetch user profile:', err);
            }
        };
        getPatients();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4 text-center">Patient Manager</h1>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="overflow-x-auto"
            >
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="py-2 px-4">Name</th>
                            <th className="py-2 px-4">Email</th>
                            <th className="py-2 px-4">Phone Number</th>
                            <th className="py-2 px-4">Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patientList.map((patient, index) => (
                            <motion.tr
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="border-b hover:bg-gray-100"
                            >
                                <td className="py-2 px-4 text-center">{patient.name || "N/A"}</td>
                                <td className="py-2 px-4 text-center">{patient.email || "N/A"}</td>
                                <td className="py-2 px-4 text-center">{patient.phoneNumber || "N/A"}</td>
                                <td className="py-2 px-4 text-center">{patient.role || "N/A"}</td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>
        </div>
    );
};

export default PatientManager;
