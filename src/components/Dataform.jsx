import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import Loader from './Loader';
import { toast } from 'react-toastify';
import '../css/Dataform.css';

const Dataform = () => {
  const [loading, setLoading] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [mathMarks, setMathMarks] = useState('');
  const [scienceMarks, setScienceMarks] = useState('');
  const [englishMarks, setEnglishMarks] = useState('');
  const [economicsMarks, setEconomicsMarks] = useState('');

  const generatePdf = () => {
    if (
      studentName === '' ||
      rollNo === '' ||
      studentClass === '' ||
      mathMarks === '' ||
      scienceMarks === '' ||
      englishMarks === '' ||
      economicsMarks === ''
    ) {
      toast.error('Please fill all the fields');
      return;
    }

    setLoading(true);
    try{
    const doc = new jsPDF();
    const totalMarks = parseFloat(mathMarks) + parseFloat(scienceMarks) + parseFloat(englishMarks) + parseFloat(economicsMarks);
    const percentage = (totalMarks / 400) * 100;
    const pass = totalMarks >= 200;

    doc.setFontSize(18);
    doc.text('Student Marksheet', 75, 10);
    
    doc.setLineWidth(0.5);
    doc.line(10, 12, 200, 12);

    doc.setFontSize(12);
    doc.text(`Name: ${studentName}`, 10, 20);
    doc.text(`Roll Number: ${rollNo}`, 10, 30);
    doc.text(`Class: ${studentClass}`, 10, 40);
    

    doc.line(10, 42, 200, 42);

    doc.text(`Subject`, 10, 50);
    doc.text(`Marks`,180, 50);

    doc.text(`Mathematics`, 10, 60);
    doc.text(`${mathMarks}`, 180, 60);

    doc.text(`Science`, 10, 70);
    doc.text(`${scienceMarks}`, 180, 70);

    doc.text(`English`, 10, 80);
    doc.text(`${englishMarks}`, 180, 80);

    doc.text(`Economics`, 10, 90);
    doc.text(`${economicsMarks}`, 180, 90);

    doc.line(10, 92, 200, 92);

    doc.text(`Total Marks: ${totalMarks}`, 10, 100);
    doc.text(`Obtained Percentage: ${percentage.toFixed(2)}%`, 10, 110);
    
    doc.text(`Result: ${pass ? 'Passed' : 'Failed'}`, 10, 120);
    
    doc.save(`${studentName}_marksheet.pdf`);
    toast.success('Pdf created suucessfully');
    setStudentName('');
    setStudentClass('');
    setEconomicsMarks('');
    setEnglishMarks('');
    setMathMarks('');
    setScienceMarks('');
    setRollNo('');
    setLoading(false);
    }
    catch(error){
     toast.error('Pdf created failed')
    }
  };

  return (
    <div className='marksheet-form'>
    <div className='data-input-container'>
      <div className='text-center data-heading'>Fill Student Details</div>
      <div className='data-fields'>
        <div className='mb-3'>
          <label htmlFor="studentName" className="form-label">Student Name</label>
          <input type="text" id="studentName" value={studentName} onChange={(e) => setStudentName(e.target.value)} className="form-control" />
        </div>
        <div className='mb-3'>
          <label htmlFor="rollNo" className="form-label">Roll No.</label>
          <input type="text" id="rollNo" value={rollNo} onChange={(e) => setRollNo(e.target.value)} className="form-control" />
        </div>
        <div className='mb-3'>
          <label htmlFor="studentClass" className="form-label">Class</label>
          <input type="text" id="studentClass" value={studentClass} onChange={(e) => setStudentClass(e.target.value)} className="form-control" />
        </div>
        <div className='mb-3'>
          <label htmlFor="mathMarks" className="form-label">Mathematics</label>
          <input type="text" id="mathMarks" value={mathMarks} onChange={(e) => setMathMarks(e.target.value)} className="form-control" />
        </div>
        <div className='mb-3'>
          <label htmlFor="scienceMarks" className="form-label">Science</label>
          <input type="text" id="scienceMarks" value={scienceMarks} onChange={(e) => setScienceMarks(e.target.value)} className="form-control" />
        </div>
        <div className='mb-3'>
          <label htmlFor="englishMarks" className="form-label">English</label>
          <input type="text" id="englishMarks" value={englishMarks} onChange={(e) => setEnglishMarks(e.target.value)} className="form-control" />
        </div>
        <div className='mb-3'>
          <label htmlFor="economicsMarks" className="form-label">Economics</label>
          <input type="text" id="economicsMarks" value={economicsMarks} onChange={(e) => setEconomicsMarks(e.target.value)} className="form-control" />
        </div>
      </div>
      {loading && <Loader />}
      <button className='btn btn-success fw-bold w-100' onClick={generatePdf}>Generate MarkSheet</button>
    </div>
    </div>
  );
};

export default Dataform;
