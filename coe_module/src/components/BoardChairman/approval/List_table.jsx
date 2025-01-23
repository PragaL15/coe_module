import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import ViewRecord from "../approval/view";

export default function List_tables() {
    const [products, setProducts] = useState([]);
    const [showViewComponent, setShowViewComponent] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null);

    useEffect(() => {
        const sampleData = [
            {
                id: 1,
                faculty_name: "Ram",
                course_code: "CS101",
                sem_code: "Fall2024",
                date_submitted: "2024-12-01",
                deadline_left: "10 days",
                remarks: "Pending papers approval.",
                sem_academic_year: "2024-2025",
            },
            {
                id: 2,
                faculty_name: "Kavin",
                course_code: "MA102",
                sem_code: "Spring2025",
                date_submitted: "2025-01-15",
                deadline_left: "2 days",
                remarks: "Urgent approval needed.",
                sem_academic_year: "2024-2025",
            },
        ];
        setProducts(sampleData);
    }, []);

    const onViewClick = (rowData) => {
        setSelectedRowData(rowData);
        setShowViewComponent(true);
    };

    const onHideView = () => {
        setShowViewComponent(false);
        setSelectedRowData(null);
    };

    return (
        <div className="card">
            <DataTable
                value={products}
                showGridlines
                tableStyle={{ minWidth: "30rem" }}
                paginator
                rows={5}
            >
                <Column field="id" header="S.No"></Column>
                <Column field="faculty_name" header="Faculty Name"></Column>
                <Column field="course_code" header="Course Code"></Column>
                <Column field="sem_code" header="Semester Code"></Column>
                <Column field="date_submitted" header="Date Submitted"></Column>
                <Column field="deadline_left" header="Deadline Left"></Column>
                <Column
                    header="View"
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
                />
            )}
        </div>
    );
}
