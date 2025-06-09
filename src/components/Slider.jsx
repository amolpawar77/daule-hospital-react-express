import React, { useState, useEffect } from 'react';

const images = [
    'https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D',
    'https://media.istockphoto.com/id/1139755582/photo/medical-equipment-on-the-background-of-group-of-health-workers-in-the-icu.webp?a=1&b=1&s=612x612&w=0&k=20&c=U5oZr7UsC9pOBoostQFuZ2aP2gVE3HGqAn1fUSwU2Lg=',
    'https://media.istockphoto.com/id/1445262065/photo/doctor-in-the-control-room-looking-at-a-medical-scan.webp?a=1&b=1&s=612x612&w=0&k=20&c=bj5JC4DNrtPuQivZHXrsUV8pH-GT88qCgU-qiMyp45Y=',
    'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG9zcGl0YWx8ZW58MHx8MHx8fDA%3D',
];

const Slider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-64 md:h-96 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-white text-2xl md:text-4xl font-bold bg-black bg-opacity-50 p-3 rounded">Welcome to Our Hospital</h2>
            </div>
            <div className="w-full h-full bg-cover bg-center transition-all duration-1000 filter brightness-75"
                 style={{ backgroundImage: `url(${images[currentIndex]})` }}>
            </div>
            {/* Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                    <button 
                        key={index} 
                        className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-gray-400'}`} 
                        onClick={() => setCurrentIndex(index)}>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Slider;