import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

export default function FacultyAdd({ goToStepper = () => {}, exitStepper = () => {} }) {
  const [facultyName, setFacultyName] = useState("");
  const [dept, setDept] = useState(null);  // Change deptId to dept to match backend
  const [mobileNum, setMobileNum] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [departments, setDepartments] = useState([]);

  // Fetch departments data for dropdown
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

        // Format department data for the Dropdown component
        const formattedDepartments = data.map((dept) => ({
          label: dept.dept_name, // Display name in dropdown
          value: dept.id,        // Value to be stored on form submission
        }));
        setDepartments(formattedDepartments);
      } catch (error) {
        console.error("Error fetching departments:", error);
        alert("Failed to load department options. Please try again later.");
      }
    };

    fetchDepartments();
  }, []);

  // Handle form submission
  const handleSubmit = async () => {
    console.log("Form data:", { facultyName, dept, mobileNum, email });
    const newErrors = {};

    // Validate form fields
    if (!facultyName) newErrors.facultyName = "Faculty Name is required";
    if (!dept) newErrors.dept = "Department selection is required";  // Match 'dept'
    if (!mobileNum) newErrors.mobileNum = "Mobile number is required";
    if (!email) newErrors.email = "Email is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      console.log("Validation errors:", newErrors);
      return; // Exit if validation fails
    }

    const formData = {
      faculty_name: facultyName,  // Correct field name
      dept: dept,  // Correct field name
      mobile_num: mobileNum,      // Correct field name
      email: email,               // Correct field name
    };

    try {
      const response = await fetch("http://localhost:4000/api/FacultyData", {
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
      <h1 className="text-2xl font-bold mb-6">Add Faculty Details</h1>
      <div className="grid grid-cols-2 gap-6 bg-white p-6 border rounded-lg shadow-lg">
        {/* Faculty Name Input */}
        <div>
          <label className="label-class">Faculty Name:</label>
          <InputText
            value={facultyName}
            onChange={(e) => setFacultyName(e.target.value)}
            className="input-class-inp"
            placeholder="Enter Faculty Name"
          />
          {errors.facultyName && (
            <span className="text-red-500 text-sm">{errors.facultyName}</span>
          )}
        </div>

        {/* Department Dropdown */}
        <div>
          <label className="label-class">Department:</label>
          <Dropdown
            value={dept}
            options={departments}
            onChange={(e) => setDept(e.value)} // Store dept.id on change
            className="input-class-drop"
            placeholder="Select Department"
          />
          {errors.dept && (
            <span className="text-red-500 text-sm">{errors.dept}</span>
          )}
        </div>

        {/* Mobile Number Input */}
        <div>
          <label className="label-class">Mobile Number:</label>
          <InputText
            value={mobileNum}
            onChange={(e) => setMobileNum(e.target.value)}
            className="input-class-inp"
            placeholder="Enter Mobile Number"
          />
          {errors.mobileNum && (
            <span className="text-red-500 text-sm">{errors.mobileNum}</span>
          )}
        </div>

        {/* Email Input */}
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
      </div>

      <Button
        label="Submit"
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 mt-4 mb-4 rounded-md hover:bg-blue-600 w-24"
      />
    </div>
  );
}
