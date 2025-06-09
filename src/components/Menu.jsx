import { SignInButton, useUser } from '@clerk/clerk-react';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Menu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [userProfile, setUserProfile] = useState(null);
    const [error, setError] = useState(null);
    const { user, isSignedIn } = useUser();
    
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
        setIsOpen(false);
    }, [location]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        const getUser = async () => {
            if (!isSignedIn || !user) {
                return;
            }
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_SERVER_API}/api/user/profile/${user.id}`
                );
                setUserProfile(response.data);
            } catch (err) {
                setError(err.message);
                console.error('Failed to fetch user profile:', err);
            }
        };
        getUser();
    }, [user, isSignedIn]);

    const navigationItems = [
        { to: "/", text: "Home" },
        { to: "/about", text: "About" },
        { to: "/departments", text: "Departments" },
        { to: "/doctors", text: "Doctors" },
        { to: "/book-appointment", text: "Book Appointment" },
        { to: "/contact", text: "Contact" },
    ];

    // Separate rendering for SignInButton/Profile
    const authElement = isSignedIn ? (
        <li>
            <Link
                to="/profile"
                className="block text-gray-900 font-semibold text-lg hover:text-gray-600 transition duration-200 dark:text-white dark:hover:text-gray-400"
                onClick={closeMenu}
            >
                Profile
            </Link>
        </li>
    ) : (
        <li>
            <SignInButton />
        </li>
    );

    return (
        <nav className="bg-white p-6 shadow-xl sticky top-0 z-50 dark:bg-gray-800 dark:text-white">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center">
                    <Link to={'/'} className="flex items-center text-2xl font-bold tracking-wide hover:opacity-80 transition-opacity">
                        <span className="text-blue-600 mr-2">🏥</span>
                        <span className="bg-gradient-to-r from-pink-600 to-teal-500 bg-clip-text text-transparent">
                            Daule Hospital
                        </span>
                    </Link>
                </div>

                <div className={`${isOpen ? 'block' : 'hidden'} md:block fixed md:relative top-[4.5rem] md:top-0 left-0 right-0 bg-white dark:bg-gray-800 md:bg-transparent ${isOpen ? 'h-screen flex items-center justify-center' : ''}`}>
                    <ul className="flex flex-col md:flex-row md:items-center md:space-x-6 p-4 md:p-0 space-y-4 md:space-y-0 text-center">
                        {navigationItems.map((link) => (
                            <li key={link.to}>
                                <Link
                                    to={link.to}
                                    className="block text-gray-900 font-semibold text-lg hover:text-gray-600 transition duration-200 dark:text-white dark:hover:text-gray-400"
                                    onClick={closeMenu}
                                >
                                    {link.text}
                                </Link>
                            </li>
                        ))}
                        {authElement}
                    </ul>
                </div>

                <button
                    className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    {isOpen ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>
        </nav>
    );
};

export default Menu;
