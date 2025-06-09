import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendar, FaUser } from 'react-icons/fa';
import { MdHealthAndSafety } from 'react-icons/md';

const AppointmentHistory = ({ appointments, isVisible }) => {
    if (!isVisible) return null;

    return (
        <div className="space-y-4">
            {appointments
                .sort((a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate))
                .map((appointment) => (
                    <motion.div 
                        key={appointment._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-5 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <FaCalendar className="text-blue-500" />
                                    <h3 className="font-semibold text-gray-700">Date & Time</h3>
                                </div>
                                <p className="text-gray-600">
                                    {new Date(appointment.appointmentDate).toLocaleDateString('en-US', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                    <br />
                                    {appointment.appointmentTime}
                                </p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <MdHealthAndSafety className="text-blue-500" />
                                    <h3 className="font-semibold text-gray-700">Type & Status</h3>
                                </div>
                                <p className="capitalize text-gray-600">
                                    {appointment.appointmentType}
                                </p>
                                <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                                    appointment.status === 'completed' 
                                        ? 'bg-green-100 text-green-800' 
                                        : appointment.status === 'scheduled'
                                        ? 'bg-blue-100 text-blue-800'
                                        : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                    {appointment.status}
                                </span>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <FaUser className="text-blue-500" />
                                    <h3 className="font-semibold text-gray-700">Reason</h3>
                                </div>
                                <p className="text-gray-600">
                                    {appointment.reasonForVisit}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
        </div>
    );
};

export default AppointmentHistory;