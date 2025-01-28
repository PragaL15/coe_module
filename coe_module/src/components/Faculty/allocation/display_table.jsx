import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';

export default function FacultyRecordsTable() {
  const [records, setRecords] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recordsResponse = await axios.get('http://localhost:4000/api/FacultyRecordsDisplay');
        setRecords(recordsResponse.data);

        const coursesResponse = await axios.get('http://localhost:4000/api/courseOption');
        setCourses(coursesResponse.data);
      } catch (error) {
        if (error.response) {
          console.error('Backend responded with an error:', error.response.data);
        } else if (error.request) {
          console.error('No response from the server:', error.request);
        } else {
          console.error('Error setting up the request:', error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const getCourseName = (courseId) => {
    const course = courses.find(course => course.course_id === courseId);
    return course ? course.course_name : 'Course Not Found';
  };

  return (
    <div className="text-sm md:w-9/10 w-4/5 md:p-0 p-2 ml-8 mt-7 justify-center">
      <h1 className="text-2xl font-bold mb-6">Details of Paper Listed</h1>
      <DataTable
        value={records}
        paginator
        paginatorClassName="text-xxs p-1"
        rows={3}
        className="border border-gray-300 rounded-md"
        loading={loading}
        responsiveLayout="scroll"
      >
        <Column field="faculty_id" header="Faculty ID" className="border border-gray-300 text-sm" />
        <Column field="course_id" header="Course Name" body={(rowData) => getCourseName(rowData.course_id)} className="border border-gray-300 text-sm" />
        <Column body={(rowData) => `${rowData.paper_allocated} papers`} header="Papers Allocated" className="border border-gray-300 text-sm" />
        <Column body={(rowData) => `${rowData.deadline} days`} header="Deadline (in days)" className="border border-gray-300 text-sm" />
        <Column field="bce_id" header="BCE ID" className="border border-gray-300 text-sm" />
        <Column field="sem_code" header="Semester Code" className="border border-gray-300 text-sm" />
      </DataTable>
    </div>
  );
}
