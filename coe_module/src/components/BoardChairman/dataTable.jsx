import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

export default function BoardTable() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetching dummy data for demonstration
        const dummyData = [
            { facultyName: 'John Doe', paperCount: 5, courseCode: 'CS101' },
            { facultyName: 'Jane Smith', paperCount: 30, courseCode: 'IT202' },
            { facultyName: 'Alice Johnson', paperCount: 79, courseCode: 'ENG303' },
            { facultyName: 'Bob Brown', paperCount: 151, courseCode: 'MATH404' }
        ];
        setProducts(dummyData);
    }, []);

    const statusBodyTemplate = (rowData) => {
      const getClassName = (paperCount) => {
          switch (true) {
              case paperCount <= 20:
                  return 'bg-red-500 text-white';
              case paperCount <= 60:
                  return 'bg-orange-600 text-white'; 
              case paperCount <= 100:
                  return 'bg-yellow-500 text-white';
              case paperCount <= 150:
                  return 'bg-green-500 text-white';
              case paperCount >= 151:
                  return 'bg-blue-500 text-white';
              default:
                  return 'bg-gray-500 text-white'; 
          }
      };
      return (
          <button
              className={`px-4 py-2 rounded-lg ${getClassName(rowData.paperCount)} font-semibold`}
          >
              {rowData.paperCount}
          </button>
      );
  };

  const [first, setFirst] = useState(0);
  const rows = 2;
  const onPageChange = (event) => {
    setFirst(event.first);
};

    return (
        <div className="card ml-56 mt-8 p-2 w-3/5 text-sm">
            <DataTable value={products}  first={first} 
          rows={rows} 
          paginator className="w-4/6">
                <Column field="facultyName" header="Faculty Name"  className=" text-sm"></Column>
                <Column body={statusBodyTemplate} header="Paper Count"  className="text-sm"></Column>
                <Column field="courseCode" header="Course Code"  className="text-sm"></Column>
            </DataTable>
        </div>
    );
}
