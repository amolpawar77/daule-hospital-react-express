import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';

const DepartmentManager = () => {
  const [departments, setDepartments] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm();

  const fetchDepartments = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_API}/api/departments`);
      setDepartments(response.data.departments);
    } catch (error) {
      toast.error('Failed to fetch departments');
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const onSubmit = async (data) => {
    try {
      if (editingId) {
        await axios.put(`${import.meta.env.VITE_SERVER_API}/api/departments/${editingId}`, data);
        toast.success('Department updated successfully');
      } else {
        await axios.post(`${import.meta.env.VITE_SERVER_API}/api/departments`, data);
        toast.success('Department created successfully');
      }
      reset();
      setEditingId(null);
      fetchDepartments();
    } catch (error) {
      toast.error('Operation failed');
    }
  };

  const handleEdit = (department) => {
    setEditingId(department._id);
    setValue('name', department.name);
    setValue('description', department.description);
    setValue('services', department.services);
    setValue('contact', department.contact);
    setValue('image', department.image);
    setValue('fullDescription', department.fullDescription);
    setValue('facilities', department.facilities);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_SERVER_API}/api/departments/${id}`);
        toast.success('Department deleted successfully');
        fetchDepartments();
      } catch (error) {
        toast.error('Delete operation failed');
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className='mb-2 text-xl'>Department Manager</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
              {...register('name', { required: 'Name is required' })}
              placeholder="Department Name"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name.message}</span>
            )}
          </div>
          
          <div>
            <input
              {...register('contact', { required: 'Contact is required' })}
              placeholder="Contact Information"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.contact && (
              <span className="text-red-500 text-sm">{errors.contact.message}</span>
            )}
          </div>

          <div className="md:col-span-2">
            <textarea
              {...register('description', { required: 'Description is required' })}
              placeholder="Department Description"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={3}
            />
            {errors.description && (
              <span className="text-red-500 text-sm">{errors.description.message}</span>
            )}
          </div>

          <div className="md:col-span-2">
            <textarea
              {...register('services', { required: 'Services are required' })}
              placeholder="Department Services"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={3}
            />
            {errors.services && (
              <span className="text-red-500 text-sm">{errors.services.message}</span>
            )}
          </div>

          <div className="md:col-span-2">
            <input
              {...register('image')}
              placeholder="Image URL"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="md:col-span-2">
            <textarea
              {...register('fullDescription', { required: 'Full description is required' })}
              placeholder="Detailed Department Description"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={4}
            />
            {errors.fullDescription && (
              <span className="text-red-500 text-sm">{errors.fullDescription.message}</span>
            )}
          </div>

          <div className="md:col-span-2">
            <textarea
              {...register('facilities', { required: 'Facilities are required' })}
              placeholder="Department Facilities (comma separated)"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={3}
            />
            {errors.facilities && (
              <span className="text-red-500 text-sm">{errors.facilities.message}</span>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full md:w-auto px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          {editingId ? 'Update Department' : 'Create Department'}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {departments.map((department) => (
          <div
            key={department._id}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            {department.image && (
              <img
                src={department.image}
                alt={department.name}
                className="w-full h-48 object-cover rounded-t-lg mb-4"
              />
            )}
            <h3 className="text-xl font-semibold mb-2">{department.name}</h3>
            <p className="text-gray-600 mb-2">{department.description}</p>
            <p className="text-gray-600 mb-2">Services: {department.services}</p>
            <p className="text-gray-600 mb-2">Contact: {department.contact}</p>
            
            <div className="mb-2">
              <h4 className="font-medium">Full Description:</h4>
              <p className="text-gray-600">{department.fullDescription}</p>
            </div>
            <div className="mb-4">
              <h4 className="font-medium">Facilities:</h4>
              <p className="text-gray-600">{department.facilities}</p>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(department)}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(department._id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentManager;