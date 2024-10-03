import React, { useState } from 'react';

const TaskForm = ({ addOrUpdateTask, employees, taskToEdit }) => {
  const [taskName, setTaskName] = useState(taskToEdit ? taskToEdit.taskName : '');
  const [priority, setPriority] = useState(taskToEdit ? taskToEdit.priority : 'Medium');
  const [assignedTo, setAssignedTo] = useState(taskToEdit ? taskToEdit.assignedTo : '');
  const [notes, setNotes] = useState(taskToEdit ? taskToEdit.notes : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    addOrUpdateTask({ taskName, priority, assignedTo, notes });
    resetForm();
  };

  const resetForm = () => {
    setTaskName('');
    setPriority('Medium');
    setAssignedTo('');
    setNotes('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-[#1B262C] p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-[#3E4A59] dark:text-[#E1E8ED]">
        {taskToEdit ? 'Edit Task' : 'Add Task'}
      </h2>
      <div className="mb-4">
        <label className="block text-[#7D8899] dark:text-[#A9B2BA] mb-2">Task Name</label>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          required
          className="border border-gray-300 rounded p-2 w-full dark:bg-[#3D5A73] dark:text-[#E1E8ED] dark:border-[#627D98]"
        />
      </div>
      <div className="mb-4">
        <label className="block text-[#7D8899] dark:text-[#A9B2BA] mb-2">Priority</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full dark:bg-[#3D5A73] dark:text-[#E1E8ED] dark:border-[#627D98]"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-[#7D8899] dark:text-[#A9B2BA] mb-2">Assigned To</label>
        <select
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full dark:bg-[#3D5A73] dark:text-[#E1E8ED] dark:border-[#627D98]"
        >
          {employees.map(employee => (
            <option key={employee.id} value={employee.name}>{employee.name}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-[#7D8899] dark:text-[#A9B2BA] mb-2">Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full dark:bg-[#3D5A73] dark:text-[#E1E8ED] dark:border-[#627D98]"
          rows="3"
        />
      </div>
      <button
        type="submit"
        className="bg-[#4C7D9F] text-white px-4 py-2 rounded hover:bg-[#A3D4E5] transition-colors"
      >
        {taskToEdit ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
};

export default TaskForm;
