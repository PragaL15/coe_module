import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import FacImg from '../../../public/login.png'; // Adjust path as needed

export default function MovingCard() {
  const products = [
    {
      id: 0,
      dateSubmitted: '2025-01-15',
      papers: 20,
      deadline: '2025-01-25',
      facultyName: 'Mano',
      courseCode: 'CS101',
      semesterCode: 'S1',
      reason: 'Research Review',
      status: 'Rejected',
      remarks: 'Review failed',
    },
    {
      id: 1,
      dateSubmitted: '2025-01-16',
      papers: 15,
      deadline: '2025-01-30',
      facultyName: 'Kani',
      courseCode: 'IT202',
      semesterCode: 'S2',
      reason: 'Exam Preparation',
      status: 'Approved',
      remarks: 'Successfully processed',
    },
    {
      id: 2,
      dateSubmitted: '2025-01-17',
      papers: 10,
      deadline: '2025-01-28',
      facultyName: 'Vidya',
      courseCode: 'ENG303',
      semesterCode: 'S3',
      reason: 'Project Work',
      status: 'Initiated',
      remarks: 'Processing started',
    },
  ];

  const [currentProduct, setCurrentProduct] = useState(products[0]);

  const getNextProduct = (currentId) => {
    const nextIndex = (currentId + 1) % products.length; // Move to the next product cyclically
    return products[nextIndex];
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProduct((prevProduct) => getNextProduct(prevProduct.id));
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval); // Cleanup the interval
  }, []); // Empty dependency ensures it runs only once on mount

  return (
    <div className="card ml-56 w-3/5 mt-9 flex justify-center">
      <Card>
        <div>
          <Splitter style={{ height: '110px' }}>
            <SplitterPanel
              className="flex flex-col items-center justify-center"
              size={25}
              minSize={10}
            >
              <img src={FacImg} alt="Faculty" className="w-full h-auto" />
              <h1 className="mt-4">Welcome to Faculty Panel</h1>
            </SplitterPanel>
            <SplitterPanel
              className="flex flex-col items-center justify-center"
              size={75}
            >
              <p>Faculty Name: {currentProduct.facultyName}</p>
              <p>Course Code: {currentProduct.courseCode}</p>
              <p>Semester Code: {currentProduct.semesterCode}</p>
              <p>Reason: {currentProduct.reason}</p>
            </SplitterPanel>
          </Splitter>
        </div>
      </Card>
    </div>
  );
}
