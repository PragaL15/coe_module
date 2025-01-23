import React from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

export default function ViewRecord({ data, visible, onHide }) {
    const [approvalStatus, setApprovalStatus] = React.useState(0); // 0: default, 1: approved, -1: declined

    const footerContent = (
        <div className="flex justify-content-between">
            <Button
                label="Accept"
                icon="pi pi-check"
                onClick={() => handleApproval(1)}
                className="p-button-success"
            />
            <Button
                label="Decline"
                icon="pi pi-times"
                onClick={() => handleApproval(-1)}
                className="p-button-danger"
            />
            <Button
                label="Close"
                icon="pi pi-times"
                onClick={onHide}
                className="p-button-text"
            />
        </div>
    );

    const handleApproval = (status) => {
        setApprovalStatus(status);
        console.log("Approval Status:", status, "for", data.faculty_name);
        onHide(); // Close the dialog
    };

    return (
        <Dialog
            header="Faculty Record"
            visible={visible}
            style={{ width: "50vw" }}
            footer={footerContent}
            onHide={onHide}
        >
            <div>
                <p><strong>Faculty Name:</strong> {data.faculty_name}</p>
                <p><strong>Papers Left:</strong> {data.papers_left}</p>
                <p><strong>Course ID:</strong> {data.course_code}</p>
                <p><strong>Remarks:</strong> {data.remarks}</p>
                <p><strong>Deadline Left:</strong> {data.deadline_left}</p>
                <p><strong>Semester Code:</strong> {data.sem_code}</p>
                <p><strong>Academic Year:</strong> {data.sem_academic_year}</p>
            </div>
        </Dialog>
    );
}
