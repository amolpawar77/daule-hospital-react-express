import React from 'react';
import { FaUserMd, FaBed, FaAmbulance, FaHospitalAlt } from 'react-icons/fa';

const HospitalInfo = () => {
  const stats = [
    {
      icon: <FaUserMd className="text-4xl " />,
      count: "50+",
      title: "Specialist Doctors",
      description: "Experienced medical professionals"
    },
    {
      icon: <FaBed className="text-4xl " />,
      count: "200+",
      title: "Hospital Beds",
      description: "Well-equipped patient rooms"
    },
    {
      icon: <FaAmbulance className="text-4xl " />,
      count: "24/7",
      title: "Emergency Service",
      description: "Round-the-clock medical care"
    },
    {
      icon: <FaHospitalAlt className="text-4xl " />,
      count: "10+",
      title: "Specialized Units",
      description: "Advanced medical departments"
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide world-class healthcare services with state-of-the-art 
            facilities and experienced medical professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((item, index) => (
            <div 
              key={index} 
              className="bg-white cursor-pointer p-6 rounded-lg shadow-md text-center 
                         transform hover:scale-105 transition-transform duration-300"
            >
              <div className="flex justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold  mb-2 bg-gradient-to-r from-pink-600 to-teal-500 bg-clip-text text-transparent">
                {item.count}
              </h3>
              <h4 className="text-xl font-semibold mb-2">
                {item.title}
              </h4>
              <p className="text-gray-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HospitalInfo;