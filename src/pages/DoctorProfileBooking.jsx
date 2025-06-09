import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '@clerk/clerk-react';

const DoctorProfileBooking = () => {
    const { user, isSignedIn } = useUser();
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { id } = useParams();

    useEffect(() => {
        const getDoctors = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER_API}/api/doctor/doctors`);
                setDoctors(response.data.doctors);
            } catch (error) {
                toast.error('Failed to fetch doctors');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        getDoctors();
    }, []);

    if (loading) {
        return <p className="text-center text-gray-500">Loading...</p>;
    }

    const doctor = doctors.find((doc) => doc._id === id);

    if (!doctor) {
        return <p className="text-center text-red-500">Doctor not found!</p>;
    }

    const validateTime = (time) => {
        const [hours, minutes] = time.split(':').map(Number);
        const selectedTime = hours * 60 + minutes;
        const minTime = 9 * 60; // 9:00 AM
        const maxTime = 17 * 60; // 5:00 PM

        return selectedTime >= minTime && selectedTime <= maxTime;
    };

    const onSubmit = async (data) => {
        try {
            if (!isSignedIn || !user) {
                toast.warn('Please sign in to book an appointment');
                return;
            }

            // Validate time
            if (!validateTime(data.appointmentTime)) {
                toast.error('Please select a time between 9:00 AM and 5:00 PM');
                return;
            }

            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_API}/api/appointment/make-appointment/doctor`,
                {
                    patientId: user.id,
                    doctorId: doctor._id,
                    appointmentDate: data.appointmentDate,
                    appointmentTime: data.appointmentTime,
                    reasonForVisit: data.reasonForVisit
                }
            );

            if (response.status === 201) {
                toast.success('Appointment booked successfully!');
                reset();
            } else {
                toast.error(response.data.message || 'Failed to book appointment');
            }
        } catch (error) {
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Error booking appointment');
            }
            console.error('Error booking appointment:', error);
        }
    };

    // Function to get tomorrow's date in YYYY-MM-DD format
    const getTomorrowDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    // Function to get date 3 months from now
    const getMaxDate = () => {
        const maxDate = new Date();
        maxDate.setMonth(maxDate.getMonth() + 1);
        return maxDate.toISOString().split('T')[0];
    };

    return (
        <div className="container mx-auto p-4">
            <ToastContainer position="top-right" autoClose={3000} />
            <h1 className="text-2xl font-bold mb-4">Doctor Profile</h1>
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold">{doctor.name}</h2>
                <p className="text-gray-600">Specialization: {doctor.specialty}</p>
                <p className="text-gray-600">Experience: {doctor.experience} years</p>
                <p className="mt-4">{doctor.name} is a highly experienced {doctor.specialty.toLowerCase()} specialist.</p>

                <h3 className="text-lg font-semibold mt-6">Book an Appointment</h3>
                <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Date *</label>
                            <input
                                type="date"
                                {...register("appointmentDate", { required: "Date is required" })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-pink-500"
                                min={getTomorrowDate()}
                                max={getMaxDate()}
                            />
                            {errors.appointmentDate && (
                                <p className="text-red-500 text-sm mt-1">{errors.appointmentDate.message}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Time *</label>
                            <input
                                type="time"
                                {...register("appointmentTime", { 
                                    required: "Time is required",
                                    validate: {
                                        workingHours: (value) => 
                                            validateTime(value) || 
                                            "Please select a time between 9:00 AM and 5:00 PM"
                                    }
                                })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-pink-500"
                                min="09:00"
                                max="17:00"
                                step="1800" // 30-minute intervals
                            />
                            {errors.appointmentTime && (
                                <p className="text-red-500 text-sm mt-1">{errors.appointmentTime.message}</p>
                            )}
                        </div>
                        <div className="mb-4 md:col-span-2">
                            <label className="block text-gray-700 mb-2">Reason for Visit *</label>
                            <textarea
                                {...register("reasonForVisit", { required: "Reason for visit is required" })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-pink-500"
                                rows="3"
                                placeholder="Describe your symptoms or reason for visit"
                            ></textarea>
                            {errors.reasonForVisit && (
                                <p className="text-red-500 text-sm mt-1">{errors.reasonForVisit.message}</p>
                            )}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="bg-pink-500 text-white px-6 py-2 rounded-md hover:bg-pink-600 transition-colors duration-300"
                    >
                        Book Appointment
                    </button>
                </form>
            </div>
        </div>
    );
};

export default DoctorProfileBooking;
