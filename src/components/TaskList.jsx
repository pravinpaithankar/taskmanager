import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEdit, faTrash, faUndo } from '@fortawesome/free-solid-svg-icons';

const TaskList = ({ tasks, filter, onDelete, completeTask, editTask, markPending }) => {
  const filteredTasks = tasks.filter(task => filter === 'All' ? true : task.status === filter);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-[#9BB7D4] text-[#333333]'; // Lighter Slate Blue for Pending, Darker Text
      case 'Completed':
        return 'bg-[#A3D4E5] text-black'; // Light Aquamarine for Completed
      case 'Overdue':
        return 'bg-red-600 text-white'; // Darker Red for Overdue
      default:
        return 'bg-gray-100 text-black'; // Default for others
    }
  };

  if (filteredTasks.length === 0) {
    return <p className="text-gray-500">No tasks available</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {filteredTasks.map(task => (
        <div key={task.id} className={`border rounded-lg p-4 shadow-md flex flex-col transition-transform transform hover:scale-105 ${getStatusColor(task.status)}`}>
          <div className="flex-grow">
            <h3 className="font-semibold text-lg">{task.taskName}</h3>
            <p className="text-gray-700">Priority: {task.priority}</p>
            <p className="text-gray-600">Assigned to: {task.assignedTo}</p>
            <p className="text-gray-500">Notes: {task.notes}</p>
            <p className="font-medium">Status: {task.status}</p>
          </div>
          <div className="flex justify-between mt-2">
            {task.status === 'Pending' && (
              <>
                <button
                  className="bg-[#4C7D9F] text-white px-3 py-1 rounded hover:bg-[#A3D4E5] transition-colors"
                  onClick={() => completeTask(task.id)}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </button>
                <button
                  className="bg-[#FFD166] text-black px-3 py-1 rounded hover:bg-yellow-500 transition-colors"
                  onClick={() => editTask(task)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              </>
            )}
            {task.status === 'Completed' && (
              <button
                className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition-colors"
                onClick={() => markPending(task.id)}
              >
                <FontAwesomeIcon icon={faUndo} />
              </button>
            )}
            <button
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
              onClick={() => onDelete(task.id)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
