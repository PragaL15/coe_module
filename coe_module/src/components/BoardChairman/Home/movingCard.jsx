import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { Tag } from 'primereact/tag';
import { Carousel } from 'primereact/carousel';

export default function MovingCard() {
  const [products, setProducts] = useState([]);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const facultyGetApproveResponse = await fetch("http://localhost:4000/api/FacultyGetApprove");
        if (!facultyGetApproveResponse.ok) {
          throw new Error(`Failed to fetch faculty get approve data: ${facultyGetApproveResponse.statusText}`);
        }
        const facultyGetApproveData = await facultyGetApproveResponse.json();

        const facultyResponse = await fetch("http://localhost:4000/api/faculty");
        if (!facultyResponse.ok) {
          throw new Error(`Failed to fetch faculty data: ${facultyResponse.statusText}`);
        }
        const facultyData = await facultyResponse.json();

        const courseResponse = await fetch("http://localhost:4000/api/courseOption");
        if (!courseResponse.ok) {
          throw new Error(`Failed to fetch course data: ${courseResponse.statusText}`);
        }
        const courseData = await courseResponse.json();

        const combinedData = facultyGetApproveData.map((request) => {
          const faculty = facultyData.find((f) => f.faculty_id === request.faculty_id);
          const course = courseData.find((c) => c.course_id === request.course_id);
          return {
            ...request,
            faculty_name: faculty ? faculty.faculty_name : "N/A",
            courseCode: course ? course.course_code : "N/A"
          };
        });

        setProducts(combinedData);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();

    const interval = setInterval(() => {
      setCurrentProductIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const productTemplate = (product) => {
    return (
      <div className="border-1 surface-border border-round text-center py-2 bg-card-background">
        <div>
          <h4 className="mb-1"><strong>Faculty Name:</strong> {product.faculty_name}</h4>
          <h4 className="mb-1"><strong>Deadline Left:</strong> {product.deadline_left}</h4>
          <h4 className="mb-1"><strong>Course Code:</strong> {product.courseCode}</h4>
          <h6 className="mt-0 mb-3"><strong>Pending Papers:</strong> {product.papers_left}</h6>
          <Tag value={product.approval_status === 1 ? "Approved" : product.approval_status === -1 ? "Rejected" : "Initiated"} severity={getSeverity(product)}></Tag>
        </div>
      </div>
    );
  };

  const getSeverity = (product) => {
    switch (product.approval_status) {  
      case 1:
        return 'success';  
      case -1:
        return 'danger';  
      case 0:
        return 'warning';  
      default:
        return null;
    }
  };

  if (products.length === 0) {
    return <div>Loading data...</div>;
  }

  return (
    <div className="card ml-72 w-4/5 mt-9 flex justify-center bg-card-background">
      <Card className='bg-card-background'>
        <Splitter style={{ height: '110px' }}>
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
