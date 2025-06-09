import React from "react";
import { motion } from "framer-motion";
import { TbClock24 } from "react-icons/tb";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
};

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto p-8 max-w-5xl">

        {/* Title */}
        <motion.h1 
          variants={fadeInUp} 
          initial="hidden" 
          animate="visible" 
          className="text-5xl font-bold text-center text-gray-800 mb-8"
        >
          About Us
        </motion.h1>

        {/* Introduction */}
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="text-xl text-gray-700 mb-12 text-center leading-relaxed"
        >
          Welcome to our hospital, where compassionate care meets excellence. With over 
          20 years of service, we provide high-quality healthcare with a patient-first approach.
        </motion.p>

        {/* Vision & Mission with Images */}
        <motion.div 
          variants={staggerContainer} 
          initial="hidden" 
          animate="visible"
          className="grid md:grid-cols-2 gap-8 mb-12"
        >
          <motion.div 
            variants={fadeInUp}
            className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
          >
            <img 
              src="https://media.istockphoto.com/id/1373259857/photo/strong-boy-in-superhero-costume-at-hospital.webp?a=1&b=1&s=612x612&w=0&k=20&c=SMFK2aH3dEaYHYguna7ji6nztL7AxN6PNnfGtFeCRKc=" 
              alt="Our Vision" 
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              To be a globally recognized healthcare provider, ensuring a healthier future for all.
            </p>
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
          >
            <img 
              src="https://media.istockphoto.com/id/1413606459/photo/research-experiment-and-medical-trial-being-done-by-a-scientist-in-a-lab-science-facility-or.webp?a=1&b=1&s=612x612&w=0&k=20&c=GjQJWga3b_GXB1WEf_-ljSXcVkpbv0vGVcqgJYHZjJY=" 
              alt="Our Mission" 
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              We aim to improve lives by delivering innovative, compassionate, and comprehensive healthcare.
            </p>
          </motion.div>
        </motion.div>

        {/* Our Team with Image */}
        <motion.div 
          variants={fadeInUp} 
          initial="hidden" 
          animate="visible"
          className="p-6 bg-white rounded-xl shadow-md mb-12"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Team</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Our skilled professionals work around the clock to ensure the best medical care.
          </p>
          <div className="grid md:grid-cols-3 gap-4 text-center">
            {["Experienced Doctors", "Skilled Nurses", "Support Staff"].map((team, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="p-4 cursor-pointer flex items-center justify-center flex-col bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300"
              >
                <img 
                  src={`https://media.istockphoto.com/id/2150983284/photo/hispanic-female-doctor-analyzing-x-ray-in-modern-office.webp?a=1&b=1&s=612x612&w=0&k=20&c=u_ytIiUtzFEhmoDwSb4zW-2T-sRZx-z9a1u-r6Jtw9w=`} 
                  alt={team} 
                  className="w-20 h-20 rounded-full object-cover mb-2"
                />
                <p className="font-semibold text-gray-800">{team}</p>
                <p className="text-xl"><TbClock24 /></p>
                <p className="text-sm text-gray-500">24/7 Available</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Our Values */}
        <motion.div 
          variants={fadeInUp} 
          initial="hidden" 
          animate="visible"
          className="p-6 bg-white rounded-xl shadow-md"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: "Excellence", desc: "Striving for the highest quality in healthcare." },
              { title: "Compassion", desc: "Caring for patients with dignity and respect." },
              { title: "Innovation", desc: "Embracing cutting-edge medical technology." },
              { title: "Integrity", desc: "Upholding ethical and professional standards." },
              { title: "Collaboration", desc: "Working together for the best outcomes." },
              { title: "Safety", desc: "Ensuring the well-being of patients and staff." }
            ].map((value, index) => (
              <motion.div 
                key={index} 
                variants={fadeInUp}
                className="flex items-start space-x-3 hover:bg-gray-50 p-2 rounded-lg transition-colors duration-300"
              >
                <div className="w-2 h-2 mt-2 rounded-full bg-gray-400"></div>
                <div>
                  <h3 className="font-semibold text-gray-800">{value.title}</h3>
                  <p className="text-gray-600">{value.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div 
          variants={fadeInUp} 
          initial="hidden" 
          animate="visible"
          className="p-6 bg-white rounded-xl shadow-md mt-12"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why Choose Us?</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            We focus on overall well-being, providing:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>State-of-the-art medical facilities.</li>
            <li>Personalized care plans for every patient.</li>
            <li>A warm, welcoming environment for faster recovery.</li>
            <li>Emergency services available 24/7.</li>
            <li>Affordable healthcare without compromising on quality.</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
