import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

export default function BCEAdd({ goToStepper = () => {}, exitStepper = () => {} }) {
  const [deptId, setDeptId] = useState(null);
  const [bceId, setBceId] = useState("");
  const [bceName, setBceName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [errors, setErrors] = useState({});
  const [departments, setDepartments] = useState([]);

  // Fetch department data on component mount
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/deptOption");
        console.log("DeptOption API Response:", response);

        if (!response.ok) {
          throw new Error(`Failed to fetch departments: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("DeptOption Data:", data);

        // Format department data to be used in the Dropdown
        const formattedData = data.map((dept) => ({
          label: dept.dept_name,  // Display name in dropdown
          value: dept.id,  // Use dept.id as value for submission
        }));
        setDepartments(formattedData);
      } catch (error) {
        console.error("Error fetching departments:", error);
        alert("Failed to load department options. Please try again later.");
      }
    };

    fetchDepartments();
  }, []);

  // Handle form submission
  const handleSubmit = async () => {
    console.log("Form data:", { deptId, bceId, bceName, email, number });
    const newErrors = {};

    // Validate form fields
    if (!deptId || deptId <= 0) newErrors.deptId = "Department is required and must be greater than 0";
    if (!bceId) newErrors.bceId = "BCE ID is required";
    if (!bceName) newErrors.bceName = "BCE Name is required";
    if (!email) newErrors.email = "Email is required";
    if (!number) newErrors.number = "Mobile number is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      console.log("Validation errors:", newErrors);
      return; // Exit if validation fails
    }

    const formData = {
      dept_id: deptId, // Send deptId as the value from the dropdown
      bce_id: bceId,
      bce_name: bceName,
      mobile_num: number,
      email: email,
    };

    try {
      const response = await fetch("http://localhost:4000/api/BceData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      console.log("POST Response Status:", response.status);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to submit data: ${errorText}`);
      }

      const result = await response.json();
      console.log("POST Response Data:", result);
      alert("Data submitted successfully!");
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Failed to submit data. Please try again.");
    }
  };

  return (
    <div className="w-full p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Add BCE Details</h1>
      <div className="grid grid-cols-2 gap-6 bg-white p-6 border rounded-lg shadow-lg">
      
        <div>
          <label className="label-class">Department:</label>
          <Dropdown
            value={deptId}
            options={departments}
            onChange={(e) => setDeptId(e.value)}  
            className="input-class-drop"
            placeholder="Select Department"
          />
          {errors.deptId && (
            <span className="text-red-500 text-sm">{errors.deptId}</span>
          )}
        </div>

        <div>
          <label className="label-class">Board chairman ID:</label>
          <InputText
            value={bceId}
            onChange={(e) => setBceId(e.target.value)}
            className="input-class-inp"
            placeholder="Enter BCE ID"
          />
          {errors.bceId && (
            <span className="text-red-500 text-sm">{errors.bceId}</span>
          )}
        </div>
        <div>
          <label className="label-class">BCE Name:</label>
          <InputText
            value={bceName}
            onChange={(e) => setBceName(e.target.value)}
            className="input-class-inp"
            placeholder="Enter BCE Name"
          />
          {errors.bceName && (
            <span className="text-red-500 text-sm">{errors.bceName}</span>
          )}
        </div>

        <div>
          <label className="label-class">Email:</label>
          <InputText
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-class-inp"
            placeholder="Enter Email"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email}</span>
          )}
        </div>

        <div>
          <label className="label-class">Mobile number:</label>
          <InputText
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="input-class-inp"
            placeholder="Enter Mobile Number"
          />
          {errors.number && (
            <span className="text-red-500 text-sm">{errors.number}</span>
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
