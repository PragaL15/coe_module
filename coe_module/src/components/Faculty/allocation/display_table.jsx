import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';

export default function FacultyRecordsTable() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const token = document.cookie
          .split('; ')
          .find((row) => row.startsWith('auth_token='))
          ?.split('=')[1];

        if (!token) {
          console.error('Authorization token not found');
          return;
        }

        const response = await axios.get('http://localhost:4000/api/FacultyRecordsDisplay', {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });

        setRecords(response.data);
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

    fetchRecords();
  }, []);

  const statusBodyTemplate = (rowData) => {
    const getClassName = (status) => {
      switch (status) {
        case 1:
          return 'bg-green-500 text-white';
        case 0:
          return 'bg-red-500 text-white';
        default:
          return 'bg-gray-500 text-white';
      }
    };
    return (
      <span className={`px-3 py-1 rounded ${getClassName(rowData.status)}`}>
        {rowData.status === 1 ? 'Approved' : rowData.status === 0 ? 'Rejected' : 'Pending'}
      </span>
    );
  };

  return (
    <div className="text-sm md:w-9/10 w-4/5 md:p-0 p-2 ml-14 mt-7 justify-center">
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
        <Column field="course_name" header="Course Name" className="border border-gray-300 text-sm" />
        <Column body={(rowData) => `${rowData.paper_allocated} papers`} header="Papers Allocated" className="border border-gray-300 text-sm" />
        <Column body={(rowData) => `${rowData.deadline} days`} header="Deadline (in days)" className="border border-gray-300 text-sm" />
        <Column field="bce_id" header="BCE ID" className="border border-gray-300 text-sm" />
        <Column field="sem_code" header="Semester Code" className="border border-gray-300 text-sm" />
        <Column field="dept_name" header="Department Name" className="border border-gray-300 text-sm" />
        <Column body={statusBodyTemplate} header="Status" className="border border-gray-300 text-sm" />
      </DataTable>
    </div>
  );
}
