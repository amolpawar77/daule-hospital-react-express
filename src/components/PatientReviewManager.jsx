import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditReviewForm from './EditReviewForm';

const PatientReviewManager = () => {
    const { id } = useParams();
    const [testimonials, setTestimonials] = useState([]);
    const [editingReview, setEditingReview] = useState(null);

    useEffect(() => {
        const getPatientReviews = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_SERVER_API}/api/user/reviews`
                );
                const userTestimonials = response.data.reviews.filter(
                    review => review.patientId === id
                );
                setTestimonials(userTestimonials);
            } catch (err) {
                console.error('Failed to fetch patient reviews:', err);
            }
        };
        getPatientReviews();
    }, [id]);

    const handleUpdateReview = (updatedReview) => {
        setTestimonials(testimonials.map(review => 
            review._id === updatedReview._id ? updatedReview : review
        ));
    };

    return (
        <div className="p-4">
            <ToastContainer />
            <h2 className="text-2xl font-bold mb-4">Your Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {testimonials.map((testimonial) => (
                    <div key={testimonial._id} className="border p-4 rounded-lg shadow-md">
                        <div className="flex items-center mb-4">
                            <img 
                                src={testimonial.patientImage || '/default-avatar.png'} 
                                alt={testimonial.patientName}
                                className="w-12 h-12 rounded-full object-cover mr-4"
                            />
                            <div>
                                <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                                <h3 className="font-semibold text-lg">{testimonial.message}</h3>
                                <p className="text-gray-500 text-sm">
                                    {new Date(testimonial.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                        <p className="text-gray-700 mb-4">{testimonial.review}</p>
                        <button
                            onClick={() => setEditingReview(testimonial)}
                            className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors"
                        >
                            Edit Review
                        </button>
                    </div>
                ))}
            </div>

            {editingReview && (
                <EditReviewForm
                    review={editingReview}
                    onClose={() => setEditingReview(null)}
                    onUpdate={handleUpdateReview}
                />
            )}
        </div>
    );
};

export default PatientReviewManager;