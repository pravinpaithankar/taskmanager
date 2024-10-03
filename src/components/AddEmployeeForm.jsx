import React, { useState } from 'react';
import { db } from '../firebaseConfig'; // Import Firestore
import { collection, addDoc } from 'firebase/firestore';

const AddEmployeeForm = ({ onEmployeeAdded }) => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [department, setDepartment] = useState('');
  const [email, setEmail] = useState('');
  const [photoURL, setPhotoURL] = useState(''); // For storing the photo URL

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Store employee data in Firestore
    const employeeData = {
      name,
      position,
      department,
      email,
      photoURL, // Store the URL of the employee photo
    };

    try {
      await addDoc(collection(db, 'employees'), employeeData);
      onEmployeeAdded(); // Callback to refresh the employee list
      resetForm();
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const resetForm = () => {
    setName('');
    setPosition('');
    setDepartment('');
    setEmail('');
    setPhotoURL('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-[#1B262C] p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-[#3E4A59] dark:text-[#E1E8ED]">Add Employee</h2>
      <div className="mb-4">
        <label className="block text-[#7D8899] dark:text-[#A9B2BA] mb-2">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border border-gray-300 rounded p-2 w-full dark:bg-[#3D5A73] dark:text-[#E1E8ED] dark:border-[#627D98]"
        />
      </div>
      <div className="mb-4">
        <label className="block text-[#7D8899] dark:text-[#A9B2BA] mb-2">Position</label>
        <input
          type="text"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          required
          className="border border-gray-300 rounded p-2 w-full dark:bg-[#3D5A73] dark:text-[#E1E8ED] dark:border-[#627D98]"
        />
      </div>
      <div className="mb-4">
        <label className="block text-[#7D8899] dark:text-[#A9B2BA] mb-2">Department</label>
        <input
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
          className="border border-gray-300 rounded p-2 w-full dark:bg-[#3D5A73] dark:text-[#E1E8ED] dark:border-[#627D98]"
        />
      </div>
      <div className="mb-4">
        <label className="block text-[#7D8899] dark:text-[#A9B2BA] mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border border-gray-300 rounded p-2 w-full dark:bg-[#3D5A73] dark:text-[#E1E8ED] dark:border-[#627D98]"
        />
      </div>
      <div className="mb-4">
        <label className="block text-[#7D8899] dark:text-[#A9B2BA] mb-2">Photo URL</label>
        <input
          type="url"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
          placeholder="Enter photo URL"
          className="border border-gray-300 rounded p-2 w-full dark:bg-[#3D5A73] dark:text-[#E1E8ED] dark:border-[#627D98]"
        />
      </div>
      <button
        type="submit"
        className="bg-[#4C7D9F] text-white px-4 py-2 rounded hover:bg-[#A3D4E5] transition-colors"
      >
        Add Employee
      </button>
    </form>
  );
};

export default AddEmployeeForm;
