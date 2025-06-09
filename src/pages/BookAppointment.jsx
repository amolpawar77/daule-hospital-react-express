import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
};

const BookAppointment = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setError,
    } = useForm();

    const { user, isSignedIn } = useUser();
    const [formError, setFormError] = useState("");

    const onSubmit = async (data) => {
        try {
            setFormError(""); // Clear any previous errors
            
            // Update regex to handle both H:MM and HH:MM formats
            const timeRegex = /^(0?[1-9]|1[0-2]):([0-5][0-9])\s?(AM|PM|am|pm)$/;
            if (!timeRegex.test(data.appointmentTime)) {
                setError("appointmentTime", {
                    type: "manual",
                    message: "Please enter time in format: H:MM AM/PM or HH:MM AM/PM"
                });
                return;
            }

            // Extract time parts using regex match
            const match = data.appointmentTime.match(timeRegex);
            if (!match) {
                setError("appointmentTime", {
                    type: "manual",
                    message: "Invalid time format"
                });
                return;
            }

            const hours = parseInt(match[1]);
            const minutes = match[2];
            const period = match[3].toUpperCase();
            let hour24 = hours;

            // Convert to 24-hour format
            if (period === "PM" && hours !== 12) {
                hour24 += 12;
            } else if (period === "AM" && hours === 12) {
                hour24 = 0;
            }

            // Validate business hours (9 AM to 5 PM)
            if (hour24 < 9 || (hour24 === 17 && minutes > "00") || hour24 > 17) {
                setError("appointmentTime", {
                    type: "manual",
                    message: "Appointments are only available between 9:00 AM and 5:00 PM"
                });
                return;
            }

            await axios.post(
                `${import.meta.env.VITE_SERVER_API}/api/appointment/make-appointment`,
                {
                    patientId: user?.id || null,
                    patientName: data.patientName,
                    patientContact: data.patientContact,
                    date: data.date,
                    time: `${hour24}:${minutes}`,
                    reason: data.reason,
                }
            );

            toast.success("Appointment booked successfully!");
            reset();
        } catch (error) {
            console.error(error);
            setFormError(error.response?.data?.message || "Failed to book appointment. Please try again!");
            toast.error("Failed to book appointment. Try again!");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <ToastContainer/>
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">
                    Book an Appointment
                </h1>
                {formError && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {formError}
                    </div>
                )}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6 w-full max-w-lg mx-auto bg-white shadow-lg p-6 rounded-lg"
                >
                    {/* Date and Time Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 font-medium">Select Date</label>
                            <input
                                type="date"
                                {...register("date", { 
                                    required: "Date is required",
                                    validate: {
                                        futureDate: (value) => {
                                            const today = new Date();
                                            today.setHours(0, 0, 0, 0);
                                            const selectedDate = new Date(value);
                                            return selectedDate >= today || "Please select a future date";
                                        },
                                        maxDate: (value) => {
                                            const selectedDate = new Date(value);
                                            const maxDate = new Date();
                                            maxDate.setMonth(maxDate.getMonth() + 1); // Allow booking up to 3 months in advance
                                            return selectedDate <= maxDate || "Cannot book more than 3 months in advance";
                                        }
                                    }
                                })}
                                min={getMinDate()} // This prevents selecting past dates in the date picker
                                max={new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split('T')[0]}
                                className="border border-gray-300 rounded-md p-2.5 w-full focus:ring-2 focus:ring-pink-400"
                            />
                            {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium">Select Time</label>
                            <input
                                type="text"
                                placeholder="HH:MM AM/PM"
                                {...register("appointmentTime", { 
                                    required: "Time is required",
                                    pattern: {
                                        value: /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM|am|pm)$/,
                                        message: "Please enter time in format: HH:MM AM/PM"
                                    }
                                })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-pink-500"
                            />
                            {errors.appointmentTime && (
                                <p className="text-red-500 text-sm">{errors.appointmentTime.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Patient Details */}
                    <div>
                        <label className="block text-gray-700 font-medium">Patient Name</label>
                        <input
                            type="text"
                            {...register("patientName", { required: "Patient name is required" })}
                            className="border border-gray-300 rounded-md p-2.5 w-full focus:ring-2 focus:ring-pink-400"
                        />
                        {errors.patientName && <p className="text-red-500 text-sm">{errors.patientName.message}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Patient Contact</label>
                        <input
                            type="tel"
                            {...register("patientContact", {
                                required: "Contact is required",
                                pattern: { value: /^[0-9]{10}$/, message: "Invalid contact number" },
                            })}
                            className="border border-gray-300 rounded-md p-2.5 w-full focus:ring-2 focus:ring-pink-400"
                        />
                        {errors.patientContact && <p className="text-red-500 text-sm">{errors.patientContact.message}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Reason for Visit</label>
                        <textarea
                            {...register("reason", { required: "Reason is required" })}
                            className="border border-gray-300 rounded-md p-2.5 w-full focus:ring-2 focus:ring-pink-400 min-h-[100px]"
                        />
                        {errors.reason && <p className="text-red-500 text-sm">{errors.reason.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-pink-500 text-white rounded-md py-3 font-medium hover:bg-pink-600 transition duration-300"
                    >
                        Book Appointment
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BookAppointment;
