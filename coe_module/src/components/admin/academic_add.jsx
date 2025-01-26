import React, { useState } from "react";
import { Card } from "primereact/card"; 
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

export default function AcademicAdd({
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

    <div className="w-full p-6 rounded-md">
      <Card className="p-4 border bg-slate rounded-lg shadow-lg">
        <h1 className="text-xl font-bold mb-6">Add Academic Year Details</h1>
        <div className="grid grid-cols-1 gap-3">
          <div>
            <label className="block mb-4 text-md font-medium text-gray-700">Academic Year:</label>
            <InputText
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
              className="w-full p-2 border rounded-md"
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
          className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-blue-600 w-24"
        />
      </Card>
    </div>
  );
}
