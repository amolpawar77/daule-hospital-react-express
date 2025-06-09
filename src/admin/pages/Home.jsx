import AppointmentManagement from "../components/AppointmentManagement";
import ContactManager from "../components/ContactManager";
import CreateDoctor from "../components/CreateDoctor";
import DepartmentManager from "../components/DepartmentManager";
import GalleryManagement from "../components/GalleryManagement";
import PatientManager from "../components/PatientManager";

const AdminHome = () => {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>
            <div className="space-y-6">
                <div className="bg-white shadow-lg rounded-xl w-full">
                    <h2 className="text-xl font-semibold mb-3">Create Doctor</h2>
                    <CreateDoctor />
                </div>
                <div className="bg-white shadow-lg rounded-xl w-full">
                    <h2 className="text-xl font-semibold mb-3">Manage Appointments</h2>
                    <AppointmentManagement />
                </div>
                <div className="bg-white shadow-lg rounded-xl w-full">
                    <h2 className="text-xl font-semibold mb-3">Manage Departments</h2>
                    <DepartmentManager />
                </div>
                <div className="bg-white shadow-lg rounded-xl p-6 w-full">
                    <h2 className="text-xl font-semibold mb-3">Gallery Management</h2>
                    <GalleryManagement />
                </div>
                <div className="bg-white shadow-lg rounded-xl p-6 w-full">
                    <h2 className="text-xl font-semibold mb-3">Patient Management</h2>
                    <PatientManager />
                </div>
                <div className="bg-white shadow-lg rounded-xl p-6 w-full">
                    <h2 className="text-xl font-semibold mb-3">Contact Management</h2>
                    <ContactManager />
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
