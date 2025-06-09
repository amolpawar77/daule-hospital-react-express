import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const PatientReview = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('message', data.message);
            formData.append('patientImage', data.patientImage[0]);

            const response = await axios.post(`${import.meta.env.VITE_SERVER_API}/api/user/add-review/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 201) {
                toast.success('Review submitted successfully!');
                reset();
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to submit review');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                Share Your Experience
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name
                    </label>
                    <input
                        type="text"
                        {...register('name', { required: 'Name is required' })}
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Message
                    </label>
                    <textarea
                        {...register('message', { required: 'Message is required' })}
                        rows={4}
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    {errors.message && (
                        <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Photo
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        {...register('patientImage', { required: 'Photo is required' })}
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    {errors.patientImage && (
                        <p className="text-red-500 text-sm mt-1">{errors.patientImage.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 px-4 rounded-md text-white font-medium 
            ${loading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                >
                    {loading ? 'Submitting...' : 'Submit Review'}
                </button>
            </form>
        </div>
    );
};

export default PatientReview;