import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

export default function PatientForm({ goToStepper = () => {}, exitStepper = () => {} }) {
  const [faculty_id, setFaculty_id] = useState("");
  const [courseCode, setCourseCode] = useState();
  const [semesterCode, setSemesterCode] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [department, setDepartment] = useState("");
  const [deadline, setDeadline] = useState();
  const [papers_left, setPendingPapers] = useState(0);
  const [reason, setReason] = useState("");

  const [facultyOptions, setFacultyOptions] = useState([]);
  const [courseOptions, setCourseOptions] = useState([]);
  const [semesterOptions, setSemesterOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [academicOptions, setAcademicOptions] = useState([]);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchData("http://localhost:4000/api/faculty", setFacultyOptions, "faculty_id", "faculty_id");
    fetchData("http://localhost:4000/api/courseOption", setCourseOptions, "course_code", "course_id");
    fetchData("http://localhost:4000/api/semOption", setSemesterOptions, "sem_code", "sem_code");
    fetchData("http://localhost:4000/api/deptOption", setDepartmentOptions, "dept_name", "dept_name");
    fetchData("http://localhost:4000/api/academicOption", setAcademicOptions, "academic_year", "academic_year");
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

    if (!faculty_id) newErrors.faculty_id = "Faculty ID is required";
    if (!courseCode) newErrors.courseCode = "Course code is required";
    if (!semesterCode) newErrors.semesterCode = "Semester code is required";
    if (!academicYear) newErrors.academicYear = "Academic year is required";
    if (!department) newErrors.department = "Department is required";
    if (!deadline) newErrors.deadline = "Deadline is required";
    if (!papers_left || parseInt(papers_left) < 0)
      newErrors.papers_left = "Valid number of pending papers is required";
    if (!reason) newErrors.reason = "Reason is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      alert("Please fill in all required fields.");
      return;
    }

    const formData = {
      faculty_id,
      papers_left,
      course_id: courseCode, // Send course_id
      remarks: reason,
      approval_status: 0, // Default to 0
      status: 0, // Default to 0
      sem_code: semesterCode,
      sem_academic_year: academicYear,
      year: department,
      deadline_left: parseInt(deadline, 10),
    };

    try {
      const response = await fetch("http://localhost:4000/api/FacultyRequestSubmit", {
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
        {/* Faculty ID */}
        <div>
          <label className="label-class">Faculty ID:</label>
          <Dropdown
            value={faculty_id}
            options={facultyOptions}
            onChange={(e) => setFaculty_id(e.value)}
            className="input-class-drop"
            placeholder="Select Faculty ID"
          />
          {errors.faculty_id && (
            <span className="text-red-500 text-sm">{errors.faculty_id}</span>
          )}
        </div>

        {/* Course Code */}
        <div>
          <label className="label-class">Course Code:</label>
          <Dropdown
            value={courseCode} // Stores course_id
            options={courseOptions} // Options with course_code as label and course_id as value
            onChange={(e) => setCourseCode(e.value)}
            className="input-class-drop"
            placeholder="Select Course Code"
          />
          {errors.courseCode && (
            <span className="text-red-500 text-sm">{errors.courseCode}</span>
          )}
        </div>

        {/* Semester Code */}
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

        {/* Academic Year */}
        <div>
          <label className="label-class">Academic Year:</label>
          <Dropdown
            value={academicYear}
            options={academicOptions}
            onChange={(e) => setAcademicYear(e.value)}
            className="input-class-drop"
            placeholder="Select Academic Year"
          />
          {errors.academicYear && (
            <span className="text-red-500 text-sm">{errors.academicYear}</span>
          )}
        </div>

        {/* Department */}
        <div>
          <label className="label-class">Department:</label>
          <Dropdown
            value={department}
            options={departmentOptions}
            onChange={(e) => setDepartment(e.value)}
            className="input-class-drop"
            placeholder="Select Department"
          />
          {errors.department && (
            <span className="text-red-500 text-sm">{errors.department}</span>
          )}
        </div>

        {/* Deadline */}
        <div>
          <label className="label-class">Deadline:</label>
          <InputText
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="input-class-inp"
            placeholder="Enter Deadline"
          />
          {errors.deadline && (
            <span className="text-red-500 text-sm">{errors.deadline}</span>
          )}
        </div>

        {/* Pending Number of Papers */}
        <div>
          <label className="label-class">Pending Number of Papers:</label>
          <InputText
  value={papers_left}
  onChange={(e) => setPendingPapers(parseInt(e.target.value, 10))}
  className="input-class-inp"
  placeholder="Enter Pending Papers"
/>

          {errors.papers_left && (
            <span className="text-red-500 text-sm">{errors.papers_left}</span>
          )}
        </div>

        {/* Reason */}
        <div>
          <label className="label-class">Reason:</label>
          <InputText
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="input-class-inp"
            placeholder="Enter Reason"
          />
          {errors.reason && (
            <span className="text-red-500 text-sm">{errors.reason}</span>
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
