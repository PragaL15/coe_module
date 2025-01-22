import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

export default function BoardTable() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetching dummy data for demonstration
    const dummyData = [
      {
        facultyName: "John Doe",
        paperCount: 5,
        courseCode: "CS101",
        semcode: "2",
      },
      {
        facultyName: "Jane Smith",
        paperCount: 30,
        courseCode: "IT202",
        semcode: "4",
      },
      {
        facultyName: "Alice Johnson",
        paperCount: 79,
        courseCode: "ENG303",
        semcode: "2",
      },
      {
        facultyName: "Bob Brown",
        paperCount: 151,
        courseCode: "MATH404",
        semcode: "6",
      },
    ];
    setProducts(dummyData);
  }, []);

  const statusBodyTemplate = (rowData) => {
    const getClassName = (paperCount) => {
      switch (true) {
        case paperCount <= 20:
          return "bg-red-500 text-white";
        case paperCount <= 60:
          return "bg-orange-600 text-white";
        case paperCount <= 100:
          return "bg-yellow-500 text-white";
        case paperCount <= 150:
          return "bg-green-500 text-white";
        case paperCount >= 151:
          return "bg-blue-500 text-white";
        default:
          return "bg-gray-500 text-white";
      }
    };
    return (
      <button
        className={`px-4 py-2 rounded-lg ${getClassName(
          rowData.paperCount
        )} font-semibold`}
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
    <div className="card ml-64 mt-8 p-2 w-4/5 text-sm">
      <DataTable
        value={products}
        first={first}
        rows={rows}
        paginator
        className="w-3/4 text-sm"
        paginatorClassName="text-xs p-1" 
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
      >
        <Column
          field="facultyName"
          header="Faculty Name"
          className="text-sm mt-1 p-3 border border-gray-300"
        ></Column>
        <Column
          body={statusBodyTemplate}
          header="Paper Count"
          className="text-sm mt-1 p-3 border border-gray-300"
        ></Column>
        <Column
          field="courseCode"
          header="Course Code"
          className="text-sm mt-1 p-3 border border-gray-300"
        ></Column>
        <Column
          field="semcode"
          header="Semester Code"
          className="text-smtext-sm mt-1 p-3 border border-gray-300"
        ></Column>
      </DataTable>
    </div>
  );
}
