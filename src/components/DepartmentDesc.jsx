import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DepartmentDesc = () => {
  const { id } = useParams();
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_API}/api/departments`);
        setDepartments(response.data.departments);
      } catch (error) {
        toast.error('Failed to fetch departments');
      } finally {
        setLoading(false);
      }
    };
    fetchDepartments();
  }, []);

  const department = departments.find(dept => dept._id === id);

  if (!department) {
    return <div className="container mx-auto p-4">Department not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <img
          src={department.image}
          alt={department.name}
          className="w-full h-96 object-cover"
        />

        <div className="p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{department.name}</h1>

          <div className="bg-pink-50 p-4 rounded-lg mb-6">
            <p className="text-lg text-gray-700">{department.fullDescription}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Our Services</h2>
            <ul className="list-disc pl-6 space-y-2">
              {department.services.map((service, index) => (
                <li key={index} className="text-gray-600">{service}</li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Facilities</h2>
            <ul className="list-disc pl-6 space-y-2">
              {department.facilities.map((facility, index) => (
                <li key={index} className="text-gray-600">{facility}</li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Contact Information</h2>
            <p className="text-gray-600">{department.contact}</p>
            <p className="text-gray-600">Operating Hours: {department.timings}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentDesc;