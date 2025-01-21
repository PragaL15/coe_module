import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Paginator } from 'primereact/paginator';

export default function BasicDemo() {
    const [products, setProducts] = useState([
        {
            id: 1,
            dateSubmitted: '2025-01-15',
            papers: 20,
            deadline: '2025-01-25',
            status: 'Rejected',
            remarks: 'Review failed',
        },
        {
            id: 2,
            dateSubmitted: '2025-01-16',
            papers: 15,
            deadline: '2025-01-30',
            status: 'Approved',
            remarks: 'Successfully processed',
        },
        {
            id: 3,
            dateSubmitted: '2025-01-17',
            papers: 10,
            deadline: '2025-01-28',
            status: 'Initiated',
            remarks: 'Processing started',
        },
    ]);

    const [first, setFirst] = useState(0);
    const rows = 2;

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
            <button
                className={`px-3 py-1 rounded ${getClassName(rowData.status)}`}
            >
                {rowData.status}
            </button>
        );
    };

    const onPageChange = (event) => {
        setFirst(event.first);
    };

    return (
      <div className="card text-sm">
          <DataTable 
              value={products} 
              tableStyle={{ minWidth: '20rem' }} 
              first={first} 
              rows={rows} 
              paginator 
              className="p-4"
          >
              <Column 
                  field="dateSubmitted" 
                  header="Date Submitted" 
                  className="border border-gray-300 text-sm"
              ></Column>
              <Column 
                  field="papers" 
                  header="No. of Papers" 
                  className="border border-gray-300 text-sm"
              ></Column>
              <Column 
                  field="deadline" 
                  header="Deadline" 
                  className="border border-gray-300 text-sm"
              ></Column>
              <Column 
                  body={statusBodyTemplate} 
                  header="Status" 
                  className="border border-gray-300 text-sm"
              ></Column>
              <Column 
                  field="remarks" 
                  header="Remarks" 
                  className="border border-gray-300 text-sm"
              ></Column>
          </DataTable>
      </div>
    );
}
