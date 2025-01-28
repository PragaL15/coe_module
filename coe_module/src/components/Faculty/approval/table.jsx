import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function ApprovalStatus({ currentProduct }) {
  const products = [
    {
      id: 1,
      dateSubmitted: '2025-01-15',
      papers: 12,
      deadline: '2025-01-25',
      facultyName: 'Dr.R.Gomathi',
      courseCode: 'ENG101',
      semesterCode: 'CS103',
      reason: 'Research dev Review',
      status: 'Rejected',
      remarks: 'Not valid enough',
    }
  ];

  const statusBodyTemplate = (rowData) => {
    const getClassName = (status) => {
      switch (status) {
        case 'Rejected':
          return 'bg-red-500 text-white';
        case 'Approved':
          return 'bg-green-500 text-white';
        case 'Initiated':
          return 'bg-blue-500 text-white';
        default:
          return 'bg-gray-500 text-white';
      }
    };
    return (
      <button className={`px-3 py-1 rounded ${getClassName(rowData.status)}`}>
        {rowData.status}
      </button>
    );
  };

  // If `currentProduct` exists and matches, display it; otherwise, show all products.
  const filteredProducts = currentProduct
    ? products.filter((product) => product.id === currentProduct.id)
    : products;

  return (
    <div className="text-sm md:w-4/5 md:ml-14 mt-7 justify-center">
      <DataTable
        value={filteredProducts}
        paginator
        paginatorClassName="text-xxs p-1" 
        rows={2}
        className="border border-gray-300 rounded-md"
      >
        <Column field="facultyName" header="Faculty Name" className="border border-gray-300 text-sm" />
        <Column field="courseCode" header="Course Code" className="border border-gray-300 text-sm" />
        <Column field="semesterCode" header="Semester Code" className="border border-gray-300 text-sm" />
        <Column field="reason" header="Reason" className="border border-gray-300 text-sm" />
        <Column field="dateSubmitted" header="Date Submitted" className="border border-gray-300 text-sm" />
        <Column field="status" body={statusBodyTemplate} header="Status" className="border border-gray-300 text-sm" />
        <Column field="remarks" header="Remarks" className="border border-gray-300 text-sm" />
      </DataTable>
    </div>
  );
}

export { ApprovalStatus as Table, ApprovalStatus as Logic };
