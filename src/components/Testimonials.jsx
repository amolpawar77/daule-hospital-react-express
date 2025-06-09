import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const getPatientReviews = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_API}/api/user/reviews`
        );
        setTestimonials(response.data.reviews);
      } catch (err) {
        console.error('Failed to fetch patient reviews:', err);
      }
    };
    getPatientReviews();
  }, []);
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">💬 Patient Testimonials</h2>
        {testimonials.length === 0 ? (
          <p className="text-gray-600">No testimonials available at the moment.</p>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 px-6"
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial._id}
                variants={fadeInUp}
                className="p-6 bg-gray-100 shadow-lg rounded-xl"
              >
                <img
                  src={testimonial.patientImage}
                  alt={testimonial.name}
                  className="mx-auto rounded-full mb-4 w-24 h-24 object-cover"
                />
                <p className="text-gray-600 italic">"{testimonial.message}"</p>
                <h4 className="mt-4 text-lg font-semibold text-gray-800">
                  - {testimonial.name}
                </h4>
                <p className="text-sm text-gray-500 mt-2">
                  {formatDate(testimonial.date)}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
