import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

export default function ViewRecord({ data, visible, onHide }) {
  const [approvalStatus, setApprovalStatus] = useState(0);
  const [reason, setReason] = useState("");
  const [showReasonDialog, setShowReasonDialog] = useState(false);

  const handleApproval = (status) => {
    if (status === -1) {
      setShowReasonDialog(true);
    } else {
      submitApproval(status, "");
    }
  };
  const confirmDecline = () => {
    if (reason.trim() === "") {
      alert("Please provide a reason before declining.");
      return;
    }
    submitApproval(-1, reason);
  };
  const submitApproval = async (status, reason) => {
    const payload = {
      id: data.id,
      approval_status: status,
      reason: reason,
    };
    try {
      const response = await fetch(
        "http://localhost:4000/api/FacultyApproval",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to update approval status:", errorData);
        alert(errorData.error || "Failed to update approval status.");
        return;
      }

      const result = await response.json();
      console.log("Success:", result);
      onHide();
    } catch (error) {
      console.error("Error updating approval status:", error);
      alert("An error occurred while updating approval status.");
    }
  };
  const footerContent = (
    <div className="flex justify-content-between">
      <Button
        label="Accept"
        icon="pi pi-check"
        onClick={() => handleApproval(1)}
        className="bg-green-500 hover:bg-green-600 text-white p-1  md:text-sm text-xs rounded w-28"
      />
      <Button
        label="Decline"
        icon="pi pi-times"
        onClick={() => handleApproval(-1)}
        className="bg-red-500 hover:bg-red-600 text-white p-2 ml-4 text-sm rounded"
      />
    </div>
  );
  const reasonDialogFooter = (
    <div className="flex justify-content-between">
      <Button
        label="Submit"
        icon="pi pi-check"
        onClick={confirmDecline}
        className="bg-blue-500 text-white p-2 mr-2 text-sm rounded"
      />
    </div>
  );
  return (
    <>
      <Dialog
        header="Faculty Record"
        visible={visible}
        style={{ width: "50vw" }}
        footer={footerContent}
        onHide={onHide}
      >
        <div className="w-4/5">
          <p className="mt-4 ">
            <strong>Faculty Name:</strong> {data.faculty_name}
          </p>
          <p className="mt-4 ">
            <strong>Papers Left:</strong> {data.papers_left}
          </p>
          <p className="mt-4 ">
            <strong>Course ID:</strong> {data.course_code}
          </p>
          <p className="mt-4 ">
            <strong>Remarks:</strong> {data.remarks}
          </p>
          <p className="mt-4 ">
            <strong>Deadline Left:</strong> {data.deadline_left}
          </p>
          <p className="mt-4 ">
            <strong>Semester Code:</strong> {data.sem_code}
          </p>
        </div>
      </Dialog>
      <Dialog
        header="Decline Reason"
        visible={showReasonDialog}
        style={{ width: "30vw" }}
        footer={reasonDialogFooter}
        onHide={() => setShowReasonDialog(false)}
      >
        <div>
          <label htmlFor="reason" className="block text-sm mb-1">
            Please provide a reason for declining:
          </label>
          <InputText
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={3}
            className="input-class-inp"
            placeholder="Enter your reason here..."
          />
        </div>
      </Dialog>
    </>
  );
}
