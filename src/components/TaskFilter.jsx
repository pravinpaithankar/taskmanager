import React from 'react';

const TaskFilter = ({ filter, setFilter, sortBy, setSortBy }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      {/* Filter by Status */}
      <div className="flex items-center">
        <label htmlFor="task-status" className="mr-2 font-semibold text-[#3E4A59] dark:text-[#E1E8ED]">
          Filter by Status:
        </label>
        <select
          id="task-status"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded p-2 bg-white dark:bg-[#3D5A73] text-[#3E4A59] dark:text-[#E1E8ED] dark:border-[#627D98] transition-colors"
        >
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      {/* Sort by Criteria */}
      <div className="flex items-center">
        <label htmlFor="task-sort" className="mr-2 font-semibold text-[#3E4A59] dark:text-[#E1E8ED]">
          Sort By:
        </label>
        <select
          id="task-sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-300 rounded p-2 bg-white dark:bg-[#3D5A73] text-[#3E4A59] dark:text-[#E1E8ED] dark:border-[#627D98] transition-colors"
        >
          <option value="date">Sort by Date</option>
          <option value="priority">Sort by Priority</option>
        </select>
      </div>
    </div>
  );
};

export default TaskFilter;
