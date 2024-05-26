import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import Loader from './Loader';
import { toast } from 'react-toastify';
import '../css/ReadExcel.css';

const ReadExcel = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileUpload = (e) => {
    setError(null);
    setLoading(true);
    const file = e.target.files[0];

    if (!file) {
      setError('No file selected');
      setLoading(false);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const arrayBuffer = e.target.result;
        const data = new Uint8Array(arrayBuffer);
        const binaryStr = data.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
        const workbook = XLSX.read(binaryStr, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet);
        setData(parsedData);
      } catch (error) {
        setError('Error reading file');
      }
      setLoading(false);
    };

    reader.onerror = () => {
      setError('Error reading file');
      setLoading(false);
    };

    reader.readAsArrayBuffer(file);
  };

  const generatePdfForAllStudents = () => {
    const doc = new jsPDF();

    data.forEach((student, index) => {
      if (index > 0) doc.addPage();

      const totalMarks = parseFloat(student.MATHEMATICS) + parseFloat(student.SCIENCE) + parseFloat(student.ENGLISH) + parseFloat(student.ECONOMICS);
      const percentage = (totalMarks / 400) * 100;
      const pass = totalMarks >= 200;

      doc.setFontSize(18);
      doc.text('Student Marksheet', 75, 10);
      doc.setLineWidth(0.5);
      doc.line(10, 12, 200, 12);

      doc.setFontSize(12);
      doc.text(`Name: ${student.NAME}`, 10, 20);
      doc.text(`Roll Number: ${student['ROLL NO.']}`, 10, 30);
      doc.text(`Class: ${student.CLASS}`, 10, 40);

      doc.line(10, 42, 200, 42);

      doc.text(`Subject`, 10, 50);
      doc.text(`Marks`, 180, 50);

      doc.text(`Mathematics`, 10, 60);
      doc.text(`${student.MATHEMATICS}`, 180, 60);

      doc.text(`Science`, 10, 70);
      doc.text(`${student.SCIENCE}`, 180, 70);

      doc.text(`English`, 10, 80);
      doc.text(`${student.ENGLISH}`, 180, 80);

      doc.text(`Economics`, 10, 90);
      doc.text(`${student.ECONOMICS}`, 180, 90);

      doc.line(10, 92, 200, 92);

      doc.text(`Total Marks: ${totalMarks}`, 10, 100);
      doc.text(`Obtained Percentage: ${percentage.toFixed(2)}%`, 10, 110);

      doc.text(`Result: ${pass ? 'Passed' : 'Failed'}`, 10, 120);
    });

    doc.save('Students_Marksheets.pdf');
    setLoading(false);
    toast.success('PDF created successfully');
  };

  return (
    <div className="realexcel-main-div">
      <div className="file-upload">
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          className="file-input"
        />
        {loading && <p className="loading-text">Loading...</p>}
        {error && <p className="error-text">{error}</p>}
      </div>

      {data.length > 0 && (
        <>
          <table className="data-table">
            <thead>
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, idx) => (
                    <td key={idx}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <button className='btn btn-success fw-bold w-100 mt-3' onClick={generatePdfForAllStudents}>Generate Pdf</button>
        </>
      )}
    </div>
  );
};

export default ReadExcel;
