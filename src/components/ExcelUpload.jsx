import React, { useState } from 'react';
import ExcelJS from 'exceljs';

const ExcelUpload = ({ handleExcelDataSubmit }) => {
  const [excelData, setExcelData] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      const arrayBuffer = e.target.result;
      const workbook = new ExcelJS.Workbook();

      try {
        await workbook.xlsx.load(arrayBuffer); // Load the Excel workbook
        const worksheet = workbook.worksheets[0]; // Get the first worksheet
        const parsedData = [];
        
        // Iterate through each row in the worksheet
        worksheet.eachRow((row, rowNumber) => {
          const rowValues = row.values.slice(1); // Extracting row values, slice to remove empty first cell
          // Push only rows with meaningful data
          if (rowValues.some(value => value)) {
            parsedData.push({
              taskName: rowValues[0] || '',
              priority: rowValues[1] || '',
              assignedTo: rowValues[2] || '',
              notes: rowValues[3] || '',
              status: 'Pending', // Default status for new tasks
            });
          }
        });

        setExcelData(parsedData); // Set the parsed data into state
      } catch (error) {
        console.error('Error loading Excel file:', error);
      }
    };

    reader.readAsArrayBuffer(file); // Read the uploaded file as an ArrayBuffer
  };

  const handleAddToTasks = () => {
    if (excelData.length > 0) {
      handleExcelDataSubmit(excelData); // Pass the data to the parent component
      setExcelData([]); // Clear the local state
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Upload Excel File</h2>
      <input type="file" onChange={handleFileUpload} className="mb-4" />

      {/* Display Excel Data */}
      {excelData.length > 0 && (
        <div>
          <h3 className="text-lg font-bold mb-2">Uploaded Excel Data:</h3>
          <table className="table-auto w-full text-left">
            <thead>
              <tr>
                <th className="border px-4 py-2">Task Name</th>
                <th className="border px-4 py-2">Priority</th>
                <th className="border px-4 py-2">Assigned To</th>
                <th className="border px-4 py-2">Notes</th>
              </tr>
            </thead>
            <tbody>
              {excelData.map((row, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{row.taskName}</td>
                  <td className="border px-4 py-2">{row.priority}</td>
                  <td className="border px-4 py-2">{row.assignedTo}</td>
                  <td className="border px-4 py-2">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add to Tasks Button */}
      {excelData.length > 0 && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          onClick={handleAddToTasks}
        >
          Add to Tasks
        </button>
      )}
    </div>
  );
};

export default ExcelUpload;
