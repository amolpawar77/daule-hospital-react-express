import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { format, isAfter, startOfToday, parseISO } from 'date-fns';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt, FaUserMd, FaUser, FaList } from 'react-icons/fa';

const AppointmentManagement = () => {
    const [appointments, setAppointments] = useState([]);
    const [normalAppointments, setNormalAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('upcoming'); // Changed default to 'upcoming'
    const [selectedDate, setSelectedDate] = useState(null);
    const [allAppointments, setAllAppointments] = useState([]);

    useEffect(() => {
        const fetchAllAppointments = async () => {
            setLoading(true);
            try {
                const [doctorResponse, normalResponse] = await Promise.all([
                    axios.get(`${import.meta.env.VITE_SERVER_API}/api/appointment/appointments/doctors`),
                    axios.get(`${import.meta.env.VITE_SERVER_API}/api/appointment/appointments`)
                ]);
                
                setAppointments(doctorResponse.data);
                setNormalAppointments(normalResponse.data);
                setAllAppointments([...doctorResponse.data, ...normalResponse.data]);
            } catch (error) {
                toast.error(error.response?.data?.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };
        fetchAllAppointments();
    }, []);

    const handleStatusUpdate = async (appointmentId, newStatus) => {
        try {
            // Different endpoints based on appointment type
            const endpoint = activeTab === 'doctor'
                ? `${import.meta.env.VITE_SERVER_API}/api/appointment/appointments/doctor`
                : `${import.meta.env.VITE_SERVER_API}/api/appointment/appointments`;

            await axios.put(endpoint, {
                appointmentId,
                status: newStatus
            });

            // Update local state based on active tab
            if (activeTab === 'doctor') {
                setAppointments(appointments.map(apt =>
                    apt._id === appointmentId ? { ...apt, status: newStatus } : apt
                ));
            } else {
                setNormalAppointments(normalAppointments.map(apt =>
                    apt._id === appointmentId ? { ...apt, status: newStatus } : apt
                ));
            }

            toast.success(`Appointment status updated to ${newStatus}`);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update status");
        }
    };

    const StatusButton = ({ status, currentStatus, appointmentId }) => (
        <button
            onClick={() => handleStatusUpdate(appointmentId, status)}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all duration-300 ${
                currentStatus === status
                    ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200 hover:shadow-sm'
            }`}
            disabled={currentStatus === status}
        >
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </button>
    );

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'scheduled':
                return 'bg-green-100 text-green-800 border border-green-200';
            case 'completed':
                return 'bg-blue-100 text-blue-800 border border-blue-200';
            case 'cancelled':
                return 'bg-red-100 text-red-800 border border-red-200';
            case 'no-show':
                return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
            default:
                return 'bg-gray-100 text-gray-800 border border-gray-200';
        }
    };

    const formatDate = (dateString) => {
        return format(new Date(dateString), 'MMM dd, yyyy');
    };

    const getFilteredAppointments = () => {
        let filtered = [];
        const today = startOfToday();

        switch (activeTab) {
            case 'doctor':
                filtered = appointments;
                break;
            case 'normal':
                filtered = normalAppointments;
                break;
            case 'all':
                filtered = allAppointments;
                break;
            case 'upcoming':
                filtered = allAppointments.filter(apt => 
                    isAfter(parseISO(apt.appointmentDate), today)
                );
                break;
            default:
                filtered = allAppointments;
        }

        // Apply date filter if selected
        if (selectedDate) {
            filtered = filtered.filter(apt => 
                format(parseISO(apt.appointmentDate), 'yyyy-MM-dd') === 
                format(selectedDate, 'yyyy-MM-dd')
            );
        }

        return filtered;
    };

    const filteredAppointments = getFilteredAppointments();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 min-h-screen">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                            Appointment Management
                        </h2>
                        <p className="text-gray-600">
                            Manage and track all appointment activities
                        </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <div className="relative">
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                                dateFormat="MMMM d, yyyy"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholderText="Filter by date"
                                isClearable
                            />
                            <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-3 mb-6">
                    <button
                        onClick={() => setActiveTab('upcoming')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ease-in-out text-sm sm:text-base
                            ${activeTab === 'upcoming'
                                ? 'bg-blue-600 text-white shadow-lg hover:bg-blue-700'
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                    >
                        <FaCalendarAlt className="text-sm" />
                        Upcoming
                    </button>
                    <button
                        onClick={() => setActiveTab('doctor')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ease-in-out text-sm sm:text-base
                            ${activeTab === 'doctor'
                                ? 'bg-blue-600 text-white shadow-lg hover:bg-blue-700'
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                    >
                        <FaUserMd className="text-sm" />
                        Doctor ({appointments.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('normal')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ease-in-out text-sm sm:text-base
                            ${activeTab === 'normal'
                                ? 'bg-blue-600 text-white shadow-lg hover:bg-blue-700'
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                    >
                        <FaUser className="text-sm" />
                        Normal ({normalAppointments.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('all')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ease-in-out text-sm sm:text-base
                            ${activeTab === 'all'
                                ? 'bg-blue-600 text-white shadow-lg hover:bg-blue-700'
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                    >
                        <FaList className="text-sm" />
                        All ({allAppointments.length})
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr className="text-xs sm:text-sm">
                                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-semibold text-gray-600 uppercase tracking-wider">Patient Name</th>
                                    {activeTab === 'doctor' && (
                                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-semibold text-gray-600 uppercase tracking-wider">Doctor Name</th>
                                    )}
                                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-semibold text-gray-600 uppercase tracking-wider hidden sm:table-cell">Date & Time</th>
                                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">Type</th>
                                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-semibold text-gray-600 uppercase tracking-wider hidden lg:table-cell">Reason</th>
                                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredAppointments.map((appointment) => (
                                    <tr key={appointment._id} className="hover:bg-gray-50 transition-colors duration-200">
                                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                                            <div className="font-medium text-gray-900 text-sm sm:text-base">
                                                {appointment.patientId?.name || appointment.patientName + " " + appointment.patientContact}
                                            </div>
                                        </td>
                                        {activeTab === 'doctor' && (
                                            <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                                                <div className="font-medium text-gray-900 text-sm sm:text-base">{appointment.doctorId.name}</div>
                                            </td>
                                        )}
                                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap hidden sm:table-cell">
                                            <div className="text-gray-900 text-sm">{formatDate(appointment.appointmentDate)}</div>
                                            <div className="text-sm text-gray-500">{appointment.appointmentTime}</div>
                                        </td>
                                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap hidden md:table-cell">
                                            <div className="capitalize text-gray-900 text-sm">{appointment.appointmentType}</div>
                                        </td>
                                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                                            <span className={`px-2.5 py-1 text-xs sm:text-sm rounded-full ${getStatusBadgeClass(appointment.status)}`}>
                                                {appointment.status}
                                            </span>
                                        </td>
                                        <td className="px-4 sm:px-6 py-3 sm:py-4 hidden lg:table-cell">
                                            <div className="text-gray-900 text-sm max-w-xs truncate">{appointment.reasonForVisit}</div>
                                        </td>
                                        <td className="px-4 sm:px-6 py-3 sm:py-4">
                                            <div className="flex flex-wrap gap-2">
                                                {['scheduled', 'completed', 'cancelled', 'no-show'].map(status => (
                                                    <StatusButton
                                                        key={status}
                                                        status={status}
                                                        currentStatus={appointment.status}
                                                        appointmentId={appointment._id}
                                                    />
                                                ))}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentManagement;