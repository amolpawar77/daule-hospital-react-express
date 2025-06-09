import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import React, { useEffect, useState } from 'react'
import AboutUs from "./pages/AboutUs"
import BookAppointment from "./pages/BookAppointment"
import Contact from "./pages/Contact"
import DepartmentCategories from "./pages/DepartmentCategories"
import DepartmentsOverview from "./pages/DepartmentsOverview"
import DepartmentDetails from "./pages/DepartmentDetails"
import DoctorsList from "./pages/DoctorsList"
import DoctorProfileBooking from "./pages/DoctorProfileBooking"
import FacilitiesList from "./pages/FacilitiesList"
import FAQ from "./pages/FAQ"
import HospitalDirectory from "./pages/HospitalDirectory"
import PrivacyPolicy from "./pages/PrivacyPolicy"
import ServiceCategories from "./pages/ServiceCategories"
import ServiceDetails from "./pages/ServiceDetails"
import TermsAndConditions from "./pages/TermsAndConditions"
import Menu from "./components/Menu"
import Footer from "./components/Footer"
import Gallery from "./components/gallery/Gallery"
import DepartmentDesc from "./components/DepartmentDesc"
import Signup from "./components/Signup"
import Signin from "./components/Signin"
import Profile from "./components/Profile"
import CreateDoctor from "./admin/components/CreateDoctor"
import AppointmentManagement from "./admin/components/AppointmentManagement"
import AdminHome from "./admin/pages/Home"
import PatientReview from "./components/PatientReview"
import PatientReviewManager from "./components/PatientReviewManager"
import { useUser } from "@clerk/clerk-react"
import axios from "axios"
import NotFound from "./components/PageNotFound"

const App = () => {
  const [userProfile, setUserProfile] = useState(null);
  const { user, isSignedIn } = useUser();
  useEffect(() => {
    const getUser = async () => {
      if (!isSignedIn || !user) {
        return;
      }
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_API}/api/user/profile/${user.id}`
        );
        setUserProfile(response.data.user);
      } catch (err) {
        console.error('Failed to fetch user profile:', err);
      }
    };
    getUser()
  }, [user, isSignedIn])

  if (user && userProfile && userProfile.role === 'admin') {
    return (
      <>
        <BrowserRouter>
          <Menu />
          <Routes>
            <Route path="/" element={<AdminHome />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/book-appointment" element={<BookAppointment />} />
            <Route path="/departments" element={<DepartmentsOverview />} />
            <Route path="/doctors" element={<DoctorsList />} />
            <Route path="/book-appointment" element={<BookAppointment />} />
            <Route path="/book-appointment/:id/:name" element={<DoctorProfileBooking />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />

          </Routes>
          <Footer />
        </BrowserRouter>
      </>
    )
  }

  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/book-appointment" element={<BookAppointment />} />
        <Route path="/book-appointment/:id/:name" element={<DoctorProfileBooking />} />
        <Route path="/department/:id" element={<DepartmentDesc />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/departments" element={<DepartmentsOverview />} />
        <Route path="/department-categories" element={<DepartmentCategories />} />
        <Route path="/department-details/:id" element={<DepartmentDetails />} />
        <Route path="/doctors" element={<DoctorsList />} />
        <Route path="/doctor/:id" element={<DoctorProfileBooking />} />
        <Route path="/facilities" element={<FacilitiesList />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/hospital-directory" element={<HospitalDirectory />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/service-categories" element={<ServiceCategories />} />
        <Route path="/service-details/:id" element={<ServiceDetails />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/patient-review/:id" element={<PatientReview />} />
        <Route path="/view-review/:id" element={<PatientReviewManager />} />
        <Route path="*" element={<NotFound />} />

        {/* test admin */}
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
