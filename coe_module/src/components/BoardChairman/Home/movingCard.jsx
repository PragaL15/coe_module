import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import FacImg from '../../../../public/login.png'; 
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Carousel } from 'primereact/carousel';

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

export default function MovingCard() {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  const getNextProduct = () => {
    setCurrentProductIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getNextProduct();
    }, 3000); 

    return () => clearInterval(interval); 
  }, []);

  const productTemplate = (product) => {
    return (
      <div className="border-1 surface-border border-round text-center py-2 bg-card-background">
        <div>
          <h4 className="mb-1"><strong>Faculty Name:</strong>{product.facultyName}</h4>
          <h4 className="mb-1"><strong>Deadline:</strong>{product.deadline}</h4>
          <h4 className="mb-1"><strong>Course Code:</strong>{product.courseCode}</h4>
          <h6 className="mt-0 mb-3"><strong>Pending Papers:</strong>{product.papers}</h6>
          <Tag value={product.status} severity={getSeverity(product)}></Tag>
        </div>
      </div>
    );
  };

  const getSeverity = (product) => {
    switch (product.status) {
      case 'Rejected':
        return 'danger';
      case 'Approved':
        return 'success';
      case 'Initiated':
        return 'warning';
      default:
        return null;
    }
  };

  return (
    <div className="card ml-72 w-4/5  mt-9 flex justify-center bg-card-background ">
      <Card className='bg-card-background'>
        <Splitter style={{ height: '110px'}}>
          <SplitterPanel
            className="flex flex-col items-center justify-center static bg-card-background"
            size={60}
          >
            <Carousel value={products} numVisible={1} numScroll={1} circular autoplayInterval={3000} itemTemplate={productTemplate} />
          </SplitterPanel>
        </Splitter>
      </Card>
    </div>
  );
}
