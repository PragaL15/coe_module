import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';

export default function FacultyRecordsTable() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from API
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/FacultyRecordsDisplay'); // Replace with your API endpoint
        setRecords(response.data);
      } catch (error) {
        console.error('Error fetching faculty records:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  // Status badge template
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

  // Get the date after 40 days from the deadline
  const getDayAfter40Days = (deadline) => {
    const deadlineDate = new Date(deadline);
    deadlineDate.setDate(deadlineDate.getDate() + 40); // Add 40 days to the deadline
    return deadlineDate.toLocaleDateString(); // Return in the default date format
  };

  // Custom header template for deadline
  const deadlineHeaderTemplate = () => {
    return "Deadline (in days)";
  };

  // Custom header for paper allocated column
  const paperAllocatedHeaderTemplate = () => {
    return "Papers Allocated";
  };

  return (
    <div className="text-sm w-9/10 ml-14 mt-7 justify-center">
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
        <Column body={(rowData) => `${rowData.deadline} days`} header={deadlineHeaderTemplate} className="border border-gray-300 text-sm" />
        <Column field="bce_id" header="BCE ID" className="border border-gray-300 text-sm" />
        <Column field="sem_code" header="Semester Code" className="border border-gray-300 text-sm" />
        <Column field="dept_name" header="Department Name" className="border border-gray-300 text-sm" />
        <Column body={statusBodyTemplate} header="Status" className="border border-gray-300 text-sm" />
      </DataTable>
    </div>
  );
}

export { FacultyRecordsTable as Table, FacultyRecordsTable as Logic };
