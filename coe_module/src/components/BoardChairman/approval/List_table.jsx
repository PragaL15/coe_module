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

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const facultyRequestResponse = await fetch("http://localhost:4000/api/FacultyGetApprove");
                if (!facultyRequestResponse.ok) {
                    throw new Error(`Failed to fetch faculty request data: ${facultyRequestResponse.statusText}`);
                }
                const facultyRequestData = await facultyRequestResponse.json();
                const facultyResponse = await fetch("http://localhost:4000/api/faculty");
                if (!facultyResponse.ok) {
                    throw new Error(`Failed to fetch faculty data: ${facultyResponse.statusText}`);
                }
                const facultyData = await facultyResponse.json();
                const combinedData = facultyRequestData.map((request) => {
                    const faculty = facultyData.find((f) => f.faculty_id === request.faculty_id);
                    return {
                        ...request,
                        faculty_name: faculty ? faculty.faculty_name : "N/A"
                    };
                });
                const courseResponse = await fetch("http://localhost:4000/api/courseOption");
                if (!courseResponse.ok) {
                    throw new Error(`Failed to fetch course data: ${courseResponse.statusText}`);
                }
                const courseData = await courseResponse.json();
                const finalCombinedData = combinedData.map((request) => {
                    const course = courseData.find((c) => c.course_id === request.course_id);
                    return {
                        ...request,
                        course_code: course ? course.course_code : "N/A"
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
    const handleApprovalUpdate = (id, status, remark = "") => {
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
    };
    if (loading) {
        return <div>Loading data...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }
    return (
        <div className="card ml-72 mt-16">
            <DataTable
                value={products}
                showGridlines
                tableStyle={{ minWidth: "30rem" }}
                paginator
                paginatorClassName="text-xs p-1"
                rows={5}
            >
                <Column field="id" header="S.No" className="text-sm mt-1 p-3 border border-gray-300"></Column>
                <Column field="faculty_name" header="Faculty Name" className="text-sm mt-1 p-3 border border-gray-300"></Column>
                <Column field="course_code" header="Course Code" className="text-sm mt-1 p-3 border border-gray-300"></Column>
                <Column field="sem_code" header="Semester Code" className="text-sm mt-1 p-3 border border-gray-300"></Column>
                <Column field="deadline_left" header="Deadline Left" className="text-sm mt-1 p-3 border border-gray-300"></Column>
                <Column
                    field="approval_status"
                    header="Approval Status"
                    className="text-sm mt-1 p-3 border border-gray-300"
                    body={(rowData) => (
                        <span
                            className={`px-2 py-1 rounded ${
                                rowData.approval_status === "Approved"
                                    ? "bg-green-200 text-green-700"
                                    : rowData.approval_status === "Declined"
                                    ? "bg-red-200 text-red-700"
                                    : "bg-gray-200 text-gray-700"
                            }`}
                        >
                            {rowData.approval_status === 1 ? "Approved" : rowData.approval_status === -1 ? "Declined" : "Initiated"}
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
