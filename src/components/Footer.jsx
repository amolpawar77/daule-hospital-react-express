import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8 mt-8">
            <div className="container mx-auto px-4">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Hospital Info */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Daule Hospital</h3>
                        <p className="text-sm text-gray-300">
                            Providing quality healthcare services since 1995.
                            Your health is our priority.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link to="/about" className="text-sm text-gray-300 hover:text-white">About Us</Link></li>
                            <li><Link to="/departments" className="text-sm text-gray-300 hover:text-white">Departments</Link></li>
                            <li><Link to="/doctors" className="text-sm text-gray-300 hover:text-white">Our Doctors</Link></li>
                            <li><Link to="/contact" className="text-sm text-gray-300 hover:text-white">Contact Us</Link></li>
                            <li><Link to="/gallery" className="text-sm text-gray-300 hover:text-white">Gallery</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Contact Us</h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li>Savedi Ahilyanagar, Maharashtra</li>
                            <li>Phone: (123) 456-7890</li>
                            <li>Email: info@daulehospital.com</li>
                        </ul>
                    </div>

                    {/* Emergency */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Emergency</h3>
                        <p className="text-sm text-gray-300">24/7 Emergency Services</p>
                        <p className="text-xl font-bold text-red-500 mt-2">108</p>
                        <a href="tel:+18001234567" className="text-lg font-semibold text-white mt-2">
                            +1 (800) 123-4567
                        </a>
                    </div>
                </div>

                {/* Social Media Links */}
                <div className="flex justify-center space-x-6 mb-6">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                        <FaFacebook size={24} />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                        <FaTwitter size={24} />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400">
                        <FaInstagram size={24} />
                    </a>
                </div>

                {/* Bottom Links and Copyright */}
                <div className="border-t border-gray-700 pt-6">
                    <div className="text-center">
                        <div className="flex justify-center space-x-6 mb-4">
                            <Link to="/terms" className="text-sm text-gray-300 hover:text-white">Terms and Conditions</Link>
                            <Link to="/privacy" className="text-sm text-gray-300 hover:text-white">Privacy Policy</Link>
                            <Link to="/faq" className="text-sm text-gray-300 hover:text-white">FAQ</Link>
                        </div>
                        <p className="text-sm text-gray-400">
                            &copy; {new Date().getFullYear()} Daule Hospital. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
