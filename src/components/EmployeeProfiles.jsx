import React from 'react';

const EmployeeProfiles = ({ employees }) => {
  const placeholderImage = "https://avatar.iran.liara.run/public"; // Placeholder image URL

  if (employees.length === 0) {
    return <p className="text-gray-500">No employees available</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {employees.map(employee => (
        <div key={employee.id} className="border cursor-pointer rounded-lg p-6 shadow-md bg-white dark:bg-[#1B262C] transition-transform transform hover:scale-105">
          <img
            src={employee.photoURL && employee.photoURL.trim() !== '' ? employee.photoURL : placeholderImage} // Use the provided URL or the placeholder
            alt={employee.name}
            className="w-40 h-40 object-cover mb-4 roundedn "
          />
          <div className="flex-grow">
            <h3 className="font-semibold text-lg text-[#3E4A59] dark:text-[#E1E8ED]">{employee.name}</h3>
            <p className="text-[#7D8899] dark:text-[#A9B2BA] mt-2">Position: {employee.position}</p>
            <p className="text-[#7D8899] dark:text-[#A9B2BA] mt-2">Department: {employee.department}</p>
            <p className="text-[#7D8899] dark:text-[#A9B2BA] mt-2">Email: {employee.email}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmployeeProfiles;
