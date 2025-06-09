import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditReviewForm = ({ review, onClose, onUpdate }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: review.name,
            message: review.message,
        }
    });

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('message', data.message);
            if (data.patientImage[0]) {
                formData.append('patientImage', data.patientImage[0]);
            }

            const response = await axios.put(
                `${import.meta.env.VITE_SERVER_API}/api/user/reviews/${review._id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            toast.success('Review updated successfully!');
            onUpdate(response.data.review);
            onClose();
        } catch (error) {
            toast.error('Failed to update review');
            console.error('Error updating review:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Edit Review</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            {...register("name", { required: "Name is required" })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Message</label>
                        <textarea
                            {...register("message", { required: "Message is required" })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            rows={4}
                        />
                        {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Profile Image (Optional)</label>
                        <input
                            type="file"
                            accept="image/*"
                            {...register("patientImage")}
                            className="mt-1 block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700
                                hover:file:bg-blue-100"
                        />
                    </div>

                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditReviewForm;