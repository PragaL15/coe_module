import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import ViewRecord from "../approval/view";

export default function ListTables() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showViewComponent, setShowViewComponent] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  // Fetch all data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch faculty request data
        const facultyRequestResponse = await fetch(
          "http://localhost:4000/api/FacultyGetApprove"
        );
        if (!facultyRequestResponse.ok) {
          throw new Error(`Error fetching faculty requests: ${facultyRequestResponse.statusText}`);
        }
        const facultyRequestData = await facultyRequestResponse.json();

        // Fetch faculty data
        const facultyResponse = await fetch("http://localhost:4000/api/faculty");
        if (!facultyResponse.ok) {
          throw new Error(`Error fetching faculty data: ${facultyResponse.statusText}`);
        }
        const facultyData = await facultyResponse.json();

        // Combine faculty data with requests
        const combinedData = facultyRequestData.map((request) => {
          const faculty = facultyData.find((f) => f.faculty_id === request.faculty_id);
          return {
            ...request,
            faculty_name: faculty ? faculty.faculty_name : "Riya",
          };
        });

        // Fetch course data
        const courseResponse = await fetch("http://localhost:4000/api/courseOption");
        if (!courseResponse.ok) {
          throw new Error(`Error fetching course data: ${courseResponse.statusText}`);
        }
        const courseData = await courseResponse.json();

        // Combine course data with the requests
        const finalCombinedData = combinedData.map((request) => {
          const course = courseData.find((c) => c.course_id === request.course_id);
          return {
            ...request,
            course_code: course ? course.course_code : "N/A",
          };
        });

        setProducts(finalCombinedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onViewClick = (rowData) => {
    setSelectedRowData(rowData);
    setShowViewComponent(true);
  };

  const onHideView = () => {
    setShowViewComponent(false);
    setSelectedRowData(null);
  };

  const handleApprovalUpdate = async (id, status, remark = "") => {
    try {
      const response = await fetch(`http://localhost:4000/api/updateApproval/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status, remark }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update approval: ${response.statusText}`);
      }

      const updatedData = await response.json();

      // Update the local state with the new status and remarks
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id
            ? {
                ...product,
                approval_status: status === 1 ? "Approved" : "Declined",
                remarks: status === -1 ? remark : product.remarks,
              }
            : product
        )
      );
    } catch (err) {
      setError(`Error updating approval: ${err.message}`);
    }
  };

  if (loading) {
    return <div>Loading data...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="card md:ml-60 w-4/5 ml-7 mt-16 bg-mild-bg mb-72">
      <DataTable
        value={products}
        showGridlines
        tableStyle={{ minWidth: "30rem" }}
        paginator
        paginatorClassName="text-xs p-1"
        rows={3}
        className="border border-2 rounded-md"
      >
        <Column
          field="id"
          header="S.No"
          className="text-sm mt-1 p-3 border border-gray-300"
        />
        <Column
          field="faculty_name"
          header="Faculty Name"
          className="text-sm mt-1 p-3 border border-gray-300"
        />
        <Column
          field="course_code"
          header="Course Code"
          className="text-sm mt-1 p-3 border border-gray-300"
        />
        <Column
          field="sem_code"
          header="Semester Code"
          className="text-sm mt-1 p-3 border border-gray-300"
        />
        <Column
          field="deadline_left"
          header="Deadline Left"
          className="text-sm mt-1 p-3 border border-gray-300"
        />
        <Column
  field="approval_status"
  header="Approval Status"
  className="text-sm mt-1 p-3 border border-gray-300"
  body={(rowData) => (
    <span
      className={`px-2 py-1 rounded text-white ${
        rowData.approval_status === 1
          ? "bg-green-500"
          : rowData.approval_status === -1
          ? "bg-red-500"
          : "bg-blue-500"
      }`}
    >
      {rowData.approval_status === 1
        ? "Approved"
        : rowData.approval_status === -1
        ? "Declined"
        : "Initiated"}
    </span>
  )}
/>

        <Column
          header="View"
          className="text-sm mt-1 p-3 border border-gray-300"
          body={(rowData) => (
            <Button
              label="View"
              icon="pi pi-eye"
              className="p-button-primary"
              onClick={() => onViewClick(rowData)}
            />
          )}
        />
      </DataTable>
      {selectedRowData && (
        <ViewRecord
          data={selectedRowData}
          visible={showViewComponent}
          onHide={onHideView}
          onApproval={(status, remark) =>
            handleApprovalUpdate(selectedRowData.id, status, remark)
          }
        />
      )}
    </div>
  );
}
