import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';

const GalleryManagement = () => {
    const [images, setImages] = useState([]);
    const { register, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState(false);

    // Fetch all images on component mount
    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_API}/api/user/gallery`);
            setImages(response.data.images);
        } catch (error) {
            toast.error('Failed to fetch images');
        }
    };

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            await axios.post(`${import.meta.env.VITE_SERVER_API}/api/user/gallery`, data);
            toast.success('Image added successfully');
            reset();
            fetchImages();
        } catch (error) {
            toast.error('Failed to add image');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this image?')) {
            try {
                await axios.delete(`${import.meta.env.VITE_SERVER_API}/api/user/gallery/${id}`);
                toast.success('Image deleted successfully');
                fetchImages();
            } catch (error) {
                toast.error('Failed to delete image');
            }
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Gallery Management</h2>

            {/* Add Image Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="mb-8 space-y-4">
                <div>
                    <input
                        {...register('url', { required: true })}
                        type="text"
                        placeholder="Image URL"
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <input
                        {...register('title', { required: true })}
                        type="text"
                        placeholder="Image Title"
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <select
                        {...register('category', { required: true })}
                        className="w-full p-2 border rounded"
                    >
                        <option value="">Select Category</option>
                        <option value="facilities">Facilities</option>
                        <option value="equipment">Equipment</option>
                        <option value="staff">Staff</option>
                        <option value="patients">Patients</option>
                    </select>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                >
                    {loading ? 'Adding...' : 'Add Image'}
                </button>
            </form>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.map((image) => (
          <div key={image._id} className="border rounded-lg overflow-hidden">
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold">{image.title}</h3>
              <p className="text-gray-500 capitalize">{image.category}</p>
              <button
                onClick={() => handleDelete(image._id)}
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
            </div>
        </div>
    );
};

export default GalleryManagement;