import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserMd } from "react-icons/fa";
import axios from "axios";


const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDoctors = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_API}/api/doctor/doctors`);
        setDoctors(response.data.doctors);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getDoctors();
  }, []);

  return (
    <div className="container mx-auto p-8">
      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          // Show 6 skeleton cards while loading
          [...Array(6)].map((_, index) => (
            <DoctorCardSkeleton key={index} />
          ))
        ) : (
          // Show actual doctor cards
          doctors.map((doctor) => (
            <motion.div
              key={doctor._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: doctor.id * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white border rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
            >
              {/* Doctor Image */}
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-64 object-cover rounded-md mb-4"
              />

              {/* Name & Specialty */}
              <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                <FaUserMd className="text-pink-500" /> {doctor.name}
              </h2>
              <p className="text-gray-600 text-lg mb-2">{doctor.specialty}</p>

              {/* Book Appointment */}
              <Link
                to={`/book-appointment/${doctor._id}/${encodeURIComponent(doctor.name)}`}
                className="block mt-4 bg-pink-500 text-white px-5 py-2 rounded-md text-center hover:bg-pink-600 transition"
              >
                Book Appointment
              </Link>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default DoctorsList;


const DoctorCardSkeleton = () => {
  return (
    <div className="bg-white border rounded-xl p-6 shadow-xl relative overflow-hidden">
      {/* Skeleton Image */}
      <div className="w-full h-64 bg-gray-200 rounded-md mb-4 animate-pulse" />

      {/* Skeleton Name */}
      <div className="flex items-center gap-2 mb-2">
        <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse" />
        <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Skeleton Specialty */}
      <div className="h-6 w-1/2 bg-gray-200 rounded mb-2 animate-pulse" />

      {/* Skeleton Button */}
      <div className="mt-4 h-10 bg-gray-200 rounded-md animate-pulse" />
    </div>
  );
};