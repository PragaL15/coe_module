import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

export default function SemesterAdd({
  goToStepper = () => {},
  exitStepper = () => {},
}) {
  const [semesterCode, setSemesterCode] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [semesterOptions, setSemesterOptions] = useState([]);
  const [errors, setErrors] = useState({});

  // Fetch options for academic years
  useEffect(() => {
    fetchData(
      "http://localhost:4000/api/academicOption",
      setSemesterOptions,
      "academic_year",
      "academic_year"
    );
  }, []);

  const fetchData = async (url, setOptions, labelKey, valueKey) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to fetch data from ${url}`);
      const data = await response.json();
      const options = data.map((item) => ({
        label: item[labelKey], // Display text in the dropdown
        value: item[valueKey], // Value to store when selected
      }));
      setOptions(options);
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
    }
  };

  const handleSubmit = async () => {
    const newErrors = {};
    if (!semesterCode) newErrors.semesterCode = "Semester code is required.";
    if (!academicYear) newErrors.academicYear = "Academic year is required.";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const formData = {
      sem_code: semesterCode,
      academic_year: academicYear,
    };

    try {
      const response = await fetch("http://localhost:4000/api/SemesterData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to submit form data.");
      const result = await response.json();
      alert("Form submitted successfully!");
      console.log("Form Submitted", result);

      // Clear form fields after successful submission
      setSemesterCode("");
      setAcademicYear("");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form. Please try again.");
    }
  };

  return (
    <div className="w-full p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Add Semester Details</h1>
      <div className="grid grid-cols-2 gap-6 bg-white p-6 border rounded-lg shadow-lg">
        {/* Semester Code */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Semester Code:
          </label>
          <InputText
            value={semesterCode}
            onChange={(e) => setSemesterCode(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter Semester Code (e.g., SEM1)"
          />
          {errors.semesterCode && (
            <span className="text-red-500 text-sm">{errors.semesterCode}</span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Academic Year:
          </label>
          <Dropdown
            value={academicYear}
            options={semesterOptions}
            onChange={(e) => setAcademicYear(e.value)}
            className="w-full"
            placeholder="Select Academic Year"
          />
          {errors.academicYear && (
            <span className="text-red-500 text-sm">{errors.academicYear}</span>
          )}
        </div>
      </div>
      <div className="mt-6">
        <Button
          label="Submit"
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
        />
      </div>
    </div>
  );
}
