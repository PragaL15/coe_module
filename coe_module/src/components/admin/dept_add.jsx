import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

export default function departmentAdd({ goToStepper = () => {}, exitStepper = () => {} }) {
  const [deptName, setDeptName] = useState(""); 
  const [errors, setErrors] = useState({}); 

  const handleSubmit = async () => {
    const newErrors = {};

    
    if (!deptName) newErrors.deptName = "Department name is required.";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      alert("Please fill in all required fields.");
      return;
    }

    const formData = {
      dept_name: deptName, 
    };

    try {
      const response = await fetch("http://localhost:4000/api/DeptData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to submit form data.");
      const result = await response.json();
      console.log("Form Submitted", result);
      alert("Form submitted successfully!");

      setDeptName("");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form. Please try again.");
    }
  };

  return (
    <div className="w-full p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Add Department Details</h1>
      <div className="grid grid-cols-2 gap-6 bg-white p-6 border rounded-lg shadow-lg">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Department Name:
          </label>
          <InputText
            value={deptName}
            onChange={(e) => setDeptName(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter Department Name"
          />
          {errors.deptName && (
            <span className="text-red-500 text-sm">{errors.deptName}</span>
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
