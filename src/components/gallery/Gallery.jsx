import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SkeletonCard = () => (
    <div className="relative overflow-hidden rounded-lg sm:rounded-2xl shadow-lg sm:shadow-xl bg-gray-300 animate-pulse h-48 sm:h-64 w-full"></div>
);

const SkeletonGallery = () => (
    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
        {[...Array(8)].map((_, index) => (
            <SkeletonCard key={index} />
        ))}
    </div>
);

const ImageModal = ({ image, onClose }) => {
    if (!image) return null;
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="max-w-4xl w-full">
                <img src={image} alt="Preview" className="w-full h-auto rounded-lg" />
                <button 
                    className="absolute top-4 right-4 text-white text-xl bg-black bg-opacity-50 w-10 h-10 rounded-full"
                    onClick={onClose}
                >
                    ×
                </button>
            </div>
        </div>
    );
};

const GalleryFilter = ({ onFilterChange }) => {
    const categories = ['All', 'facilities', 'equipment', 'staff', 'patients'];
    
    return (
        <div className="flex flex-wrap gap-4 justify-center mb-8">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => onFilterChange(category)}
                    className="px-6 py-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-800 transition-colors"
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [activeFilter, setActiveFilter] = useState('All');
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_API}/api/user/gallery`);
            setImages(response.data.images);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 sm:mb-10 text-center text-gray-900 tracking-wide">
                Our Medical Gallery
            </h2>
            
            <GalleryFilter onFilterChange={setActiveFilter} />
            
            {loading ? (
                <SkeletonGallery />
            ) : (
                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
                    {images
                        .filter(image => activeFilter === 'All' || image.category === activeFilter)
                        .map((image, index) => (
                            <div 
                                key={index} 
                                className="relative cursor-pointer group overflow-hidden rounded-lg sm:rounded-2xl shadow-lg sm:shadow-xl transition-transform transform hover:scale-105"
                                onClick={() => setSelectedImage(image.url)}
                            >
                                <img 
                                    src={image.url} 
                                    alt={image.title} 
                                    className="w-full h-48 sm:h-64 object-cover rounded-lg sm:rounded-2xl transition-all duration-300 ease-in-out"
                                />
                                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 ease-in-out">
                                    <div className="absolute inset-0 flex items-center justify-center p-2">
                                        <span className="text-white text-base sm:text-lg font-semibold text-center">
                                            {image.title}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            )}

            <ImageModal 
                image={selectedImage} 
                onClose={() => setSelectedImage(null)} 
            />
        </div>
    );
};

export default Gallery;
