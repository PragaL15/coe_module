import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";

export default function PatientForm({
  goToStepper = () => {},
  exitStepper = () => {},
}) {
  const [facultyName, setFacultyName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [semesterCode, setSemesterCode] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [department, setDepartment] = useState("");
  const [deadline, setDeadline] = useState(null);
  const [pendingPapers, setPendingPapers] = useState("");
  const [reason, setReason] = useState("");
  const [referral, setReferral] = useState("");

  const [errors, setErrors] = useState({});

  // Mock dropdown options
  const facultyOptions = [
    { label: "Dr. John Smith", value: "Dr. John Smith" },
    { label: "Prof. Jane Doe", value: "Prof. Jane Doe" },
    { label: "Dr. Emily Davis", value: "Dr. Emily Davis" },
  ];

  const courseOptions = [
    { label: "CS101 - Intro to CS", value: "CS101" },
    { label: "CS201 - Algorithms", value: "CS201" },
    { label: "CS301 - Databases", value: "CS301" },
  ];

  const semesterOptions = [
    { label: "Semester 1", value: "Sem1" },
    { label: "Semester 2", value: "Sem2" },
    { label: "Semester 3", value: "Sem3" },
  ];

  const academicYearOptions = [
    { label: "2023-2024", value: "2023-2024" },
    { label: "2024-2025", value: "2024-2025" },
    { label: "2025-2026", value: "2025-2026" },
  ];

  const departmentOptions = [
    { label: "Computer Science", value: "CS" },
    { label: "Electrical Engineering", value: "EE" },
    { label: "Mechanical Engineering", value: "ME" },
    { label: "Civil Engineering", value: "CE" },
  ];

  const handleSubmit = () => {
    const newErrors = {};

    // Validations
    if (!facultyName) newErrors.facultyName = "Faculty name is required";
    if (!courseCode) newErrors.courseCode = "Course code is required";
    if (!semesterCode) newErrors.semesterCode = "Semester code is required";
    if (!academicYear) newErrors.academicYear = "Academic year is required";
    if (!department) newErrors.department = "Department is required";
    if (!deadline) newErrors.deadline = "Deadline is required";
    if (!pendingPapers) newErrors.pendingPapers = "Number of papers is required";
    if (!reason) newErrors.reason = "Reason is required";
    if (!referral) newErrors.referral = "Referral is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      alert("Please fill in all required fields.");
      return;
    }

    const formData = {
      facultyName,
      courseCode,
      semesterCode,
      academicYear,
      department,
      deadline,
      pendingPapers,
      reason,
      referral,
    };

    console.log("Form Submitted", formData);
    alert("Form submitted successfully");
  };

  return (
    <div className="w-full p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Add Academic Details</h1>
      <div className="grid grid-cols-2 gap-6 bg-white p-6 border rounded-lg shadow-lg">
        {/* Faculty Name */}
        <div>
          <label className="label-class">Faculty Name:</label>
          <Dropdown
            value={facultyName}
            options={facultyOptions}
            onChange={(e) => setFacultyName(e.value)}
            className="input-class-drop"
            placeholder="Select Faculty Name"
          />
          {errors.facultyName && (
            <span className="text-red-500 text-sm">{errors.facultyName}</span>
          )}
        </div>

        {/* Course Code */}
        <div>
          <label className="label-class">Course Code:</label>
          <Dropdown
            value={courseCode}
            options={courseOptions}
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
            options={academicYearOptions}
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
          <Calendar
            value={deadline}
            onChange={(e) => setDeadline(e.value)}
            className="input-class-drop"
            placeholder="Select Deadline"
            dateFormat="dd/mm/yy"
          />
          {errors.deadline && (
            <span className="text-red-500 text-sm">{errors.deadline}</span>
          )}
        </div>

        {/* Pending Number of Papers */}
        <div>
          <label className="label-class">Pending Number of Papers:</label>
          <InputText
            value={pendingPapers}
            onChange={(e) => setPendingPapers(e.target.value)}
            className="input-class-inp"
            placeholder="Enter Pending Papers"
          />
          {errors.pendingPapers && (
            <span className="text-red-500 text-sm">{errors.pendingPapers}</span>
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

        {/* Referral */}
        <div>
          <label className="label-class">Referral:</label>
          <InputText
            value={referral}
            onChange={(e) => setReferral(e.target.value)}
            className="input-class-inp"
            placeholder="Enter Referral"
          />
          {errors.referral && (
            <span className="text-red-500 text-sm">{errors.referral}</span>
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
