import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

export default function academicAdd({
  goToStepper = () => {},
  exitStepper = () => {},
}) {
  const [academicYear, setAcademicYear] = useState(""); 
  const [status, setStatus] = useState(1); 
  const [errors, setErrors] = useState({});

  const handleSubmit = async () => {
    const newErrors = {};
    if (!academicYear) newErrors.academicYear = "Academic year is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      alert("Please fill in all required fields.");
      return;
    }
    const formData = {
      academic_year: academicYear,
      status,
    };
    try {
      const response = await fetch("http://localhost:4000/api/AcademicYearHandler", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to submit form data");
      const result = await response.json();
      console.log("Form Submitted", result);
      alert("Form submitted successfully");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form. Please try again.");
    }
  };

  return (
    <div className="w-full p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Add Academic Year Details</h1>
      <div className="grid grid-cols-2 gap-6 bg-white p-6 border rounded-lg shadow-lg">
        <div>
          <label className="label-class">Academic Year:</label>
          <InputText
            value={academicYear}
            onChange={(e) => setAcademicYear(e.target.value)}
            className="input-class-inp"
            placeholder="Enter Academic Year (e.g., 2025-2026)"
          />
          {errors.academicYear && (
            <span className="text-red-500 text-sm">{errors.academicYear}</span>
          )}
        </div>
      </div>
      <Button
        label="Submit"
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 mt-4 mb-4 rounded-md hover:bg-blue-600 w-24"
      />
    </div>
  );
}
