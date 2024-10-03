import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const ExcelUpload = ({ handleExcelDataSubmit }) => {
  const [excelData, setExcelData] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const parsedData = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(parsedData); // Store parsed data for display and task creation
    };

    reader.readAsBinaryString(file);
  };

  const handleAddToTasks = () => {
    if (excelData.length > 0) {
      handleExcelDataSubmit(excelData);  // Submit the Excel data to Firestore
      setExcelData([]);  // Clear the data after submitting
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
                {Object.keys(excelData[0]).map((key) => (
                  <th key={key} className="border px-4 py-2">{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {excelData.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, i) => (
                    <td key={i} className="border px-4 py-2">{value}</td>
                  ))}
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
          Add to Task
        </button>
      )}
    </div>
  );
};

export default ExcelUpload;
