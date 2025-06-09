import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const ContactManager = () => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER_API}/api/user/contact-us`);
                setContacts(response.data);
            } catch (error) {
                console.error('Error fetching contacts:', error);
            }
        };
        fetchContacts();
    }, []);

    return (
        <motion.div
            className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-xl border border-gray-200"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Patient Contacts</h2>
            {contacts.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                    {contacts.map((contact) => (
                        <motion.div
                            key={contact.id}
                            className="p-6 bg-gray-50 rounded-lg shadow-md border border-gray-300 hover:shadow-lg transition-all"
                            whileHover={{ scale: 1.02 }}
                        >
                            <p className="text-lg font-semibold text-gray-700"><strong>Name:</strong> {contact.name}</p>
                            <p className="text-gray-600">
                                <strong>Email:</strong>{" "}
                                <a href={`mailto:${contact.email}`} target="_blank" rel="noopener noreferrer">
                                    {contact.email}
                                </a>
                            </p>
                            <p className="text-gray-500 mt-2 border-t pt-2"><strong>Message:</strong> {contact.message}</p>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">No contacts available.</p>
            )}
        </motion.div>
    );
};

export default ContactManager;