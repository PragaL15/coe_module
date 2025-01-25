import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

export default function courseAdd({
  goToStepper = () => {},
  exitStepper = () => {},
}) {
  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");
  const [semesterCode, setSemesterCode] = useState("");
  const [semesterOptions, setSemesterOptions] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchData(
      "http://localhost:4000/api/semOption",
      setSemesterOptions,
      "sem_code",
      "sem_code"
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

    if (!courseCode) newErrors.courseCode = "Course code is required";
    if (!courseName) newErrors.courseName = "Course name is required";
    if (!semesterCode) newErrors.semesterCode = "Semester code is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      alert("Please fill in all required fields.");
      return;
    }
    const formData = {
      course_code: courseCode,
      course_name: courseName,
      sem_code: semesterCode,
    };
    try {
      const response = await fetch("http://localhost:4000/api/CourseSend", {
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
      <h1 className="text-2xl font-bold mb-6">Add Academic Details</h1>
      <div className="grid grid-cols-2 gap-6 bg-white p-6 border rounded-lg shadow-lg">
        <div>
          <label className="label-class">Semester Code:</label>
          <Dropdown
            value={semesterCode}
            options={semesterOptions}
            onChange={(e) => setSemesterCode(e.value)}
            className="input-class-drop"
            placeholder="Select Semester Code"
          />
          {errors.semesterCode && (
            <span className="text-red-500 text-sm">{errors.semesterCode}</span>
          )}
        </div>
        <div>
          <label className="label-class">Course Name:</label>
          <InputText
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            className="input-class-inp"
            placeholder="Enter Course Name"
          />
          {errors.courseName && (
            <span className="text-red-500 text-sm">{errors.courseName}</span>
          )}
        </div>
        <div>
          <label className="label-class">Course Code:</label>
          <InputText
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            className="input-class-inp"
            placeholder="Enter Course Code"
          />
          {errors.courseCode && (
            <span className="text-red-500 text-sm">{errors.courseCode}</span>
          )}
        </div>
      </div>

      <Button
        label="Submit"
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-6 py-2 mt-4 mb-4 rounded-md hover:bg-blue-600 w-24"
      />
    </div>
  );
}
