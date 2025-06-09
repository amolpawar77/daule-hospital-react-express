import React, { useState } from 'react';
import { FaQuestion, FaClock, FaCalendarAlt, FaMedkit } from 'react-icons/fa';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { RiHealthBookFill } from 'react-icons/ri';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
    const faqs = [
        {
            question: "What are the visiting hours?",
            answer: "Visiting hours are from 9 AM to 8 PM daily.",
            icon: <FaClock className="text-blue-500" />
        },
        {
            question: "How can I book an appointment?",
            answer: "You can book an appointment through our website or by calling our reception.",
            icon: <FaCalendarAlt className="text-blue-500" />
        },
        {
            question: "What insurance plans do you accept?",
            answer: "We accept a variety of insurance plans. Please contact our billing department for more details.",
            icon: <RiHealthBookFill className="text-blue-500" />
        },
        {
            question: "Is there a pharmacy on-site?",
            answer: "Yes, we have a fully stocked pharmacy available for patients.",
            icon: <FaMedkit className="text-blue-500" />
        },
        {
            question: "What should I bring for my first visit?",
            answer: "Please bring your ID, insurance card, and any relevant medical records.",
            icon: <FaQuestion className="text-blue-500" />
        },
        {
            question: "What emergency services are available?",
            answer: "We provide 24/7 emergency care with a fully equipped emergency department and trauma center.",
            icon: <FaMedkit className="text-blue-500" />
        },
        {
            question: "Do you offer telehealth services?",
            answer: "Yes, we offer virtual consultations for eligible appointments. Please call our reception to learn more about telehealth options.",
            icon: <FaQuestion className="text-blue-500" />
        },
        {
            question: "How do I access my medical records?",
            answer: "You can access your medical records through our patient portal or by submitting a written request to our medical records department.",
            icon: <RiHealthBookFill className="text-blue-500" />
        },
        {
            question: "What specialists are available at your facility?",
            answer: "We have specialists in cardiology, orthopedics, pediatrics, neurology, oncology, and many other fields. Check our Doctors page for a complete list.",
            icon: <FaMedkit className="text-blue-500" />
        },
        {
            question: "Is parking available?",
            answer: "Yes, we offer free parking for patients and visitors in our designated parking areas around the hospital.",
            icon: <FaQuestion className="text-blue-500" />
        }
    ];

    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto p-4 max-w-3xl"
        >
            <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold mb-8 text-center text-gray-800"
            >
                Frequently Asked Questions
            </motion.h1>
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                    >
                        <div 
                            className="flex items-center justify-between cursor-pointer"
                            onClick={() => toggleFAQ(index)}
                        >
                            <div className="flex items-center gap-3">
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {faq.icon}
                                </motion.div>
                                <h2 className="font-semibold text-lg text-gray-700">
                                    {faq.question}
                                </h2>
                            </div>
                            <motion.div
                                animate={{ rotate: activeIndex === index ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <BsChevronDown className="text-blue-500" />
                            </motion.div>
                        </div>
                        <AnimatePresence>
                            {activeIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="mt-2 text-gray-600"
                                >
                                    <p className="pl-8">{faq.answer}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default FAQ;