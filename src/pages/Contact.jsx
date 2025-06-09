import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async (data) => {
        try {
            await axios.post(`${import.meta.env.VITE_SERVER_API}/api/user/contact-us`, data);
            toast.success('Message sent successfully!');
            reset();
        } catch (error) {
            toast.error('Failed to send message. Please try again later.');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <ToastContainer />
            <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">Contact Us</h1>
            <p className="text-center text-lg text-gray-600 mb-8">For any inquiries, please reach out to us using the contact form below.</p>

            {/* Contact Form Section */}
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Get in Touch</h2>

                {/* Name Input */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name">Name</label>
                    <input
                        {...register("name", { required: "Name is required" })}
                        className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
                        type="text"
                        id="name"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>

                {/* Email Input */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">Email</label>
                    <input
                        {...register("email", { required: "Email is required", pattern: { value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: "Invalid email format" } })}
                        className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
                        type="email"
                        id="email"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>

                {/* Message Textarea */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="message">Message</label>
                    <textarea
                        {...register("message", { required: "Message is required" })}
                        className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
                        id="message"
                        rows="6"
                    ></textarea>
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                    className="bg-pink-600 text-white py-3 px-6 rounded-md hover:bg-pink-700 focus:outline-none transition-all duration-300"
                    type="submit"
                >
                    Send Message
                </button>
            </form>
        </div>
    );
};

export default Contact;
