import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";

export default function FacultyPriceTable() {
  const [records, setRecords] = useState([
    {
      id: 1,
      faculty_id: 3,
      paper_corrected: 112,
      price: 10.5,
      amt_given: 1176,
    },
    {
      id: 2,
      faculty_id: 3,
      paper_corrected: 112,
      price: 10.5,
      amt_given: 1176,
    },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/PriceFaculty");
        if (Array.isArray(response.data)) {
          setRecords(response.data);
        } else {
          console.error("Unexpected API response format:", response.data);
          setRecords([]);
        }
      } catch (error) {
        if (error.response) {
          console.error("Backend responded with an error:", error.response.data);
        } else if (error.request) {
          console.error("No response from the server:", error.request);
        } else {
          console.error("Error setting up the request:", error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="text-sm md:w-9/10 w-4/5 md:p-0 p-2 ml-8 mt-11 justify-center">
      <h1 className="text-2xl font-bold mb-6">Price Calculation Details</h1>
      <DataTable
        value={records}
        paginator
        rows={5}
        className="border border-gray-300 rounded-md"
        loading={loading}
        responsiveLayout="scroll"
      >
        <Column field="id" header="ID" className="border border-gray-300 text-sm" />
        <Column field="faculty_id" header="Faculty ID" className="border border-gray-300 text-sm" />
        <Column field="paper_corrected" header="Papers Corrected" className="border border-gray-300 text-sm" />
        <Column
          field="price"
          header="Price per Paper"
          body={(rowData) => rowData.price.toFixed(2)}
          className="border border-gray-300 text-sm"
        />
        <Column
          field="amt_given"
          header="Amount Given"
          body={(rowData) => rowData.amt_given.toFixed(2)}
          className="border border-gray-300 text-sm"
        />
      </DataTable>
    </div>
  );
}
