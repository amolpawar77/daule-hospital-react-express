import { SignInButton, useUser, SignOutButton } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaCalendar, FaHistory, FaPhone } from 'react-icons/fa';
import { MdHealthAndSafety } from 'react-icons/md';
import AppointmentHistory from './AppointmentHistory';
import { Link } from 'react-router-dom';

const Profile = () => {
    const { user, isSignedIn } = useUser();
    const [userProfile, setUserProfile] = useState(null);
    // Add new state variables for appointments
    const [appointments, setAppointments] = useState([]);
    const [normalAppointments, setNormalAppointments] = useState([]);
    const [showAppointments, setShowAppointments] = useState(false);
    const allAppointments = [...appointments, ...normalAppointments];

    useEffect(() => {
        const getUser = async () => {
            if (!isSignedIn || !user) {
                return;
            }
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_SERVER_API}/api/user/profile/${user.id}`
                );
                setUserProfile(response.data.user);
                // Set appointments state instead of console.log
                setAppointments(response.data.appointments || []);
                setNormalAppointments(response.data.normalAppointments || []);
            } catch (err) {
                console.error('Failed to fetch user profile:', err);
            }
        };
        getUser();
    }, [user, isSignedIn]);

    if (!isSignedIn) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h2 className="mb-4 text-xl">Please sign in to view your profile</h2>
                <SignInButton />
            </div>
        );
    }

    if (!userProfile) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-4 py-8"
        >
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-white">Profile Information</h1>
                        <SignOutButton>
                            <button className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors">
                                Sign Out
                            </button>
                        </SignOutButton>
                    </div>
                    <div className='text-white'>Patient <Link className='hover:underline' to={`/patient-review/${userProfile._id}`}>Add Review</Link></div>
                    <div className='text-white'>Patient <Link className='hover:underline' to={`/view-review/${userProfile._id}`}>View Reviews</Link></div>
                </div>

                <div className="p-6 space-y-6">
                    <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                    >
                        <FaUser className="text-2xl text-blue-500" />
                        <div>
                            <p className="text-sm text-gray-500">Name</p>
                            <p className="text-lg font-semibold">{userProfile.name || 'N/A'}</p>
                        </div>
                    </motion.div>

                    <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                    >
                        <FaEnvelope className="text-2xl text-blue-500" />
                        <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="text-lg font-semibold">{userProfile.email || 'N/A'}</p>
                        </div>
                    </motion.div>

                    <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                    >
                        <FaPhone className="text-2xl text-blue-500" />
                        <div>
                            <p className="text-sm text-gray-500">Phone</p>
                            <p className="text-lg font-semibold">{userProfile.phoneNumber || 'N/A'}</p>
                        </div>
                    </motion.div>

                    <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                    >
                        <MdHealthAndSafety className="text-2xl text-blue-500" />
                        <div>
                            <p className="text-sm text-gray-500">Role</p>
                            <p className="text-lg font-semibold capitalize">{userProfile.role || 'N/A'}</p>
                        </div>
                    </motion.div>

                    <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                    >
                        <FaCalendar className="text-2xl text-blue-500" />
                        <div>
                            <p className="text-sm text-gray-500">Member Since</p>
                            <p className="text-lg font-semibold">
                                {userProfile.createdAt ? new Date(userProfile.createdAt).toLocaleDateString() : 'N/A'}
                            </p>
                        </div>
                    </motion.div>

                    {allAppointments.length > 0 && (
                        <motion.div 
                            whileHover={{ scale: 1.01 }}
                            className="mt-8 p-6 bg-white rounded-xl shadow-lg"
                        >
                            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                                <div className="flex items-center space-x-3 mb-4 sm:mb-0">
                                    <FaHistory className="text-3xl text-blue-500" />
                                    <h2 className="text-2xl font-bold text-gray-800">Appointment History</h2>
                                </div>
                                <button 
                                    onClick={() => setShowAppointments(!showAppointments)}
                                    className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                                        showAppointments 
                                            ? 'bg-blue-500 text-white' 
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    {showAppointments ? 'Hide Appointments' : 'Show Appointments'}
                                </button>
                            </div>

                            <AppointmentHistory 
                                appointments={allAppointments}
                                isVisible={showAppointments}
                            />
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default Profile;