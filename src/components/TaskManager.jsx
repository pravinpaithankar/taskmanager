import React, { useEffect, useState } from 'react';
import EmployeeProfiles from './EmployeeProfiles';
import AddEmployeeForm from './AddEmployeeForm';
import TaskFilter from './TaskFilter';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import ExcelUpload from './ExcelUpload';
import ConfirmationDialog from './ConfirmationDialog';
import { db } from '../firebaseConfig';
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [filter, setFilter] = useState('All');
  const [sortBy, setSortBy] = useState('priority'); // Default sorting by priority
  const [confirmationDialog, setConfirmationDialog] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showEmployeeForm, setShowEmployeeForm] = useState(false); // State for showing the form

  const handleEmployeeAdded = () => {
    // Reload the employee data after adding a new employee
    // This is where you'd fetch the updated employee data from Firestore
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  // Save the mode in localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', isDarkMode);
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    fetchTasks();
    fetchEmployees();
  }, [filter, sortBy]); // Fetch tasks when filtering or sorting changes

  const fetchTasks = async () => {
    const querySnapshot = await getDocs(collection(db, 'tasks'));
    const fetchedTasks = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Filter tasks based on the selected filter
    const filteredTasks = fetchedTasks.filter(task => 
      filter === 'All' ? true : task.status === filter
    );

    // Sort tasks based on priority
    const sortedTasks = filteredTasks.sort((a, b) => {
      const priorities = { 'High': 3, 'Medium': 2, 'Low': 1 };
      return priorities[b.priority] - priorities[a.priority]; // Sort by priority
    });

    setTasks(sortedTasks);
  };

  const fetchEmployees = async () => {
    const data = await getDocs(collection(db, 'employees'));
    setEmployees(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  };

  // Add or Update a task
  const addOrUpdateTask = async (task) => {
    if (taskToEdit) {
      try {
        const taskDoc = doc(db, 'tasks', taskToEdit.id);
        await updateDoc(taskDoc, task);
        setTasks(tasks.map(t => (t.id === taskToEdit.id ? { ...task, id: t.id } : t)));
        setTaskToEdit(null);  // Reset the editing state
      } catch (error) {
        console.error('Error updating task:', error);
      }
    } else {
      try {
        const docRef = await addDoc(collection(db, 'tasks'), task);
        setTasks([...tasks, { id: docRef.id, ...task }]);
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  // Add tasks from Excel upload
  const handleExcelDataSubmit = async (uploadedData) => {
    try {
      for (const row of uploadedData) {
        if (row['Task Name'] && row['Priority'] && row['Assigned To']) {
          const taskObject = {
            taskName: row['Task Name'],
            priority: row['Priority'],
            assignedTo: row['Assigned To'],
            notes: row['Notes'] || '',
            status: 'Pending'
          };
          const docRef = await addDoc(collection(db, 'tasks'), taskObject);
          setTasks((prevTasks) => [...prevTasks, { id: docRef.id, ...taskObject }]);
        }
      }
    } catch (error) {
      console.error('Error adding tasks from Excel:', error);
    }
  };

  // Complete a task
  const completeTask = async (taskId) => {
    try {
      const taskDoc = doc(db, 'tasks', taskId);
      await updateDoc(taskDoc, { status: 'Completed' });
      setTasks(tasks.map(task => (task.id === taskId ? { ...task, status: 'Completed' } : task)));
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  // Mark a completed task as pending again
  const markPending = async (taskId) => {
    try {
      const taskDoc = doc(db, 'tasks', taskId);
      await updateDoc(taskDoc, { status: 'Pending' });
      setTasks(tasks.map(task => (task.id === taskId ? { ...task, status: 'Pending' } : task)));
    } catch (error) {
      console.error('Error marking task as pending:', error);
    }
  };

  // Show confirmation dialog for task deletion
  const confirmDeleteTask = (taskId) => {
    setTaskToDelete(taskId);
    setConfirmationDialog(true);  // Open the confirmation dialog
  };

  // Delete a task
  const deleteTask = async () => {
    try {
      await deleteDoc(doc(db, 'tasks', taskToDelete));
      setTasks(tasks.filter(task => task.id !== taskToDelete));
      setConfirmationDialog(false);  // Close the confirmation dialog after deleting
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Handle task editing
  const handleEditTask = (task) => {
    setTaskToEdit(task);  // Set the task being edited
  };

  return (
    <div className={`container mx-auto mt-10 px-4 sm:px-6 md:px-8 lg:px-10 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-zinc-300 text-black'}`}>
      <h1 className="text-3xl font-bold mb-6 text-center">Task Manager</h1>
      <button
        onClick={toggleDarkMode}
        className={`px-4 py-2 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} transition-colors mb-4`}
      >
        {isDarkMode ? 'Light' : 'Dark '}
      </button>



      {showEmployeeForm && (
        <AddEmployeeForm onEmployeeAdded={handleEmployeeAdded} />
      )}
      <TaskForm
        addOrUpdateTask={addOrUpdateTask}
        employees={employees}
        taskToEdit={taskToEdit}  // Pass the task being edited
      />
      <TaskFilter filter={filter} setFilter={setFilter} sortBy={sortBy} setSortBy={setSortBy} />
      <TaskList
        tasks={tasks}
        filter={filter}
        completeTask={completeTask}
        onDelete={confirmDeleteTask}
        editTask={handleEditTask}
        markPending={markPending}  // Pass markPending function to TaskList
      />
      <EmployeeProfiles employees={employees} />
      
      <button
        onClick={() => setShowEmployeeForm(!showEmployeeForm)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        {showEmployeeForm ? 'Hide Add Employee Form' : 'Show Add Employee Form'}
      </button>
      <ExcelUpload handleExcelDataSubmit={handleExcelDataSubmit} />
      <ConfirmationDialog
        isOpen={confirmationDialog}  // Control visibility of the dialog
        onConfirm={deleteTask}  // Confirm deletion
        onCancel={() => setConfirmationDialog(false)}  // Cancel deletion
      />
    </div>
  );
};

export default TaskManager;
