import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const CreateDoctor = () => {
  const [editingDoctor, setEditingDoctor] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      if (editingDoctor) {
        const response = await axios.put(
          `${import.meta.env.VITE_SERVER_API}/api/doctor/edit/${editingDoctor._id}`,
          data
        );
        toast.success(response.data.message);
        setDoctors(doctors.map(doc => 
          doc._id === editingDoctor._id ? { ...doc, ...data } : doc
        ));
        setEditingDoctor(null);
        reset();
      } else {
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_API}/api/doctor/create`,
          data
        );
        toast.success(response.data.message);
        setDoctors([...doctors, response.data.doctor]);
      }
      reset();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    const getDoctors = async () => {
      try {
        const respose = await axios.get(`${import.meta.env.VITE_SERVER_API}/api/doctor/doctors`)
        setDoctors(respose.data.doctors)
      } catch (error) {
        console.log(error)
      }
    }
    getDoctors()
  }, [])

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_SERVER_API}/api/doctor/delete/${id}`);
      toast.success(response.data.message);
      setDoctors(doctors.filter(doctor => doctor._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting doctor");
    }
  };

  const handleEdit = (doctor) => {
    setEditingDoctor(doctor);
    reset({
      name: doctor.name,
      specialty: doctor.specialty,
      experience: doctor.experience,
      image: doctor.image,
    });
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg mb-8">
        <ToastContainer />
        <h2 className="text-2xl font-bold mb-4">
          {editingDoctor ? 'Edit Doctor' : 'Create Doctor'}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full p-2 border rounded-lg"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Specialty</label>
            <input
              type="text"
              {...register("specialty", { required: "Specialty is required" })}
              className="w-full p-2 border rounded-lg"
            />
            {errors.specialty && <p className="text-red-500 text-sm">{errors.specialty.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Experience (years)</label>
            <input
              type="number"
              {...register("experience", { required: "Experience is required", min: 1 })}
              className="w-full p-2 border rounded-lg"
            />
            {errors.experience && <p className="text-red-500 text-sm">{errors.experience.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Image URL</label>
            <input
              type="text"
              {...register("image", { required: "Image URL is required" })}
              className="w-full p-2 border rounded-lg"
            />
            {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
          </div>

          <div className="flex gap-2">
            <button 
              type="submit" 
              className="flex-1 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
            >
              {editingDoctor ? 'Update Doctor' : 'Create Doctor'}
            </button>
            {editingDoctor && (
              <button
                type="button"
                onClick={() => {
                  setEditingDoctor(null);
                  reset({
                    name: '',
                    specialty: '',
                    experience: '',
                    image: ''
                  });
                }}
                className="flex-1 bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Doctors List</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {doctors.map((doctor) => (
            <div key={doctor._id} className="bg-white p-4 rounded-lg shadow">
              <img 
                src={doctor.image} 
                alt={doctor.name} 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold">{doctor.name}</h3>
              <p className="text-gray-600">{doctor.specialty}</p>
              <p className="text-gray-600">{doctor.experience} years experience</p>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleDelete(doctor._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleEdit(doctor)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateDoctor;
