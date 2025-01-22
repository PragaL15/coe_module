import React, { useState, useEffect } from "react";
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

  const [facultyOptions, setFacultyOptions] = useState([]);
  const [courseOptions, setCourseOptions] = useState([]);
  const [semesterOptions, setSemesterOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [academicOptions, setAcademicOptions] = useState([]);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchFacultyData();
    fetchCourseData();
    fetchSemesterData();
    fetchDepartmentData();
    fetchAcademicData();
  }, []);

  const fetchData = async (url, setOptions, labelKey, valueKey) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to fetch data from ${url}`);
      const data = await response.json();
      const options = data.map((item) => ({
        label: item[labelKey],
        value: item[valueKey],
      }));
      setOptions(options);
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
    }
  };

  const fetchFacultyData = () =>
    fetchData(
      "http://localhost:4000/api/faculty",
      setFacultyOptions,
      "faculty_name",
      "id"
    );

  const fetchCourseData = () =>
    fetchData(
      "http://localhost:4000/api/courseOption",
      setCourseOptions,
      "course_code",
      "id"
    );

  const fetchSemesterData = () =>
    fetchData(
      "http://localhost:4000/api/semOption",
      setSemesterOptions,
      "sem_code",
      "id"
    );

  const fetchDepartmentData = () =>
    fetchData(
      "http://localhost:4000/api/deptOption",
      setDepartmentOptions,
      "dept_name",
      "id"
    );

  const fetchAcademicData = () =>
    fetchData(
      "http://localhost:4000/api/academicOption",
      setAcademicOptions,
      "academic_year",
      "id"
    );

  const handleSubmit = () => {
    const newErrors = {};

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
          <Calendar
            value={deadline}
            onChange={(e) => setDeadline(e.value)}
            className="input-class-drop p-calendar small-calender"
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
