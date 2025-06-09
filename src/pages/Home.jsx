import React from 'react';
import { motion } from 'framer-motion';
import Slider from '../components/Slider';
import HospitalInfo from '../components/HospitalInfo';
import DepartmentsOverview from '../pages/DepartmentsOverview';
import DoctorsList from '../pages/DoctorsList';
import GalleryPreview from '../components/gallery/Gallery';
import HospitalDirectory from '../components/HospitalDirectorys';
import Testimonials from '../components/Testimonials';

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
};

const Home = () => {
  return (
    <>
      <main className="bg-gradient-to-b from-blue-50 to-gray-100">

        {/* Hero Section with Parallax Effect */}
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          <Slider />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute inset-0 bg-black bg-opacity-20 rounded-xl"
          />
        </motion.div>


        {/* Divider */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="my-8 border-t-4 border-blue-600 w-24 mx-auto"
        />

        {/* Key Departments */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="container mx-auto px-4"
        >
          <DepartmentsOverview />
        </motion.section>


        {/* Hospital Overview */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto px-4 bg-white bg-opacity-90 shadow-xl rounded-xl backdrop-blur-lg my-8"
        >
          <HospitalInfo />
        </motion.section>

        {/* Our Doctors Section */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-8"
        >
          <div className="container mx-auto">
            <h2 className="text-center text-4xl font-bold text-gray-800 mb-6">👩‍⚕️ Meet Our Doctors</h2>
            <DoctorsList />
          </div>
        </motion.section>

        {/* Hospital Gallery */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="container mx-auto px-4 py-8"
        >
          <GalleryPreview />
        </motion.section>

        {/* Patient Testimonials */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="container mx-auto px-4 py-8"
        >
          <Testimonials />
        </motion.section>

        {/* Directory & Contact */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className=" py-8"
        >
          <div className="container mx-auto px-4">
            <h2 className="text-center text-4xl font-bold text-gray-800 mb-6">📞 Contact & Directory</h2>
            <HospitalDirectory />
          </div>
        </motion.section>

      </main>
    </>
  );
};

export default Home;
